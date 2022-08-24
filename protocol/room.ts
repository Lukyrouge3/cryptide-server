import { Message } from "./message";
import WebSocket from 'ws';

export class Room {
    id: string;
    clients: WebSocket[];

    constructor(id: string, clients: WebSocket[]) {
        this.id = id;
        this.clients = clients;
    }

    send(msg: Message) {
        for (let c of this.clients) c.send(msg.toString());
    }

    emit(msg: Message, client: WebSocket) {
        for (let c of this.clients.filter(c => c != client)) c.send(msg.toString());
    }
}

export class RoomsManager {
    private static instance: RoomsManager;
    private rooms: Room[];

    constructor() {
        RoomsManager.instance = this;
    }

    public deleteRoom(id: string) {

        this.rooms = this.rooms.filter(r => r.id != id);
    }

    public createRoom(client: WebSocket) {
        const id = (Math.random() + 1).toString(36).substring(7);
        this.rooms.push(new Room(id, [client]));
        return id;
    }

    public static getInstance() {
        return RoomsManager.instance;
    }
}