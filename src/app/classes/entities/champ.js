import { GameConstants } from "../../constants/game-constants";
import { Assets } from "../assets/assets";
import { Entity } from "./entity";

export class Champ extends Entity {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);

        this.handler = handler;
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.index = null;
        // this.health = 50;
        // this.baseAttack = 4;

        this.bannerAssets = Assets.getAssets('white-banner');

        this.type = GameConstants.TYPES.CHAMP;

        const world = this.handler.getWorld();

        this.clickableInStates = [
            world.STATES.CHOOSE_ATTACKING_CHAMP,
            world.STATES.CHOOSE_BANNERS_TO_REROLL,
        ];

        this.selected = false;
    }

    canBeSelectedInCurrentState() {
        const world = this.handler.getWorld();

        return this.clickableInStates.includes(world.state);
    }

    getDisplayName() {
        throw new Error('Hero must have a "getDisplayName()" method!');
    }

    wasClickedAt(x, y) {
        if (this.canBeSelectedInCurrentState()) {
            const world = this.handler.getWorld();

            switch (world.state) {
                case world.STATES.CHOOSE_BANNERS_TO_REROLL:
                    if (!this.selected) {
                        this.handler.getWorld().addSelectedChamp(this);
                    } else {
                        this.handler.getWorld().removeSelectedChamp(this);
                    }
                    break;

                case world.STATES.CHOOSE_ATTACKING_CHAMP:
                    world.setAttackingChamp(this);
                    break;

                default:
                    throw new Error(`Unexpected state in champ.wasClickedAt() => ${world.state}`);
            }
        }
    }

    tick(dt) {
        // this.xMove = this.speed * dt;

        // this.move();
        // this.assets.icon.tick();
    }

    canKillAllOfSubType(subType) {
        return this.killsAllOfSubTypes.includes(subType);
    }

    render(graphics) {
        if (this.selected) {
            const offsetX = 0;
            const offsetY = 8;

            graphics.fillStyle = this.attacking ? "red" : "grey";
            graphics.fillRect(this.x - offsetX, this.y - offsetY, this.width, this.height + (offsetY * 2));
        }
        
        graphics.drawSprite(this.bannerAssets.icon, this.x, this.y, this.width, this.height);

        graphics.drawSprite(this.assets.icon, this.x + 16, this.y + 8, this.width / 2, this.height / 2);

        // if (this.getAnimationFrame()) {
        //     graphics.drawSprite(this.getAnimationFrame(), this.x, this.y, this.width, this.height);
        // }

        // ****** DRAW BOUNDING BOX
        // graphics.fillStyle = "purple";
        // graphics.fillRect(this.bounds.x + this.x, this.bounds.y + this.y, this.bounds.width, this.bounds.height);
        // ****** DRAW BOUNDING BOX
    }

    getAnimationFrame() {
        return this.assets.animations['icon'].getCurrentFrame();
    }
}