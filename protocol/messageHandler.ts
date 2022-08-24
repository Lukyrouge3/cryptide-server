import { Message } from "./interfaces";
import { RoomsManager } from "./room";
import WebSocket from "ws";
import { CreateRoomMessage, JoinRoomErrorMessage, JoinRoomMessage, RoomInformationsMessage } from "./messages";

export default class MessageHandler {
    private handlers: Map<string, (msg: Message, socket: WebSocket) => void> = new Map();

    constructor() {
        this.registerHandlers();
    }

    private registerHandlers() {
        this.handlers.set("createRoom", _createRoomMessage);
        this.handlers.set("joinRoom", _joinRoomMessage);
    }

    public handle(msg: Message, socket: WebSocket) {
        if (this.handlers.has(msg.type)) {
            this.handlers.get(msg.type)(msg, socket);
        } else throw new Error("No handler found !");
    }
}

function _createRoomMessage(msg: CreateRoomMessage, socket: WebSocket) {
    RoomsManager.getInstance().createRoom(socket);
}

function _joinRoomMessage(msg: JoinRoomMessage, socket: WebSocket) {
    const id = msg.data.id;
    if (!RoomsManager.getInstance().joinRoom(id, socket)) {
        socket.send(new JoinRoomErrorMessage("Room not found !").toString());
    }
}