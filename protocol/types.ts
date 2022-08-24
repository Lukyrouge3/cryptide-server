import { Serializable } from "./interfaces";

export class Player implements Serializable {

    id: string;
    name: string;
    ready: boolean = false;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    toString(): string {
        return JSON.stringify(this);
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