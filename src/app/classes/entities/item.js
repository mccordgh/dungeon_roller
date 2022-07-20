import { GameConstants } from "../../constants/game-constants";
import { Entity } from "./entity";

export class Item extends Entity {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);

        this.handler = handler;
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        // this.health = 50;
        // this.baseAttack = 4;

        this.type = GameConstants.TYPES.ITEM;
        this.selected = false;
    }

    static getDisplayName() {
        throw new Error('Item must have a "getDisplayName()" method!');
    }

    canBeSelectedInCurrentState() {
        console.log(this)
        throw new Error(`Can be selected in current state not implemented for above ^`);
    }

    wasClickedAt() {
        if (this.canBeSelectedInCurrentState()) {
            if (!this.selected) {
                if (this.type === GameConstants.TYPES.BLACK_ITEM) {
                    this.handler.getWorld().addSelectedEnemy(this);
                } else {
                    this.handler.getWorld().addSelectedChamp(this);
                }
            } else {
                if (this.type === GameConstants.TYPES.BLACK_ITEM) {
                    this.handler.getWorld().removeSelectedEnemy(this);
                } else {
                    this.handler.getWorld().removeSelectedChamp(this);
                }
            }
        }
    }

    tick(dt) {
        // this.xMove = this.speed * dt;

        // this.move();
        // this.assets.animations['icon'].tick();
    }

    render(graphics) {
        if (this.selected) {
            const offsetX = 0;
            const offsetY = 8;

            graphics.fillStyle = "grey";
            graphics.fillRect(this.x - offsetX, this.y - offsetY, this.width, this.height + (offsetY * 2));
        }

        graphics.drawSprite(this.bannerAssets.icon, this.x, this.y, this.width, this.height);
        
        graphics.drawSprite(this.assets.icon, this.x + 16, this.y + 8, this.width / 2, this.height / 2);
        // if (this.getAnimationFrame()) {
        //     graphics.drawSprite(this.getAnimationFrame(), this.x, this.y, this.width, this.height);
        // }

        // ****** DRAW BOUNDING BOX
        // graphics.fillStyle = "purple";
        // graphics.fillRect(this.bounds.x + this.x, this.bounds.y + this.y, this.bounds.width, this.bounds.height);
        // ****** DRAW BOUNDING BOX
    }

    getAnimationFrame() {
        return this.assets.animations['icon'].getCurrentFrame();
    }
}