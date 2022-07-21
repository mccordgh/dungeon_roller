import { Champ } from "../champ";
import { Assets } from '../../assets/assets';
import { GameConstants } from "../../../constants/game-constants";

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Paladin extends Champ {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('paladin');

        this.killsAllOfSubTypes = [
            GameConstants.BLACK_BANNERS.SKELETON,
        ];

        this.setDefaultBounds();
    }

    getDisplayName() {
        return 'Paladin';
    }
}