import { GameConstants } from '../../../constants/game-constants';
import { Assets } from '../../assets/assets';
import { BlackItem } from './black-item';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Potion extends BlackItem {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
        
        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('potion');

        this.subType = GameConstants.BLACK_BANNERS.POTION;

        this.setDefaultBounds();

        const world = this.handler.getWorld();

        this.clickableInStates = [
            world.STATES.CHOOSE_BANNERS_TO_REROLL,
        ];
    }

    canBeSelectedInCurrentState() {
        const world = this.handler.getWorld();

        return this.clickableInStates.includes(world.state);
    }
    
    getDisplayName() {
        return 'Potion';
    }
}