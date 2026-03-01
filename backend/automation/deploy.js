/**
 * FarmerLift WordPress Backend Deployer
 * 
 * Deploys WordPress theme files from backend/wordpress/ to Hostinger
 * via SFTP using SSH key authentication.
 * 
 * Usage:
 *   node deploy.js                    # Uses env vars or .env.deploy
 *   SSH_HOST=x SSH_PORT=y node deploy.js  # Explicit env vars
 * 
 * Required env vars:
 *   SSH_HOST       - Hostinger server IP
 *   SSH_PORT       - SSH port (default: 65002)
 *   SSH_USERNAME   - SSH username
 *   SSH_PRIVATE_KEY - Path to SSH private key OR the key contents directly
 * 
 * Optional:
 *   REMOTE_PATH    - Remote theme path (default: domains/admin.farmerlift.in/...)
 */

const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

// --- Configuration ---

// Try loading .env.deploy if it exists (for local development)
const envFile = path.resolve(__dirname, '../../.env.deploy');
if (fs.existsSync(envFile)) {
    const lines = fs.readFileSync(envFile, 'utf-8').split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...rest] = trimmed.split('=');
            if (key && rest.length) {
                process.env[key.trim()] = rest.join('=').trim();
            }
        }
    }
    console.log('[Deploy] Loaded .env.deploy');
}

const config = {
    host: process.env.SSH_HOST,
    port: parseInt(process.env.SSH_PORT || '65002', 10),
    username: process.env.SSH_USERNAME,
    remotePath: process.env.REMOTE_PATH || 'domains/admin.farmerlift.in/public_html/wp-content/themes/twentytwentyfive/',
};

// Resolve SSH key — can be a file path or the key contents directly
let privateKey;
const keyEnv = process.env.SSH_PRIVATE_KEY || '';
if (keyEnv.includes('PRIVATE KEY')) {
    // Key contents passed directly (e.g., from GitHub Actions secret)
    privateKey = keyEnv;
} else if (keyEnv && fs.existsSync(keyEnv)) {
    // Path to a key file
    privateKey = fs.readFileSync(keyEnv, 'utf-8');
} else {
    // Try default SSH key location
    const defaultKey = path.join(process.env.HOME || process.env.USERPROFILE || '', '.ssh', 'id_farmerlift');
    if (fs.existsSync(defaultKey)) {
        privateKey = fs.readFileSync(defaultKey, 'utf-8');
        console.log('[Deploy] Using default SSH key: ~/.ssh/id_farmerlift');
    } else {
        console.error('[Deploy] ERROR: No SSH key found. Set SSH_PRIVATE_KEY env var.');
        process.exit(1);
    }
}

// Validate required config
if (!config.host || !config.username) {
    console.error('[Deploy] ERROR: SSH_HOST and SSH_USERNAME are required.');
    console.error('[Deploy] Set them as env vars or create a .env.deploy file.');
    process.exit(1);
}

// --- File Map ---
// All files to deploy, relative to backend/wordpress/
const WORDPRESS_DIR = path.resolve(__dirname, '..', 'wordpress');

function getAllPhpFiles(dir, base = '') {
    const results = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const relPath = base ? `${base}/${item}` : item;
        if (fs.statSync(fullPath).isDirectory()) {
            results.push(...getAllPhpFiles(fullPath, relPath));
        } else if (item.endsWith('.php')) {
            results.push(relPath);
        }
    }
    return results;
}

// --- Deploy ---

const conn = new Client();

console.log(`[Deploy] Connecting to ${config.host}:${config.port}...`);
console.log(`[Deploy] Remote path: ${config.remotePath}`);

conn.on('ready', () => {
    console.log('[Deploy] Connected successfully.');

    conn.sftp((err, sftp) => {
        if (err) {
            console.error('[Deploy] SFTP error:', err.message);
            process.exit(1);
        }

        const files = getAllPhpFiles(WORDPRESS_DIR);
        console.log(`[Deploy] Found ${files.length} PHP files to deploy:`);
        files.forEach(f => console.log(`  - ${f}`));

        // Ensure remote directories exist
        const ensureRemoteDir = (dirPath) => {
            return new Promise((resolve) => {
                let remoteDest = config.remotePath;
                if (!remoteDest.endsWith('/')) remoteDest += '/';
                remoteDest += dirPath;

                sftp.mkdir(remoteDest, (err) => {
                    // Ignore error if dir already exists
                    resolve();
                });
            });
        };

        // Get unique directories from file list
        const dirs = [...new Set(files
            .filter(f => f.includes('/'))
            .map(f => {
                const parts = f.split('/');
                const dirParts = [];
                const allDirs = [];
                for (let i = 0; i < parts.length - 1; i++) {
                    dirParts.push(parts[i]);
                    allDirs.push(dirParts.join('/'));
                }
                return allDirs;
            })
            .flat()
        )].sort();

        // Upload a single file
        const uploadFile = (relFile) => {
            return new Promise((resolve) => {
                const localPath = path.join(WORDPRESS_DIR, relFile);
                let remoteDest = config.remotePath;
                if (!remoteDest.endsWith('/')) remoteDest += '/';
                remoteDest += relFile;

                sftp.fastPut(localPath, remoteDest, (err) => {
                    if (err) {
                        console.error(`[Deploy] ❌ FAILED ${relFile}: ${err.message}`);
                    } else {
                        console.log(`[Deploy] ✅ Uploaded ${relFile}`);
                    }
                    resolve();
                });
            });
        };

        // Sequential execution: create dirs first, then upload files
        let chain = Promise.resolve();

        // Create directories
        for (const dir of dirs) {
            chain = chain.then(() => ensureRemoteDir(dir));
        }

        // Upload files
        for (const file of files) {
            chain = chain.then(() => uploadFile(file));
        }

        chain.then(() => {
            console.log(`\n[Deploy] ✅ Deployment complete. ${files.length} files processed.`);
            conn.end();
        });
    });

}).on('error', (err) => {
    console.error('[Deploy] Connection error:', err.message);
    process.exit(1);

}).connect({
    host: config.host,
    port: config.port,
    username: config.username,
    privateKey: privateKey,
});
