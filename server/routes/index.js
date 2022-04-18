const shell = require("shelljs");
const Project = require("../models/Project");
const fs = require("fs");
const qs = require("querystring");

module.exports = app => {
    const shell = require('shelljs')
    const express = require('express')
    const router = express.Router()
    const Project = require('../models/Project')

    router.get('/align_time/:client_timestamp', async (req, res) => {
        const cmd = './scripts/ontime.sh ' + req.params.client_timestamp.toString();
        shell.exec(cmd)
        res.send("ok");
    })
    router.get('/start/:id', async (req, res) => {
        //todo: check ongoing count
        const model = await Project.findByIdAndUpdate(req.params.id, {
            $set: {
                state: 1
            }
        })

        const cmd = './scripts/onstart.sh ' + model.name;
        shell.exec(cmd)
        res.send("ok");
    })
    router.get('/end/:id', async (req, res) => {
        const model = await Project.findByIdAndUpdate(req.params.id, {
            $set: {
                state: 2
            }
        })
        const cmd = './scripts/onend.sh ' + model.name;
        shell.exec(cmd)
        res.send("ok");
    })
    router.get('/preview/:id', async (req, res) => {
        const cmd = './scripts/onpreview.sh ' + req.params.id;
        shell.exec(cmd)
        res.send("ok");
    })
    router.get('/download/:id', async (req, res) => {
        const cmd = './scripts/ondownload.sh ' + req.params.id;
        shell.exec(cmd)
        // const filename = "/home/luoman/Downloads/favicon.ico"
        const filename = "2022-01-09-16-49-29_0.bag"
        const dir = "/home/luoman/Documents/dataset/"
        const stats = fs.statSync(dir + filename);
        if (stats.isFile()) {
            res.writeHead(200, {
                'Access-Control-Expose-Headers': 'Content-Disposition',
                'Content-Type': 'application/octet-stream',
                'Content-Length': stats.size,
                'Content-Disposition': 'attachment; filename=' + filename
            })
            fs.createReadStream(dir + filename).pipe(res);
        } else {
            res.end(404);
        }
    })
    router.get('/delete/:id', async (req, res) => {
        await Project.findByIdAndDelete(req.params.id)
        res.send("ok");
    })
    router.get('/projects', async (req, res) => {
        const items = await Project.find().limit(10);
        res.send(items)
    })

    router.post('/create', async (req, res) => {
        const model = await Project.create(req.body)
        res.send(model)
    })

    app.use('/api', router)
}