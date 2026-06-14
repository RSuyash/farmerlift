import { cpSync, createReadStream, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { mkdtemp, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sshTarget = process.env.FARMERLIFT_WEBDEV_SSH || "webdev";
const remoteCommand = process.env.FARMERLIFT_WORDPRESS_WEBDEV_COMMAND || "farmerlift-wordpress";
const maxArchiveBytes = 25 * 1024 * 1024;
const isWindows = process.platform === "win32";

function run(command, args, options = {}) {
  console.log(`\n> ${[command, ...args].join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: isWindows,
    ...options,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function requireFile(path, message) {
  if (!existsSync(path)) {
    console.error(message);
    process.exit(1);
  }
}

function fail(message) {
  console.error(`\n${message}`);
  process.exit(1);
}

function getGitValue(args, fallback = "unknown") {
  const result = spawnSync("git", args, {
    cwd: root,
    encoding: "utf8",
    shell: isWindows,
  });

  if (result.status !== 0) {
    return fallback;
  }

  return result.stdout.trim() || fallback;
}

function isGitDirty() {
  return getGitValue(["status", "--porcelain"], "") !== "";
}

function requireVersionControlledDeploy() {
  const allowDirty = process.env.FARMERLIFT_ALLOW_DIRTY_DEPLOY === "1";
  const allowNonMaster = process.env.FARMERLIFT_ALLOW_NON_MASTER_DEPLOY === "1";
  const branch = getGitValue(["branch", "--show-current"], "");

  if (!branch) {
    fail("Refusing deploy: could not detect the current Git branch.");
  }

  if (branch !== "master" && !allowNonMaster) {
    fail(
      `Refusing deploy: current branch is ${branch}. Switch to master, pull the approved commit, then deploy.`,
    );
  }

  const dirty = isGitDirty();
  if (dirty && !allowDirty) {
    fail(
      "Refusing deploy: the working tree has uncommitted changes. Commit and push the approved changes first, then deploy.",
    );
  }

  const upstream = getGitValue(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], "");
  if (!upstream) {
    fail("Refusing deploy: this branch has no upstream. Push it to GitHub first, then deploy.");
  }

  run("git", ["fetch", "--quiet", "--prune", "origin"]);

  const counts = getGitValue(["rev-list", "--left-right", "--count", `HEAD...${upstream}`], "");
  const [aheadText, behindText] = counts.split(/\s+/);
  const ahead = Number(aheadText || "0");
  const behind = Number(behindText || "0");

  if (ahead > 0 || behind > 0) {
    fail(
      `Refusing deploy: local branch is ${ahead} commit(s) ahead and ${behind} commit(s) behind ${upstream}. Push/pull until it is synced, then deploy.`,
    );
  }
}

function collectPhpFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPhpFiles(path, files);
    } else if (entry.isFile() && entry.name.endsWith(".php")) {
      files.push(path);
    }
  }
  return files;
}

function lintPhpIfAvailable(backendDir) {
  const phpVersion = spawnSync("php", ["-v"], {
    cwd: root,
    stdio: "ignore",
    shell: isWindows,
  });

  if (phpVersion.status !== 0) {
    console.warn("\nPHP CLI was not found locally. The webdev deploy proxy will lint on Hostinger before replacing live files.");
    return;
  }

  for (const file of collectPhpFiles(backendDir)) {
    run("php", ["-l", file]);
  }
}

async function main() {
  const backendDir = join(root, "backend", "wordpress");
  requireFile(join(root, "package.json"), "Run this from the Farmerlift repo.");
  requireFile(join(backendDir, "functions.php"), "backend/wordpress/functions.php is missing.");
  requireFile(join(backendDir, "includes"), "backend/wordpress/includes is missing.");
  requireVersionControlledDeploy();
  lintPhpIfAvailable(backendDir);

  const tempDir = await mkdtemp(join(tmpdir(), "farmerlift-wordpress-webdev-"));
  const wordpressDir = join(tempDir, "wordpress");
  const archivePath = join(tempDir, "farmerlift-wordpress.tar.gz");

  try {
    mkdirSync(wordpressDir, { recursive: true });
    cpSync(join(backendDir, "functions.php"), join(wordpressDir, "functions.php"));
    cpSync(join(backendDir, "includes"), join(wordpressDir, "includes"), { recursive: true });

    run("tar", ["-czf", archivePath, "-C", tempDir, "wordpress"]);

    const archiveStat = await stat(archivePath);
    if (archiveStat.size > maxArchiveBytes) {
      console.error(`Archive is too large: ${Math.round(archiveStat.size / 1024 / 1024)} MB.`);
      process.exit(1);
    }

    console.log(`\n> ssh ${sshTarget} ${remoteCommand} < ${basename(archivePath)}`);
    await new Promise((resolvePromise, rejectPromise) => {
      const ssh = spawn("ssh", [sshTarget, remoteCommand], {
        cwd: root,
        stdio: ["pipe", "inherit", "inherit"],
        shell: false,
      });

      createReadStream(archivePath).pipe(ssh.stdin);
      ssh.on("error", rejectPromise);
      ssh.on("close", (code) => {
        if (code === 0) {
          resolvePromise();
        } else {
          rejectPromise(new Error(`ssh deploy failed with exit code ${code}`));
        }
      });
    });
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }

  console.log("\nWordPress backend deploy completed. Smoke-test:");
  console.log("  https://admin.farmerlift.in/wp-json/");
  console.log("  https://admin.farmerlift.in/wp-json/wp/v2/types");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
