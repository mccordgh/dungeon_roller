import { GameConstants } from "../../../constants/game-constants";
import { StaticEntity } from "./static-entity";


export class SkipPhaseButton extends StaticEntity {
    constructor(handler) {
        super(handler)
        
        this.handler = handler;

        this.x = GameConstants.GAME_WIDTH - 192 - 64 + 16;
        this.y = (GameConstants.GAME_HEIGHT / 2) + 112 + 8;
        this.width = 192;
        this.height = 64;

        this.bounds = {x: 0, y: 0, width: this.width, height: this.height};

        this.padding = 12;

        this.type = GameConstants.TYPES.STATIC_BUTTON;

        const world = this.handler.getWorld();

        this.clickableInStates = [
            world.STATES.USE_SCROLLS,
            world.STATES.CHOOSE_BANNERS_TO_REROLL,
            world.STATES.USE_HERO_POWER,
        ];
    }

    tick() {

    }

    wasClickedAt(x, y) {
        if (this.canBeSelectedInCurrentState()) {
            this.handler.getWorld().skipPhaseClicked();
        }
    }

    canBeSelectedInCurrentState() {
        const world = this.handler.getWorld();

        return this.clickableInStates.includes(world.state);
    }

    wasHoveredAt(x, y) {
        //
    }

    wasBlurred() {
        //
    }

    render(graphics) {
        if (this.canBeSelectedInCurrentState()) {
            graphics.fillStyle = GameConstants.COLORS.DARK_PURPLE;
            graphics.fillRect(this.x, this.y, this.width, this.height);
    
            graphics.drawText("Skip Phase", this.x + this.padding, this.y + (this.height / 2) + 12, GameConstants.COLORS.CREAM, true, GameConstants.BIG_FONT_SIZE);
    
            // draw collision bounds for debugging
            // graphics.fillStyle = "white";
            // graphics.fillRect(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height)
        }
    }
}