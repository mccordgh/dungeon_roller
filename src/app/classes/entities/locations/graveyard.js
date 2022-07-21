import { GameConstants } from "../../../constants/game-constants";
import { Entity } from "../entity";

export class GraveYard extends Entity {
    constructor(handler, x, y, width, height) {
        super(handler, x, y, width, height);

        this.padding = 8;
    
        this.party = [];
    }

    render(graphics) {
        graphics.fillStyle = GameConstants.COLORS.GREY;
        graphics.fillRect(this.x, this.y - this.padding, this.width, this.height);
        
        // graphics.drawText("Dragon's Lair:", 64, 64, GameConstants.COLORS.RED, true, GameConstants.BIG_FONT_SIZE);
        graphics.drawText("Grave Yard:", this.x + this.padding, this.y - (this.padding * 2), GameConstants.COLORS.GREY, true, GameConstants.BIG_FONT_SIZE);

        this.party.forEach(member => {
            member.render(graphics);
        })
    }

    tick() {
    }

    addMember(champ) {
        this.party.push(champ);
        this.setPartyIndexes();
        this.setPartyMemberPosition(this.party[this.party.length - 1]);
    }

    setPartyMemberPosition(member) {
        member.x = this.x + (this.padding / 2) + (member.width * (member.index % 4)) + (this.padding / 2);
        member.y = this.y + this.padding;

        if (member.index > 3) {
            member.y = member.y + 96;
        }
    }

    setPartyIndexes() {
        this.party.forEach((member, index) => {
            member.index = index;
        })
    }
}