"use strict";
var horizon = require('@horizon/server');
var server_1 = require("../express/server");
var horizon_server = (function () {
    function horizon_server() {
    }
    horizon_server.prototype.initServer = function () {
        this.server = new server_1.expressServer();
        this.server.createServer().then(this.createHorizonServer);
    };
    horizon_server.prototype.createHorizonServer = function (httpServer) {
        var autoCreateCollection = true;
        var auto_create_index = true;
        var permission = false;
        var allow_anonymous = true;
        var allow_unauthenticated = true;
        if (process.env.CREATE_COLLECTION) {
            autoCreateCollection = Boolean(process.env.CREATE_COLLECTION);
        }
        if (process.env.CREATE_INDEX) {
            auto_create_index = Boolean(process.env.CREATE_INDEX);
        }
        if (process.env.PERMISSION) {
            permission = Boolean(process.env.PERMISSION);
        }
        if (process.env.ALLOW_ANONYMOUS) {
            allow_anonymous = Boolean(process.env.ALLOW_ANONYMOUS);
        }
        if (process.env.ALLOW_UNAUTHENTICATED) {
            allow_unauthenticated = Boolean(process.env.ALLOW_UNAUTHENTICATED);
        }
        var horizonServer = horizon(httpServer, {
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
    };
    return horizon_server;
}());
exports.horizon_server = horizon_server;
//# sourceMappingURL=horizon.js.map