import { GameConstants } from "../../../constants/game-constants";
import { Assets } from "../../assets/assets";
import { Item } from "../item";

export class WhiteItem extends Item {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);
    
        this.bannerAssets = Assets.getAssets('white-banner');
    
        this.type = GameConstants.TYPES.WHITE_ITEM;
    }
}