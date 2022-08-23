import {Biome, Board, StructureColor, Tile} from "./map";

export default class Clue {
    public conditions: ((b: Board, t: Tile) => Boolean)[];

    constructor(conditions: ((b: Board, t: Tile) => Boolean)[]) {
        this.conditions = conditions;
    }

    public filter(b: Board) {
        const tiles = b.getTiles();
        let filteredTiles = [...tiles];
        for (let c of this.conditions) filteredTiles = filteredTiles.filter(t => c(b, t));
        return new Board(filteredTiles);
    }
}

// In or within x tiles of a tile with a y
export const IN_OR_WITHIN_X_TILES_OF_Y = (y: (t: Tile) => Boolean, x: number) => (b: Board, t: Tile) => {
    if (y(t)) return true;
    let neighbours = b.getTileNeighbours(t, x).filter(y);
    return neighbours.length > 0;
}

// Within x tiles of a tile with a y
export const WITHIN_X_TILES_OF_Y = (y: (t: Tile) => Boolean, x: number) => (b: Board, t: Tile) => {
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

// export const IN_A_TILE_WITH_X_OR_Y = (x: (t: Tile) => Boolean, y: (t: Tile) => Boolean) => (b: Board, t: Tile) => {
//     return x(t) || y(t);
// }

export function generateClues(board: Board) {

}

export const FOREST_FILTER = (t: Tile) => t.biome == Biome.Forest;
export const DESERT_FILTER = (t: Tile) => t.biome == Biome.Desert;
export const SWAMP_FILTER = (t: Tile) => t.biome == Biome.Swamp;
export const LAKE_FILTER = (t: Tile) => t.biome == Biome.Lake;
export const MOUNTAIN_FILTER = (t: Tile) => t.biome == Biome.Mountain;
export const BEAR_FILTER = (t: Tile) => t.hasBear;
export const PUMA_FILTER = (t: Tile) => t.hasPuma;
export const STONE_FILTER = (t: Tile) => t.hasStone;
export const CABIN_FILTER = (t: Tile) => t.hasCabin;
export const WHITE_STRUCTURE_FILTER = (t: Tile) => t.stone == StructureColor.White || t.cabin == StructureColor.White;
export const GREEN_STRUCTURE_FILTER = (t: Tile) => t.stone == StructureColor.Green || t.cabin == StructureColor.Green;
export const BLUE_STRUCTURE_FILTER = (t: Tile) => t.stone == StructureColor.Blue || t.cabin == StructureColor.Blue;
export const BLACK_STRUCTURE_FILTER = (t: Tile) => t.stone == StructureColor.Black || t.cabin == StructureColor.Black;
export const NO_STRUCTURE_FILTER = (t: Tile) => !t.hasStone && !t.hasCabin;

export const FILTERS = [FOREST_FILTER, DESERT_FILTER, SWAMP_FILTER, LAKE_FILTER, MOUNTAIN_FILTER, BEAR_FILTER,
    PUMA_FILTER, STONE_FILTER, CABIN_FILTER, WHITE_STRUCTURE_FILTER, GREEN_STRUCTURE_FILTER, BLUE_STRUCTURE_FILTER,
    BLACK_STRUCTURE_FILTER, NO_STRUCTURE_FILTER];
export const CONDITIONS = [IN_OR_WITHIN_X_TILES_OF_Y, WITHIN_X_TILES_OF_Y, IN_A_TILE_WITH_Y, NOT_IN_A_TILE_WITH_Y];
export const FILTERS_NAME = ["Forest", "Desert", "Swamp", "Lake", "Mountain", "Bear", "Puma", "Stone", "Cabin",
    "White Structure", "Green Structure", "Blue Structure", "Black Structure", "No Structure"];
export const CONDITIONS_NAME = ["In or within x tiles of a tile with a y", "Within x tiles of a tile with a y",
    "In a tile with a y", "Not in a tile with a y", "In a tile with a x or y"];