import { Serializable } from "./interfaces";
import WebSocket from "ws";

export class Player implements Serializable {

    id: string;
    name: string;
    ready: boolean = false;
    socket: WebSocket;

    constructor(id: string, name: string, socket: WebSocket) {
        this.id = id;
        this.name = name;
        this.socket = socket;
    }

    toString(): string {
        return JSON.stringify({name: this.name, id: this.id, ready: this.ready});
    }
}

export class RoomInformations implements Serializable {
    id: string;
    players: Player[];
    started = false;
    currentPlayer: Player | undefined = undefined;

    constructor(id: string, players: Player[]) {
        this.id = id;
        this.players = players;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}

export class GameInformations implements Serializable {
    partsOrder: number[];
    stones: Map<number, number>;
    cabins: Map<number, number>;
    clue: string;

    constructor(partsOrder: number[], stones: Map<number, number>, cabins: Map<number, number>, clue: string) {
        this.partsOrder = partsOrder;
        this.stones = stones;
        this.cabins = cabins;
        this.clue = clue;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}