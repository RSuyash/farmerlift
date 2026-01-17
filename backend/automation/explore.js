const { Client } = require('ssh2');
const config = require('../deploy_config.json');

const conn = new Client();
console.log('Connecting...');

conn.on('ready', () => {
    console.log('Client :: ready');
    // Check PHP and wp-load
    conn.exec('php -v && find . -maxdepth 4 -name "wp-load.php"', (err, stream) => {
        if (err) {
            console.error('Exec error:', err);
            return conn.end();
        }
        stream.on('close', (code, signal) => {
            conn.end();
        }).on('data', (data) => {
            console.log('CHECK: ' + data);
        }).stderr.on('data', (data) => {
            console.log('STDERR: ' + data); // suppress finding errors
        });
    });
}).connect({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password
});
