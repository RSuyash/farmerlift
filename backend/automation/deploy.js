const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');
const config = require('./deploy_config.json');

const conn = new Client();

console.log(`[Deploy] Connecting to ${config.host}:${config.port}...`);

conn.on('ready', () => {
    console.log('[Deploy] Client :: ready');

    conn.sftp((err, sftp) => {
        if (err) throw err;

        const deployFile = (localFile) => {
            const localPath = path.resolve(__dirname, '..', localFile);
            // Construct remote path carefully. 
            // If remotePath ends with /, append filename. Otherwise assume directory.
            let remotePath = config.remotePath;
            if (!remotePath.endsWith('/')) remotePath += '/';
            remotePath += localFile;

            console.log(`[Deploy] Uploading ${localFile} to ${remotePath}...`);

            sftp.fastPut(localPath, remotePath, (err) => {
                if (err) {
                    console.error(`[Deploy] FAILED to upload ${localFile}:`, err.message);
                    // If failure is "No such file", maybe the path is wrong.
                } else {
                    console.log(`[Deploy] SUCCESS: ${localFile} uploaded.`);
                }

                // Check if last file
                if (localFile === config.files[config.files.length - 1]) {
                    console.log('[Deploy] All files processed. Closing connection.');
                    conn.end();
                }
            });
        };

        // Sequential Upload (simple)
        let p = Promise.resolve();
        config.files.forEach(file => {
            p = p.then(() => new Promise((resolve) => {
                const localPath = path.resolve(__dirname, '..', file);
                let remoteDest = config.remotePath;
                if (!remoteDest.endsWith('/')) remoteDest += '/';
                remoteDest += file;

                sftp.fastPut(localPath, remoteDest, (err) => {
                    if (err) console.error(`[Deploy] Error uploading ${file}: ${err.message}`);
                    else console.log(`[Deploy] Uploaded ${file}`);
                    resolve();
                });
            }));
        });

        p.then(() => {
            console.log('[Deploy] Done.');
            conn.end();
        });

    });
}).on('error', (err) => {
    console.error('[Deploy] Connection Error:', err);
}).connect({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password
});
