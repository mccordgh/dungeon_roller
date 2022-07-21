import { GameConstants } from '../../../constants/game-constants';
import { Assets } from '../../assets/assets';
import { Enemy } from '../enemy';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Dragon extends Enemy {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('dragon');

        this.subType = GameConstants.BLACK_BANNERS.DRAGON;

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Dragon';
    }
}