import { GameConstants } from "../../constants/game-constants";
import { Party } from "./party";

export class EnemyParty extends Party {
    constructor(handler) {
        super(handler);

        this.width = 480;
        this.padding = 8;
        this.height = 64 + (this.padding * 2);
        this.x = (GameConstants.GAME_WIDTH / 2) - (this.width / 2);
        this.y = 64;

        this.backgroundColor = GameConstants.COLORS.LIGHT_PURPLE;
        this.textColor = GameConstants.COLORS.LIGHT_PURPLE;

        this.dragonsLair = null;
    }

    setDragonsLair(lair) {
        this.dragonsLair = lair;
    }

    addToDragonsLair(member) {
        this.dragonsLair.addMember(member);
        this.removeFromParty(member);
    }

    removeAttackedMonsters(monsters) {
        const ids = monsters.map(monster => monster.id);

        this.party = this.party.filter(member => !ids.includes(member.id));

        this.setPartyIndexes();    
        this.setAllPartyMembersPositions();
    }

    sendAllDragonsToLair() {
        for (let i = 0; i < this.party.length; i++) {
            const member = this.party[i];

            if (member && member.subType === GameConstants.BLACK_BANNERS.DRAGON) {
                this.addToDragonsLair(member);
            }
        }
    }
}