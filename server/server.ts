import { horizon_server } from "./horizon/horizon";

class server{

    horizon : horizon_server;
    constructor() {

        this.horizon = new horizon_server();
        this.horizon.initServer();        
    }
}
export = new server();