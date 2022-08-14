// import {Server} from "socket.io";
//
// const io = new Server(3000);
//
// io.on("connection", (socket) => {
//
// });
//

import {Biome, Board, Tile} from "./map";
import Clue, {IN_A_TILE_WITH_Y, IN_OR_WITHIN_X_TILES_OF_Y} from "./clue";

const board = Board.fromPartOrder([0, 1, 2, 3, 4, 5]);

const testClue = new Clue(IN_A_TILE_WITH_Y(t => t.biome == Biome.Desert));
const tiles = testClue.filtering(board).getTiles();
console.log(tiles.map(t => t.index), tiles.length, "/", board.getTiles().length);


console.log(board.getTilesDistance(board.getTile(54), board.getTile(40)));