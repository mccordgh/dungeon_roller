import { GameConstants } from "../../../constants/game-constants";
import { Entity } from "../entity";

export class GraveYard extends Entity {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);

        this.padding = 4;
    }

    render(graphics) {
        graphics.fillStyle = GameConstants.COLORS.GREY;
        graphics.fillRect(this.x, this.y + (this.padding * 4), this.width, this.height);
        
        // graphics.drawText("Dragon's Lair:", 64, 64, GameConstants.COLORS.RED, true, GameConstants.BIG_FONT_SIZE);
        graphics.drawText("Grave Yard:", this.x + this.padding, this.y + (this.padding * 2), GameConstants.COLORS.GREY, true, GameConstants.BIG_FONT_SIZE);
    }

    tick() {
    }
}