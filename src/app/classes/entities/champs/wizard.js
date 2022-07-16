import { Champ } from "../champ";
import { Assets } from '../../assets/assets';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Wizard extends Champ {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;
        this.width = width || 32;
        this.height = height || 32;

        this.assets = Assets.getAssets('wizard');

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Wizard';
    }
}