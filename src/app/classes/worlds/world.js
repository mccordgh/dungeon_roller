import { mapOne } from './maps/map-one';
import { EntityManager } from '../entities/entity-manager';
import { MazeGenerator } from './maze-generator';
import { Player } from '../entities/creatures/player';
import { SpatialGrid } from '../utils/spatial-grid';
import { TileManager } from '../tiles/tile-manager';
// import { Utils } from '../utils/utils';
const PATH = window.location.href;
const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;

export class World {
  constructor(_path, _handler) {
    this.tiles = [];
    this.handler = _handler;
    _handler.setWorld(this);
    this.entityManager = new EntityManager(_handler, new Player(_handler, 20, 20));
    // this.loadWorld(CURRENT_PATH + _path);
    this.loadWorld(PATH + 'src/res/world.wrd');
    this.spatialGrid = new SpatialGrid(this.width * TILE_WIDTH, this.height * TILE_HEIGHT, 64);
    this.init();
  }

  init() {
    //CASTLE!
    // this.entityManager.addEntity(new Castle(_handler, TILE_WIDTH * 47, Tile.TILE_HEIGHT * 42));

    //PLAYER SET SPAWN
    this.entityManager.getPlayer().setX(this.spawnX);
    this.entityManager.getPlayer().setY(this.spawnY);

    //HUD INIT
    // this.hud = new HUD(_handler, this.entityManager.getPlayer());
  }

  loadWorld(_path) {
    const maze = MazeGenerator.getRandomMaze(40, 40, 5, 5);

    this.width = maze.width;
    this.height = maze.height;
    this.spawnX = maze.spawnX * TILE_WIDTH;
    this.spawnY = maze.spawnY * TILE_HEIGHT;

    for(let y = 0; y < maze.height; y++){
      for(let x = 0; x < maze.width; x++){
        if(!this.tiles[x]) this.tiles[x] = [];
        this.tiles[x][y] = maze.pieces[x][y];
      }
    }
  }

  tick(_dt) {
    this.entityManager.tick(_dt);
  }

  render(_g) {
    var xStart = parseInt(Math.max(0, this.handler.getGameCamera().getxOffset() / TILE_WIDTH));
    var xEnd = parseInt(Math.min(this.width, (this.handler.getGameCamera().getxOffset() + this.handler.getWidth()) / TILE_WIDTH + 1));
    var yStart = parseInt(Math.max(0, this.handler.getGameCamera().getyOffset() / TILE_HEIGHT));
    var yEnd = parseInt(Math.min(this.height, (this.handler.getGameCamera().getyOffset() + this.handler.getHeight()) / TILE_HEIGHT + 1));

    // console.log({ xStart, xEnd, yStart, yEnd });
    // throw new Error();

    for(let y = yStart; y < yEnd; y++){
      // console.log("FOOOOR LOOOP");
      for(let x = xStart; x < xEnd; x++){
          // console.log(this.getTile(x, y));
        if (this.getTile(x,y) !== undefined)
          // console.log("INNNNNNNN");
          // console.log(this.getTile(x, y));
          this.getTile(x, y).render(_g, x * TILE_WIDTH - this.handler.getGameCamera().getxOffset(), y * TILE_HEIGHT -  this.handler.getGameCamera().getyOffset());
          // this.getTile(x, y).render(_g, x * 16, y * 16);
      }
    }

    // throw new Error();
    // _g.fillstyle = 'white';
    // _g.fillRect(100, 100, 200, 200);
    // this.hud.render(_g);
    this.entityManager.render(_g);
    // tree.render(_g);
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

  // getRoundOver(){
  //   return roundOver;
  // }

  // setRoundOver(_bool){
  //   roundOver = _bool;
  // }
}
