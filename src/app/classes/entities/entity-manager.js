import { PlayerCursor } from '../input/player-cursor';
import { Rectangle } from './collision/rectangle';
import { GameConstants } from '../../constants/game-constants';

const clickableTypes = [
];

const dontRenderTypes = [
];

const hoverableTypes = [
];

let idCounter = 1;

export class EntityManager {
    constructor(handler) {
        this.handler = handler;
        this.lastEntityHovered = null;
        this.cursor = new PlayerCursor();
        this.entities = [];
    }

    tick(deltaTime) {
        for (let i = 0; i < this.entities.length; i += 1) {
            this.entities[i].tick(deltaTime);
        }
    }

    render(graphics) {
        for (let i = 0; i < this.entities.length; i += 1) {
            const entity = this.entities[i];

            if (entity.dontRender) continue;

            if (!dontRenderTypes.includes(entity.type)) {
                this.entities[i].render(graphics);
            }
        }

        if (this.cursor.x && this.cursor.y) {
            this.cursor.render(graphics);
        }
    }

    getSelectedChamps() {
        return this.entities.filter(entity => entity.selected && entity.type === GameConstants.TYPES.CHAMP);
    }

    getSelectedEnemies() {
        return this.entities.filter(entity => entity.selected && entity.type === GameConstants.TYPES.ENEMY);
    }

    addEntity(entity, addToFront = false) {
        entity.id = idCounter;
        idCounter += 1;

        if (addToFront) {
            this.entities.unshift(entity);
        } else {
            this.entities.push(entity);
        }

        const rectangle = new Rectangle(
            entity.x + entity.bounds.x, entity.y + entity.bounds.y, entity.bounds.width, entity.bounds.height
        );

        this.handler.getWorld().getSpatialGrid().insert(rectangle, entity);

        return entity;
    }

    findEntityByName(name) {
        return this.entities.find(entity => entity.name === name);
    }

    removeEntity(entity) {
        // let index = this.entities.indexOf(entity);

        this.handler.getWorld().getSpatialGrid().remove(
            new Rectangle(
                entity.x + entity.bounds.x, entity.y + entity.bounds.y, entity.bounds.width, entity.bounds.height,
            ), entity
        );

        // this.entities.splice(index, 1);
        this.entities = this.entities.filter(e => e.id !== entity.id);
        entity = undefined;
    }

    findClickableEntityAt(x, y) {
        const cursorBounds = new Rectangle(
            this.cursor.x + this.cursor.bounds.x,
            this.cursor.y + this.cursor.bounds.y,
            this.cursor.bounds.width,
            this.cursor.bounds.height,
        );

        // creating new array here so we dont reverse the original which causing crazy render and tick issues
        // because the entities array flips in reverse every frame LOL
        const reversed = [...this.entities].reverse();

        // searching through the entities in reverse because they are drawn first to last
        // so the last will be on drawn on top and the first on bottom covered by anything else, etc
        const clickableEntities = reversed.find((entity) => {
            if (!entity.bounds) {
                throw new Error(`entity type ${entity.type} has no bounds`)
            }

            const entityRect = new Rectangle(entity.x + entity.bounds.x, entity.y + entity.bounds.y, entity.bounds.width, entity.bounds.height);
            
            return cursorBounds.intersects(entityRect); // && clickableTypes.includes(entity.type);
        });

        return clickableEntities;
    }

    findEntityByType(type) {
        const match = this.entities.filter(entity => entity.type === type);

        return match;
    }

    mouseClick(data) {

        const { x, y } = data;
        const clicked = this.findClickableEntityAt(x, y);

        if (!clicked) {
            return;
        }

        if (clicked.wasClickedAt) {
            clicked.wasClickedAt(x, y);
        }
    }

    mouseMove(data) {
        const { x, y } = data;
        this.cursor.x = x;
        this.cursor.y = y;

        const hovered = this.findClickableEntityAt(x, y);

        if (!hovered) {
            // this.cursor.swapToHand();

            if (this.lastEntityHovered && this.lastEntityHovered.wasBlurred) {
                this.lastEntityHovered.wasBlurred();

                this.lastEntityHovered = null;
            }

            return;
        }

        // if (hoverableTypes.includes(hovered.type)) {
        //     this.cursor.swapToComputer();
        // } else {
        //     this.cursor.swapToHand();
        // }

        if (hovered && this.lastEntityHovered && hovered.id === this.lastEntityHovered.id) {
            return;
        } else {
            if (this.lastEntityHovered && this.lastEntityHovered.wasBlurred) {
                this.lastEntityHovered.wasBlurred();
            }

            if (hovered.wasHoveredAt) {
                hovered.wasHoveredAt(x, y);
            }

            this.lastEntityHovered = hovered;
        }

    }

    getEntitiesByType(type) {
        return this.entities.filter(entity => entity.type == type);
    }
}