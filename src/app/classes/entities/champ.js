import { GameConstants } from "../../constants/game-constants";
import { Assets } from "../assets/assets";
import { Entity } from "./entity";

export class Champ extends Entity {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);

        this.handler = handler;
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        // this.health = 50;
        // this.baseAttack = 4;

        this.bannerAssets = Assets.getAssets('white-banner');

        this.type = GameConstants.TYPES.HERO;
    }

    static getDisplayName() {
        throw new Error('Hero must have a "getDisplayName()" method!');
    }

    setDefaultBounds() {
        const boundsX = Math.floor(this.width / 4);

        this.bounds = {
            x: this.width - boundsX,
            y: 0,
            width: boundsX,
            height: this.height,
        };
    }

    wasClickedAt() {
        console.log(`was clicked at: ${this.getDisplayName ? this.getDisplayName() : `\nno getDisplayName for ${this}`}`);
    }

    tick(dt) {
        // this.xMove = this.speed * dt;

        // this.move();
        // this.assets.icon.tick();
    }

    render(graphics) {
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