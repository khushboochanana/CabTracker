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

mongoose.connect('mongodb://heroku_k2pz1bq2:ta7ni3luchib79d4mo8d4hbv71@ds113505.mlab.com:13505/heroku_k2pz1bq2');

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