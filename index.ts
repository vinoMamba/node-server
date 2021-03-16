import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as path from 'path';

const publicDir = path.resolve(__dirname, 'public');
const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, url, headers} = request;
    switch (url) {
        case '/index.html':
            response.setHeader('content-type', 'text/html; charset=utf-8');
            fs.readFile(path.resolve(publicDir, 'index.html'), (error, data) => {
                if (error) throw error;
                response.end(data.toString());
            });
            break;
        case '/index.css':
            response.setHeader('content-type', 'text/css; charset=utf-8');
            fs.readFile(path.resolve(publicDir, 'index.css'), (error, data) => {
                if (error) throw error;
                response.end(data.toString());
            });
            break;
        case '/main.js':
            response.setHeader('content-type', 'text/javascript; charset=utf-8');
            fs.readFile(path.resolve(publicDir, 'main.js'), (error, data) => {
                if (error) throw error;
                response.end(data.toString());
            });
            break;
    }

});

server.listen(8888, () => {
    console.log(server.address());
});