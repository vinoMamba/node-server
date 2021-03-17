import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as p from 'path';

const publicDir = p.resolve(__dirname, 'public');
const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const { method, url: baseUrl, headers } = request;
    const url = new URL('http://localhost' + baseUrl)
    console.log(url)
    const pathName = url.pathname
    const fileDir = url.pathname.substr(1)
    // response.setHeader('content-type', 'text/html; charset=utf-8');
    fs.readFile(p.resolve(publicDir, fileDir), (error, data) => {
        if (error) {
            console.log(error)
            if (error.errno === -4058) {
                response.statusCode = 404
                fs.readFile(p.resolve(publicDir, 'notFoundPage.html'), (error, data) => {
                    if (error) throw error
                    response.end(data)
                })
            } else {
                response.statusCode = 500
                response.end('服务异常')
            }
        } else {
            response.end(data);
        }
    });
});

server.listen(8888, () => {
    console.log(server.address());
});