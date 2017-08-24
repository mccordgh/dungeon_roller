// import { mapOne } from './maps/map-one';
import { EntityManager } from '../entities/entity-manager';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
// import { Utils } from '../utils/utils';
// const PATH = window.location.href;
const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;
let yellowTilesDown = false;
let yellowWallInterval = 0;
const yellowWallIntervalMax = 3 * 60; // We want X seconds so we multiply that by our FPS which is 60
let switchTimer = 0;

export class World {
  constructor(_handler) {
    this.tiles = [];
    this.handler = _handler;
    _handler.setWorld(this);
    this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
    this.spatialGrid = new SpatialGrid(this.width * TILE_WIDTH, this.height * TILE_HEIGHT, 64);
    this.level = 1;
    this.loadWorld();
    this.init();
  }

  init() {
    //PLAYER SET SPAWN
    this.entityManager.getPlayer().setX(this.spawnX);
    this.entityManager.getPlayer().setY(this.spawnY);
  }

  loadWorld() {
    const pieces = this.fillWorld(40, 40, 19, 19);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = pieces[x][y];
      }
    }
  }

  fillWorld(height, width, spawnX, spawnY) {
    const maze = MazeGenerator.getRandomMaze(height, width, spawnX, spawnY);

    this.height = maze.height;
    this.width = maze.width;
    this.spawnX = maze.spawnX * TILE_WIDTH;
    this.spawnY = maze.spawnY * TILE_HEIGHT;

    return maze.pieces;
  }

  swapGreenAndBlueTiles(color) {
    if (switchTimer < 60) return;

    if (color === 'blue') {
      this.swapTilesByID(5, 3);
      this.swapTilesByID(8, 7);
      this.swapTilesByID(6, 9);
    } else if (color === 'green') {
      this.swapTilesByID(3, 5);
      this.swapTilesByID(7, 8);
      this.swapTilesByID(9, 6);
    }

    switchTimer = 0;
  }

  getInput() {
    //
  }

  swapTilesByID(tileID, swapTileID) {
    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        if (this.tiles[x][y] === tileID) {
          this.tiles[x][y] = swapTileID;
        }
      }
    }
  }

  checkForWallSwap() {
    yellowWallInterval++;

    if (yellowWallInterval > yellowWallIntervalMax) {
      yellowWallInterval = 0;

      if (yellowTilesDown)
        this.swapTilesByID(4, 2);
      else
        this.swapTilesByID(2, 4);

      yellowTilesDown = !yellowTilesDown;
    }
  }

  tick(_dt) {
    this.getInput();
    this.checkForWallSwap();
    this.entityManager.tick(_dt);
    switchTimer++;
  }

  render(_g) {
    var xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / TILE_WIDTH));
    var xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / TILE_WIDTH + 1));
    var yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / TILE_HEIGHT));
    var yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / TILE_HEIGHT + 1));

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        if (this.getTile(x, y) !== undefined)
          this.getTile(x, y).render(_g, x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT - this.handler.getGameCamera().getyOffset());
      }
    }
    this.entityManager.render(_g);
  }

  getTile(_x, _y) {
    return TileManager.getTiles()[this.tiles[_x][_y]];
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getEntityManager() {
    return this.entityManager;
  }

  getSpatialGrid() {
    return this.spatialGrid;
  }
}
