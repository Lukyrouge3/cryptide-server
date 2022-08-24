import { RoomsManager } from "./room";
import WebSocket from 'ws';

export class Message {
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

export class HandshakeMessage extends Message {
    constructor(version: string, roomId: string, playerIndex: number) {
        super("handshake", { version, roomId, playerIndex });
    }
}

export type RoomInformations = {
    
}

export class MessageHandler {
    private handlers: Map<string, (msg: Message, socket: WebSocket) => void> = new Map();

    private registerHandlers() {
        this.handlers.set("createRoom", (msg, s) => {
            const id = RoomsManager.getInstance().createRoom(s);

        });
    }

    public handle(msg: Message, socket: WebSocket) {
        if (this.handlers.has(msg.type)) {
            this.handlers.get(msg.type)(msg, socket);
        } else throw new Error("No handler found !");
    }
}