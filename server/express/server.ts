import * as express from "express";
import * as bodyParser from "body-parser";
import {Storage} from "./storage"; 
const path = require('path');
var multiparty = require("multiparty");
var r = require('rethinkdb');

export class expressServer{
    
    constructor() {
    
    }

    createServer(): Promise<any>{
        let promise = new Promise((resolve, reject) => {
        let app = express();
        let _storage : Storage = new Storage();
        
        app.use(express.static('./'));
        
        app.use(function (req, res, next) {            
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.setHeader('Access-Control-Allow-Methods', 'POST');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
        
        app.post("/api", function(req, res) {            
             new multiparty.Form().parse(req, function(err, fields, files) {                
                files.uploads.forEach(function(file) {
                    _storage.saveFile(file).then((path)=>{
                        res.end(path);
                    }) 
                });
            });
        });


        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../app/index.html'));
        });

        let server = app.listen(8081, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Listening on port 8081.');
                resolve(server);
            }
        });
       });

       return promise;
    }
}