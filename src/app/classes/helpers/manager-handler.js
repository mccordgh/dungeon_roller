import { MouseManager } from "../input/mouse-manager";
import { GraphicsManager } from "../graphics/graphics-manager";
import { EntityManager } from '../entities/entity-manager';
import { StateManager } from '../states/state-manager';
import { WorldOne } from '../worlds/world-one';
import { SoundManager } from '../sounds/sound-manager';
import { GameState } from '../states/game-state';

export class ManagerHandler {
    constructor(game) {
        this.game = game;

        this.entityManager = null;
        this.graphicsManager = null;
        this.monsterManager = null;
        this.mouseManager = null;
        this.seedManager = null;
        this.stateManager = null;
        this.uiManager = null;
        this.world = null;
    }

    getEntityManager() {
        return this.entityManager;
    }

    getGame() {
        return this.game;
    }

    getGraphicsManager() {
        return this.graphicsManager;
    }

    getMouseManager() {
        return this.mouseManager;
    }

    getSoundManager() {
        return this.soundManager;
    }

    getWorld() {
        return this.world;
    }

    createEntityManager() {
        return this.entityManager = new EntityManager(this);
    }

    createGraphicsManager() {
        return this.graphicsManager = new GraphicsManager();
    }

    createMouseManager() {
        return this.mouseManager = new MouseManager(this);
    }

    createSoundManager() {
        return this.soundManager = new SoundManager(this);
    }

    createStateManager() {
        return this.stateManager = new StateManager();
    }

    setWorld(world) {
        return this.world = world;
    }

    updateWorld(world) {
        this.setWorld(world);

        const gameState = new GameState(this, world);
        this.stateManager.setState(gameState);
    }

    event(type, data) {
        if (type === 'click') {
            this.entityManager.mouseClick(data);
        }

        if (type === 'move') {
            this.entityManager.mouseMove(data);
        }
    }
}