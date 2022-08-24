import WebSocket from 'ws';
import { Message } from './interfaces';
import { RoomInformationsMessage } from './messages';
import { Player, RoomInformations } from './types';

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

    getRoomInformations(): RoomInformations {
        return new RoomInformations(this.id, this.clients.map((c, id) => new Player(id.toString(), "Player " + id)));// TODO: Actually manage name and id ...
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
        const room = new Room(id, [client]);
        this.rooms.push(room);
        room.send(new RoomInformationsMessage(room.getRoomInformations()));
        return room;
    }

    public joinRoom(id: string, client: WebSocket) {
        const room = this.rooms.find(r => r.id == id);
        if (room) {
            room.clients.push(client);
            room.send(new RoomInformationsMessage(room.getRoomInformations())); 
        }
        return room != undefined;
    }

    public static getInstance() {
        return RoomsManager.instance;
    }
}