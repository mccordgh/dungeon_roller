import { GameConstants } from "../../constants/game-constants";
import { Party } from "./party";

export class PlayerParty extends Party {
    constructor(handler) {
        super(handler);

        this.width = 480;
        this.padding = 8;
        this.height = 64 + (this.padding * 2);
        this.x = (GameConstants.GAME_WIDTH / 2) - (this.width / 2);
        this.y = GameConstants.GAME_HEIGHT / 2 + 112;

        this.backgroundColor = GameConstants.COLORS.DARK_PURPLE;
        this.textColor = GameConstants.COLORS.DARK_PURPLE;

        this.graveYard = null;
    }

    setGraveYard(graveYard) {
        this.graveYard = graveYard;
    }

    sendToGraveyard(champ) {
        this.graveYard.addMember(champ);
        this.removeFromParty(champ);
    }

    hasScrollInParty() {
        const scrolls = this.party.filter(item => item.type === GameConstants.TYPES.WHITE_ITEM);

        return scrolls.length > 0;
    }
}