import { Assets } from '../../assets/assets';
import { WhiteItem } from './white-item';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Scroll extends WhiteItem {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('scroll');

        this.setDefaultBounds();

        const world = this.handler.getWorld();

        this.clickableInStates = [
            world.STATES.USE_SCROLLS,
        ];
    }

    static getDisplayName() {
        return 'Scroll';
    }

    canBeSelectedInCurrentState() {
        const world = this.handler.getWorld();

        return this.clickableInStates.includes(world.state);
    }
}