import express from 'express';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const port = process.env.PORT || 9000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
    
const pathToRoutes = path.resolve(__dirname, './server/routes') + "/";
const pathToControllers = path.resolve(__dirname, './server/controllers') + "/";

mongoose.connect('mongodb://vibhor:qwerty123@ds119151.mlab.com:19151/run');

fs.readdirSync(pathToRoutes).forEach((file) => {
    require(pathToRoutes + file)(app, require(pathToControllers + file))
});

app.use((req,res) => {
    res.status(404).send({success:false, message: 'Page not found'})
});

app.listen(port, () => {
    console.log(`-- Server running on port ${port} --`);
});