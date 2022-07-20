import { Champ } from "../champ";
import { Assets } from '../../assets/assets';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Champion extends Champ {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('champion');

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Champion';
    }
}