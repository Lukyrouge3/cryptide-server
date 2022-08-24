import { RoomsManager } from "./room";
import WebSocket from 'ws';
import { Message } from "./interfaces";
import { GameInformations, RoomInformations } from "./types";

export class HandshakeMessage extends Message {
    constructor() {
        super("handshake", {});
    }
}

export class CreateRoomMessage extends Message {
    constructor() {
        super("createRoom", {});
    }
}

export class JoinRoomMessage extends Message {
    constructor(id: string) {
        super("joinRoom", { id });
    }
}

export class PlayerAnswerMessage extends Message {
    constructor(answer: boolean, player: number, tile: number) {
        super("playerAnswer", { answer, player, tile });
    }
}

export class PlayerWinMessage extends Message {
    constructor(player: number) {
        super("playerWin", { player });
    }
}

export class GameInformationsMessage extends Message {
    constructor(infos: GameInformations) {
        super("gameInformations", { infos });
    }
}

export class PlaceSquareMessage extends Message {
    constructor(player: number, tile: number) {
        super("placeSquare", { player, tile });
    }
}

export class RoomInformationsMessage extends Message {
    constructor(infos: RoomInformations) {
        super("roomInformations", { infos });
    }
}

export class PlayerTurnMessage extends Message {
    constructor(player: number) {
        super("playerTurn", { player });
    }
}

export class PlayerGuessMessage extends Message {
    constructor(player: number, tile: number) {
        super("playerGuess", { player, tile });
    }
}

export class PlayerAskMessage extends Message {
    constructor(player: number, tile: number) {
        super("playerAsk", { player, tile });
    }
}

export class PlayerGuessAnwserMessage extends Message {
    constructor(anwser: boolean, player: number, tile: number) {
        super("playerGuessAnswer", { anwser, player, tile });
    }
}

export class JoinRoomErrorMessage extends Message {
    constructor(error: string) {
        super("joinRoomError", { error });
    }
}