import {Board, Tile} from "./map";

export default class Clue {
    public filter: (b: Board, t: Tile) => Boolean;

    constructor(filter: (b: Board, t: Tile) => Boolean) {
        this.filter = filter;
    }

    public filtering(b: Board) {
        const tiles = b.getTiles();
        const filteredTiles = tiles.filter(t => this.filter(b, t));
        return new Board(filteredTiles);
    }
}

// In or within x tiles of a tile with a y
export const IN_OR_WITHIN_X_TILES_OF_Y = (x: number, y: (t: Tile) => Boolean) => (b: Board, t: Tile) => {
    if (y(t)) return true;
    let neighbours = b.getTileNeighbours(t, x).filter(y);
    return neighbours.length > 0;
}

// Within x tiles of a tile with a y
export const WITHIN_X_TILES_OF_Y = (x: number, y: (t: Tile) => Boolean) => (b: Board, t: Tile) => {
    let neighbours = b.getTileNeighbours(t, x).filter(y);
    return neighbours.length > 0;
}

// In a tile with a y
export const IN_A_TILE_WITH_Y = (y: (t: Tile) => Boolean) => (b: Board, t: Tile) => {
    return y(t);
}

// Not in a tile with a y
export const NOT_IN_A_TILE_WITH_Y = (y: (t: Tile) => Boolean) => (b: Board, t: Tile) => {
    return !y(t);
}
