const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 9;

export class Board {
    private readonly tiles: Tile[];

    constructor(tiles: Tile[]) {
        this.tiles = tiles;
    }

    public getTiles(): Tile[] {
        return this.tiles;
    }

    public getTile(index: number): Tile {
        return this.tiles[index];
    }

    public getTileIndex(tile: Tile): number {
        return this.tiles.indexOf(tile);
    }

    public getTileAt(x: number, y: number): Tile {
        return this.tiles[y * BOARD_WIDTH + x];
    }

    public getTileNeighbours(tile: Tile, radius = 1): Tile[] {
        return this.getTiles().filter(t => this.getTilesDistance(tile, t) <= radius && t != tile);
    }

    public getTilesDistance(t1: Tile, t2: Tile) {
        const c1 = this.getTileCoords(t1);
        const c2 = this.getTileCoords(t2);
        const a1 = this.oddq_to_axial(c1.x, c1.y);
        const a2 = this.oddq_to_axial(c2.x, c2.y);
        return this.axial_distance(a1.q, a1.r, a2.q, a2.r);
    }

    private getTileCoords(tile: Tile): { x: number, y: number } {
        const index = this.getTileIndex(tile);
        return {x: index % BOARD_WIDTH, y: Math.floor(index / BOARD_WIDTH)};
    }

    private axial_distance(q1: number, r1: number, q2: number, r2: number) {
        return (Math.abs(q1 - q2) + Math.abs(q1 + r1 - q2 - r2) + Math.abs(r1 - r2)) / 2;
    }

    private oddq_to_axial(x: number, y: number) {
        return {q: x, r: y - (x - (x & 1)) / 2};
    }

    public static fromPartOrder(order: number[]) {
        const tiles = [];
        for (let i = 0; i < 6; i++) {
            let part = PARTS_LAYOUT[order[i]];
            for (let j = 0; j < part.length; j++) {
                let tile = new Tile(part[j]);
                if (PART_PUMA_TERRITORY[i].indexOf(j) != -1) tile.hasPuma = true;
                if (PART_BEAR_TERRITORY[i].indexOf(j) != -1) tile.hasBear = true;
                tiles.push(tile);
            }
        }

        // Order the tiles
        const orderedTiles = [];
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 6; k++) orderedTiles.push(tiles[i * 36 + j * 6 + k]);
                for (let k = 0; k < 6; k++) orderedTiles.push(tiles[i * 36 + j * 6 + k + 18]);
            }

        for (let i = 0; i < tiles.length; i++) orderedTiles[i].index = i;
        return new Board(orderedTiles);
    }
}

export class Tile {
    public biome: Biome
    public hasBear: boolean;
    public hasPuma: boolean;
    public stone: StructureColor = StructureColor.None;
    public cabin: StructureColor = StructureColor.None;
    public index: number = -1;

    constructor(biome: Biome) {
        this.biome = biome;
        this.hasBear = false;
        this.hasPuma = false;
    }

    public get hasStone() {
        return this.stone != StructureColor.None;
    }

    public get hasCabin() {
        return this.cabin != StructureColor.None;
    }
}

export enum Biome {
    Forest, Desert, Swamp, Lake, Mountain
}

export enum StructureColor {
    None, White, Green, Blue, Black
}

const PARTS_LAYOUT = [
    [
        0, 1, 1, 1, 2, 2,
        0, 0, 1, 3, 2, 2,
        0, 0, 3, 3, 3, 3
    ],
    [
        1, 4, 4, 4, 4, 2,
        1, 1, 1, 0, 2, 2,
        0, 0, 0, 0, 0, 2
    ],
    [
        2, 2, 0, 0, 0, 3,
        2, 2, 0, 4, 3, 3,
        4, 4, 4, 4, 3, 3
    ],
    [
        0, 0, 0, 1, 1, 1,
        3, 3, 3, 4, 1, 1,
        4, 4, 4, 4, 1, 1
    ],
    [
        3, 3, 3, 3, 1, 1,
        4, 4, 3, 1, 1, 2,
        4, 4, 4, 2, 2, 2
    ],
    [
        0, 3, 3, 3, 3, 4,
        0, 0, 2, 2, 4, 4,
        0, 2, 2, 2, 1, 1
    ]
];

const PART_BEAR_TERRITORY = [
    [15, 16, 17],
    [],
    [],
    [],
    [0, 1, 6],
    [0, 6]
];

const PART_PUMA_TERRITORY = [
    [],
    [0, 1, 2],
    [5, 10, 11],
    [11, 17],
    [],
    []
]