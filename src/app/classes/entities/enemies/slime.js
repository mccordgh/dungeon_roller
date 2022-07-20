import { Assets } from '../../assets/assets';
import { Enemy } from '../enemy';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Slime extends Enemy {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('slime');

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Slime';
    }
}