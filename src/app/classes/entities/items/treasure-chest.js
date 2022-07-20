import { Assets } from '../../assets/assets';
import { BlackItem } from './black-item';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class TreasureChest extends BlackItem {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('treasure-chest');

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Treasure Chest';
    }
}