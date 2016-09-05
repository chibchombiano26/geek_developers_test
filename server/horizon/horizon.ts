const horizon = require('@horizon/server');
import { expressServer } from "../express/server";

export class horizon_server{

    server : expressServer;

    constructor() {
        
    }

    initServer(){
        this.server = new expressServer();
        this.server.createServer().then(this.createHorizonServer);
    }

    createHorizonServer(httpServer){

    let autoCreateCollection = true;
    let auto_create_index = true;
    let permission = false;
    let allow_anonymous = true;
    let allow_unauthenticated = true;

    if(process.env.CREATE_COLLECTION){
        autoCreateCollection = Boolean(process.env.CREATE_COLLECTION);
    }

    if(process.env.CREATE_INDEX){
        auto_create_index = Boolean(process.env.CREATE_INDEX);
    }

    if(process.env.PERMISSION){
        permission = Boolean(process.env.PERMISSION);
    }

    if(process.env.ALLOW_ANONYMOUS){
        allow_anonymous = Boolean(process.env.ALLOW_ANONYMOUS);
    }

    if(process.env.ALLOW_UNAUTHENTICATED){
        allow_unauthenticated = Boolean(process.env.ALLOW_UNAUTHENTICATED);
    }


     let horizonServer = horizon(httpServer, {
        auto_create_collection: autoCreateCollection,
        auto_create_index: auto_create_index,
        project_name: process.env.PROJECT_NAME || 'GeekDevelopers',
        permissions: permission,
        rdb_host: process.env.RDB_HOST || 'localhost',
        rdb_port: process.env.RDB_PORT || 28015,
        auth: {
            allow_anonymous: allow_anonymous,
            allow_unauthenticated: allow_unauthenticated,
            token_secret: process.env.TOKEN_SECRET || 'GeekDevelopers'
        }
    });

    console.log(horizonServer);


    }



}