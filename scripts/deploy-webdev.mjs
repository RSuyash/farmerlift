import { cpSync, createReadStream, existsSync, mkdirSync, rmSync } from "node:fs";
import { mkdtemp, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, basename, join, resolve } from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sshTarget = process.env.FARMERLIFT_WEBDEV_SSH || "webdev";
const remoteCommand = process.env.FARMERLIFT_WEBDEV_COMMAND || "farmerlift";
const maxArchiveBytes = 250 * 1024 * 1024;
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

async function main() {
  requireFile(join(root, "next.config.ts"), "Run this from the Farmerlift repo.");
  requireFile(join(root, "package-lock.json"), "package-lock.json is required for a repeatable build.");

  run("npm", ["ci", "--prefer-offline"]);
  run("npm", ["run", "build"]);

  const standaloneDir = join(root, ".next", "standalone");
  const staticDir = join(root, ".next", "static");
  const publicDir = join(root, "public");

  requireFile(join(standaloneDir, "server.js"), "Build failed: .next/standalone/server.js is missing.");
  requireFile(staticDir, "Build failed: .next/static is missing.");
  requireFile(publicDir, "Build failed: public assets are missing.");

  const tempDir = await mkdtemp(join(tmpdir(), "farmerlift-webdev-"));
  const releaseDir = join(tempDir, "release");
  const archivePath = join(tempDir, "farmerlift-release.tar.gz");

  try {
    mkdirSync(releaseDir, { recursive: true });
    cpSync(standaloneDir, releaseDir, { recursive: true });
    mkdirSync(join(releaseDir, ".next"), { recursive: true });
    cpSync(staticDir, join(releaseDir, ".next", "static"), { recursive: true });
    cpSync(publicDir, join(releaseDir, "public"), { recursive: true });
    mkdirSync(join(releaseDir, ".next", "cache"), { recursive: true });

    run("tar", ["-czf", archivePath, "-C", tempDir, "release"]);

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

  console.log("\nDeploy completed. Smoke-test:");
  console.log("  https://farmerlift.in/");
  console.log("  https://www.farmerlift.in/");
  console.log("  https://farmerlift.in/products");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
