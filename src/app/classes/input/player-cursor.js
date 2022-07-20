
import { Assets } from '../assets/assets';

export class PlayerCursor {
    constructor() {
        this.x = null;
        this.y = null;

        this.bounds = {
            x: -4,
            y: -4,
            width: 8,
            height: 8,
        };

        this.assets = {
            cursor: Assets.getAssets('cursor').pointer,
        };

        // this.swapToComputer();
        // this.swapToHand();
    }

    render(graphics) {
        //offset x, y for hand cursor so click zone isnt at top left of sprite
        // const isHandCursor = this.cursor === this.assets.hand;
        const offset = 0;
        const size = 32;

        graphics.drawSprite(this.assets.cursor, this.x - 2, this.y - 1, size, size);

        // draw collision bounds for debugging
        graphics.fillStyle = "red";
        graphics.fillRect(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height)
    }

    // swapToComputer() {
    //     this.cursor = this.assets.arrow;
    //     this.bounds = this.arrowBounds;
    // }

    // swapToHand() {
    //     this.cursor = this.assets.hand;
    //     this.bounds = this.handBounds;
    // }
}