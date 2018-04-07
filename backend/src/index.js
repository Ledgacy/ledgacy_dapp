import http from 'http';
import fs from 'fs';
import path from 'path';
import {Triggers} from './trigger/triggers';


setInterval(new Triggers().checkTriggers, 3000);

http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("Hello world");
    } if (req.url === '/trigger') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        (new Triggers()).addTrigger({address: "0xf6b39ce8221a48a0ceca0b4d375682c622e1829b", delay: 10000, phoneNumber: "+31612123123"});
        res.end("Writing trigger");

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    }
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');