"use strict";
var express = require("express");
var storage_1 = require("./storage");
var path = require('path');
var multiparty = require("multiparty");
var r = require('rethinkdb');
var expressServer = (function () {
    function expressServer() {
    }
    expressServer.prototype.createServer = function () {
        var promise = new Promise(function (resolve, reject) {
            var app = express();
            var _storage = new storage_1.Storage();
            app.use(express.static('./'));
            app.use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.setHeader('Access-Control-Allow-Methods', 'POST');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                next();
            });
            app.post("/api", function (req, res) {
                new multiparty.Form().parse(req, function (err, fields, files) {
                    files.uploads.forEach(function (file) {
                        _storage.saveFile(file).then(function (path) {
                            res.end(path);
                        });
                    });
                });
            });
            app.get('*', function (req, res) {
                res.sendFile(path.join(__dirname, '../../app/index.html'));
            });
            var server = app.listen(8081, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Listening on port 8081.');
                    resolve(server);
                }
            });
        });
        return promise;
    };
    return expressServer;
}());
exports.expressServer = expressServer;
//# sourceMappingURL=server.js.map