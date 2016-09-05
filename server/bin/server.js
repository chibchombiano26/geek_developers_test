"use strict";
var horizon_1 = require("./horizon/horizon");
var server = (function () {
    function server() {
        this.horizon = new horizon_1.horizon_server();
        this.horizon.initServer();
    }
    return server;
}());
module.exports = new server();
//# sourceMappingURL=server.js.map