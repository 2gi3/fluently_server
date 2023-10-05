import https from 'https';
import fs from 'fs';
import express from 'express';

const app = express();


const privateKey = fs.readFileSync('./certificates/privkey1.pem', 'utf8');
const certificate = fs.readFileSync('./certificates/cert1.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '443');

app.set('port', port);
const httpsServer = https.createServer(credentials, app);

const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = httpsServer.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


httpsServer.on('error', errorHandler);
httpsServer.on('listening', () => {
    const address = httpsServer.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

httpsServer.listen(port);
