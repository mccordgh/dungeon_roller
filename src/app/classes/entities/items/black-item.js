import { GameConstants } from "../../../constants/game-constants";
import { Assets } from "../../assets/assets";
import { Item } from "../item";

export class BlackItem extends Item {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
    
        this.bannerAssets = Assets.getAssets('black-banner');
    
        this.type = GameConstants.TYPES.BLACK_ITEM;
    }
}