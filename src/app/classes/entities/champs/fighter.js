import { Champ } from "../champ";
import { Assets } from '../../assets/assets';

// const doesNotCollide = [GameConstants.TYPES.GARDEN, GameConstants.TYPES.PLOT, GameConstants.TYPES.LANE];

export class Fighter extends Champ {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);

        this.handler = handler;
        this.x = x;
        this.y = y;

        this.assets = Assets.getAssets('fighter');

        this.setDefaultBounds();
    }

    static getDisplayName() {
        return 'Fighter';
    }
}