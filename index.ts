import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as p from 'path';

const publicDir = p.resolve(__dirname, 'public');
const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const { method, url: baseUrl, headers } = request;
    const url = new URL('http://localhost' + baseUrl)
    const pathName = url.pathname
    switch (pathName) {
        case '/index.html':
            response.setHeader('content-type', 'text/html; charset=utf-8');
            fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
                if (error) throw error;
                response.end(data);
            });
            break;
        case '/index.css':
            response.setHeader('content-type', 'text/css; charset=utf-8');
            fs.readFile(p.resolve(publicDir, 'index.css'), (error, data) => {
                if (error) throw error;
                response.end(data);
            });
            break;
        case '/main.js':
            response.setHeader('content-type', 'text/javascript; charset=utf-8');
            fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
                if (error) throw error;
                response.end(data);
            });
            break;
    }
});

server.listen(8888, () => {
    console.log(server.address());
});