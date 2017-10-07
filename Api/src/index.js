import express from 'express';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from 'http'
import socket from './socket.js'

const port = process.env.PORT || 9000;

const app = express();
const server = http.Server(app);
socket(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pathToRoutes = path.resolve(__dirname, './server/routes') + "/";
const pathToControllers = path.resolve(__dirname, './server/controllers') + "/";

mongoose.connect('mongodb://vibhor:qwerty123@ds119151.mlab.com:19151/run');
// mongoose.connect('mongodb://127.0.0.1:27017/apptest');

fs.readdirSync(pathToRoutes).forEach((file) => {
    require(pathToRoutes + file)(app, require(pathToControllers + file))
});

app.get('*', (req, res) => {
    res.send('Hello')
});

app.use((req, res) => {
    res.status(404).send({success: false, message: 'Page not found'})
});


server.listen(port, () => {
    console.log(`-- Server running on port ${port} --`);
});