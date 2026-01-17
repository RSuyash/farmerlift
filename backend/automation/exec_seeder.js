const { Client } = require('ssh2');
const config = require('../deploy_config.json');

const conn = new Client();
console.log('Connecting...');

conn.on('ready', () => {
    console.log('Client :: ready');
    // EXECUTE SEEDER
    const cmd = 'php ./domains/admin.farmerlift.in/public_html/wp-content/themes/twentytwentyfive/seeder.php';

    conn.exec(cmd, (err, stream) => {
        if (err) {
            console.error('Exec error:', err);
            return conn.end();
        }
        stream.on('close', (code, signal) => {
            console.log('Seeder process closed with code: ' + code);
            conn.end();
        }).on('data', (data) => {
            console.log('SEEDER OUTPUT: ' + data);
        }).stderr.on('data', (data) => {
            console.log('SEEDER ERROR: ' + data);
        });
    });
}).connect({
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password
});
