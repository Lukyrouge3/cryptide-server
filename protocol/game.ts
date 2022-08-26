import Clue from "../game/clue";
import { Board } from "../game/map";
import { PlaceSquareMessage, PlayerTurnMessage } from "./messages";
import { Room } from "./room";
import { Player } from "./types";

class GameManager {

}

class Game {
    players: Player[];
    squares: number[] = [];
    circles: Circle[] = [];
    clues: Clue[];
    currentPlayer: Player | undefined = undefined;
    board: Board;
    room: Room;

    state: GameState = GameState.PREGAME;

    private solution: number = -1;
    private playerTimeout: NodeJS.Timeout;

    constructor(players: Player[], board: Board, clues: Clue[], room: Room) {
        this.players = players;
        this.board = board;
        this.clues = clues;
        this.room = room;
    }

    public start() {
        this.state = GameState.GAME;
        // TODO: Compute the solution
        this.currentPlayer = this.players[Math.floor(Math.random() * this.players.length)];
        this.playerTurn();
    }

    public playerTurn() {
        // First two rounds is simply placing squares. If the player doesn't play, or places a wrong square, automatically place it for him. Let's give 30seconds to each player to play.
        this.playerTimeout = setTimeout(() => {
            this.autoPlay();
        }, 30000);
    }

    public nextPlayer() {
        this.currentPlayer = this.players[(this.players.indexOf(this.currentPlayer) + 1) % this.players.length];
        this.room.send(new PlayerTurnMessage(this.players.indexOf(this.currentPlayer)));
    }

    public getCurrentPlayer(): Player | undefined {
        return this.currentPlayer;
    }

    private autoPlay() {
        // Auto place a square for the current player
        // TODO: Compute an actual matching square. For now just pick one at random. We pick an index in board.tiles that is not in the list of squares.
        const possibleSquares = this.board.getTiles().filter((t, i) => !this.squares.includes(i));
        const square = Math.floor(Math.random() * possibleSquares.length);
        this.play(square);
    }

    public play(tile: number) {
        if (this.state != GameState.GAME) return false;
        if (this.squares.includes(tile)) return false;
        clearTimeout(this.playerTimeout);
        this.squares.push(tile);
        this.room.send(new PlaceSquareMessage(this.players.indexOf(this.currentPlayer), tile));
        this.nextPlayer();
        return true;
    }
}

type Piece = {
    player: Player;
    tile: number;
}

type Circle = Piece;

enum GameState {
    PREGAME, // Game is not started yet
    GAME, // Game is in progress
    POSTGAME // Game is over
}