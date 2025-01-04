// IMPORTS

import http from "http";
import os from "os";
import Buttplug, { ButtplugClient } from "buttplug";
import { connect } from "http2";

// SERVER

const hostname = `${os.hostname().toLowerCase()}.local`;
const port = 80;
const path = "/brr/";

async function parseData(req: http.IncomingMessage) {

    const body = await new Promise<string>((resolve, reject) => {
        let data = "";
        req.on("data", chunk => {
            data += chunk;
        });
        req.on("end", () => resolve(data));
        req.on("error", err => reject(err));
    });

    handleVibration(JSON.parse(body)[0])
}

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.headers["origin"] != "overwolf-extension://iafnecpcfnepnifhkhbifmngngmpkbencicpfmmi") {
        return
    }
    parseData(req)
});

// VIBRATIONS

let client: ButtplugClient
let devices: any

async function handleVibration(data: JSON) {

};

async function connectToy() {
    let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("ws://127.0.0.1:12345");
    client = new Buttplug.ButtplugClient("Toy");
    await client.connect(connector);
}

// INIT

async function init() {
    server.listen(port, "0.0.0.0", function () {
        console.log(`Server running at http://${hostname}${path}`);
    });
    connectToy()
}