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
            world.STATES.CHOOSE_BANNERS_TO_REROLL,
        ];
    }

    getDisplayName() {
        return 'Scroll';
    }

    canBeSelectedInCurrentState() {
        const world = this.handler.getWorld();

        if (world.state === world.STATES.CHOOSE_BANNERS_TO_REROLL && world.selectedRerollScroll && (world.selectedRerollScroll.id === this.id)) {
            return false;
        }

        return this.clickableInStates.includes(world.state);
    }

    wasClickedAt() {
        if (this.canBeSelectedInCurrentState()) {
            const world = this.handler.getWorld();
    
            switch (world.state) {
                case world.STATES.USE_SCROLLS:
                    world.assignRerollScroll(this);
                    break;

                case world.STATES.CHOOSE_BANNERS_TO_REROLL:
                    if (this.selected) {
                        world.removeSelectedChamp(this);
                    } else {
                        world.addSelectedChamp(this);
                    }
                    break;

                default:
                    throw new Error(`unexpected state in scroll.wasClickedAt() => ${world.state}`);
            }
        }
    }

    whenSelected() {
        const world = this.handler.getWorld();

        world.selectedRerollScroll = this;
        world.state = world.STATES.CHOOSE_BANNERS_TO_REROLL;
    }
}