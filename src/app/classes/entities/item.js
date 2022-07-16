import { Entity } from "./entity";

export class Item extends Entity {
    constructor(handler, x, y) {
        super(handler, x, y);

        this.handler = handler;
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        // this.health = 50;
        // this.baseAttack = 4;

        this.type = gameConstants.TYPES.Item;
    }

    static getDisplayName() {
        throw new Error('Item must have a "getDisplayName()" method!');
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
        console.log(`was clicked at: ${this.getDisplayName()}`);
    }

    tick(dt) {
        // this.xMove = this.speed * dt;

        // this.move();
        this.assets.animations['icon'].tick();
    }

    render(graphics) {
        if (this.getAnimationFrame()) {
            graphics.drawSprite(this.getAnimationFrame(), this.x, this.y, this.width, this.height);
        }

        // ****** DRAW BOUNDING BOX
        // graphics.fillStyle = "purple";
        // graphics.fillRect(this.bounds.x + this.x, this.bounds.y + this.y, this.bounds.width, this.bounds.height);
        // ****** DRAW BOUNDING BOX
    }

    getAnimationFrame() {
        return this.assets.animations['icon'].getCurrentFrame();
    }
}