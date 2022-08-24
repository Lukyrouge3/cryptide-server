import WebSocket from 'ws';
import config from "./config";
import { Message, MessageHandler } from './protocol/message';
import { RoomsManager } from './protocol/room';

const wsServer = new WebSocket.Server({ port: 8080 });
const msgHandler = new MessageHandler();
const roomManager = new RoomsManager();
wsServer.on("connection", (socket: WebSocket) => {
    socket.on("message", (data: any) => {
        msgHandler.handle(Message.parse(data), socket);
    });
});