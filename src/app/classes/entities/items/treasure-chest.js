import { Assets } from '../../assets/assets';
import { Item } from '../item';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class TreasureChest extends Item {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;
        this.width = width || 32;
        this.height = height || 32;

        this.assets = Assets.getAssets('treasure-chest');

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Treasure Chest';
    }
}