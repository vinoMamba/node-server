import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';

const publicDir = p.resolve(__dirname, 'public');
const server = http.createServer();
export const startServer = (param) => {
    const {filePath, cache = 365, port = 8888} = param;
    const maxAge = 3600 * 24 * parseInt(cache);
    const path = p.resolve(__dirname, filePath);
    server.on('request', (request: IncomingMessage, response: ServerResponse) => {
        const {method} = request;
        if (method !== 'GET') {
            response.statusCode = 405;
            response.end();
            return;
        }
        const index = filePath.indexOf('.');
        const fileSuffix = filePath.substr(index);
        const fileType = {
            '.html': 'html',
            '.css': 'css',
            '.js': 'javascript'
        };
        response.setHeader('content-type', `text/${fileType[fileSuffix] || 'html'}; charset=utf-8`);
        fs.readFile(path, (error, data) => {
            if (error) {
                console.log(error);
                if (error.errno === -4058) {
                    response.statusCode = 404;
                    fs.readFile(p.resolve(publicDir, 'notFoundPage.html'), (error, data) => {
                        if (error) throw error;
                        response.end(data);
                    });
                } else {
                    response.statusCode = 500;
                    response.end('服务异常');
                }
            } else {
                //返回文件内容
                response.setHeader('Cache-Control', `public, max-age= ${maxAge}`);
                response.end(data);
            }
        });
    });
    server.listen(port);
};
