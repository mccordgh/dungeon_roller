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
        this.setPartyIndexes();
    }

    setPartyIndexes() {
        this.party.forEach((member, index) => {
            member.index = index;
        })
    }

    removeFromParty(entity) {
        this.party = this.party.filter(x.id !== entity.id);
        this.setPartyIndexes();
    }

    getParty = () => this.party;

    clearParty() {
        this.party = [];
    }

    replaceRerolledChampsInParty(rerolledChamps) {
        const test = [ ...this.party];

        this.party = this.party.map(member => {
            rerolledChamps.forEach((champ, index) => {
                if (member.id === champ.id) {
                    champ.index = member.index;
                    this.setPartyMemberPosition(champ);
                    member = champ;
                }
            });

            return member;
        });
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
        member.x = this.x + this.padding + (member.width * member.index) + this.padding;
        member.y = this.y + this.padding;
        test += member.x - this.x;
    }

    hasScrollInParty() {
        const scrolls = this.party.filter(item => item.type === GameConstants.TYPES.WHITE_ITEM);

        return scrolls.length > 0;
    }
}