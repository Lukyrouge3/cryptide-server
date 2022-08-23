import WebSocket from 'ws';
import config from "./config";


class Message {
    type: string;
    data: any;

    constructor(type: string, data: any) {
        this.type = type;
        this.data = data;
    }

    public toString() {
        return JSON.stringify(this);
    }

    public static parse(str: string) {
        const msg = JSON.parse(str);
        return new Message(msg.type, msg.data);
    }
}

class HandshakeMessage extends Message {
    constructor(version: string, roomId: string, playerIndex: number) {
        super("handshake", { version, roomId, playerIndex });
    }
}

const wsServer = new WebSocket.Server({port: 8080});
wsServer.on("connection", (socket: WebSocket) => {
    socket.send(new HandshakeMessage(config.version, "room1", 0).toString());
    socket.on("message", (data: any) => {
        console.log(data.toString());
    });
});