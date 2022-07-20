import { GameConstants } from "../constants/game-constants";

let test = 0;

export class Player {
    constructor(handler) {
        this.handler = handler;
        this.party = [];

        this.width = 480;
        this.padding = 8;
        this.height = 64 + (this.padding * 2);
        this.x = (GameConstants.GAME_WIDTH / 2) - (this.width / 2);
        this.y = GameConstants.GAME_HEIGHT / 2 + 112 ;
    }

    addToParty(entity) {
        this.setPartyMemberPosition(entity);

        this.party.push(entity);
    }

    removeFromParty(entity) {
        this.party = this.party.filter(x.id !== entity.id);
    }

    getParty = () => this.party;

    clearParty() {
        this.party = [];
    }

    render(graphics) {
        graphics.fillStyle = GameConstants.COLORS.DARK_PURPLE;
        graphics.fillRect(this.x, this.y, this.width, this.height);
        
        this.party.forEach(member => {
            member.render(graphics);
        });

        graphics.drawText("Player Party:", this.x + this.padding, this.y - (this.padding * 2), GameConstants.COLORS.DARK_PURPLE, true, GameConstants.BIG_FONT_SIZE);
    }

    setPartyMemberPosition(member) {
        member.x = this.x + this.padding + (member.width * member.id) + this.padding;
        member.y = this.y + this.padding;
        test += member.x - this.x;
    }
}