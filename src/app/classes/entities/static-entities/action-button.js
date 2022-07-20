import { GameConstants } from "../../../constants/game-constants";
import { StaticEntity } from "./static-entity";


export class ActionButton extends StaticEntity {
    constructor(handler) {
        super(handler)
        
        this.handler = handler;

        this.x = 64 - 16;
        this.y = (GameConstants.GAME_HEIGHT / 2) + 112 + 8;
        this.width = 192;
        this.height = 64;

        this.bounds = {x: 0, y: 0, width: this.width, height: this.height};

        this.padding = 12;

        this.type = GameConstants.TYPES.ACTION_BUTTON;
        
        this.actionName = "";
    }

    tick() {

    }

    setAction(actionName) {
        this.actionName = actionName;
    }

    clearAction() {
        this.actionName = "";
    }

    wasClickedAt(x, y) {
        //
    }

    wasHoveredAt(x, y) {
        //
    }

    wasBlurred() {
        //
    }

    render(graphics) {
        if (!this.actionName) return;

        graphics.fillStyle = GameConstants.COLORS.DARK_PURPLE;
        graphics.fillRect(this.x, this.y, this.width, this.height);

        graphics.drawText(this.actionName, this.x + this.padding, this.y + (this.height / 2) + 12, GameConstants.COLORS.CREAM, true, GameConstants.BIG_FONT_SIZE);

        // draw collision bounds for debugging
        // graphics.fillStyle = "white";
        // graphics.fillRect(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height)
    }
}