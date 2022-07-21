import { GameConstants } from "../../../constants/game-constants";
import { Entity } from "../entity";

export class DragonsLair extends Entity {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);

        this.padding = 4;
    }

    render(graphics) {
        graphics.fillStyle = GameConstants.COLORS.RED;
        graphics.fillRect(this.x, this.y, this.width, this.height);
        
        // graphics.drawText("Dragon's Lair:", 64, 64, GameConstants.COLORS.RED, true, GameConstants.BIG_FONT_SIZE);
        graphics.drawText("Dragon's Lair:", this.x + this.padding, this.y - (this.padding * 2), GameConstants.COLORS.RED, true, GameConstants.BIG_FONT_SIZE);
    }

    tick() {
    }
}