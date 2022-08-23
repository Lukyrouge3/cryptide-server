
// import {Biome, Board, Tile} from "./map";
// import Clue, {
//     BEAR_FILTER,
//     CONDITIONS, CONDITIONS_NAME,
//     FILTERS, FILTERS_NAME,
//     FOREST_FILTER,
//     IN_A_TILE_WITH_Y,
//     IN_OR_WITHIN_X_TILES_OF_Y, MOUNTAIN_FILTER, PUMA_FILTER,
//     WITHIN_X_TILES_OF_Y
// } from "./clue";
//
// const board = Board.fromPartOrder([0, 1, 2, 3, 4, 5]);
//
// console.log("Generating clues...");
//
// let tiles;
// let clue;
// let filters;
// let conds;
// let dists;
// do {
//     tiles = board.getTiles();
//     let clues = [];
//     filters = [];
//     conds = [];
//     dists = [];
//     for (let i = 0; i < 3; i++) {
//         const c = Math.floor(Math.random() * CONDITIONS.length);
//         const cond = CONDITIONS[c];
//         conds.push(c);
//         const f = Math.floor(Math.random() * FILTERS.length);
//         const filter = FILTERS[f];
//         filters.push(f);
//         const d = Math.floor(Math.random() * 2) + 1;
//         const clue = cond(filter, d);
//         dists.push(d);
//         clues.push(clue);
//     }
//     clue = new Clue(clues);
//     tiles = clue.filter(board).getTiles();
//     console.log(`${tiles.length} tiles left`);
// } while (tiles.length != 1)
//
// console.log(clue.filter(board).getTiles().map(t => t.index));
// for (let i = 0; i<dists.length; i++) {
//     console.log(`${FILTERS_NAME[filters[i]]} ${CONDITIONS_NAME[conds[i]]} ${dists[i]}`);
// }