import { Assets } from '../../assets/assets';
import { WhiteItem } from './white-item';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Scroll extends WhiteItem {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;
        this.width = width || 32;
        this.height = height || 32;

        this.assets = Assets.getAssets('scroll');

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Scroll';
    }
}