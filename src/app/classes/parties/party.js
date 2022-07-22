import { GameConstants } from "../../constants/game-constants";

export class Party {
    constructor(handler) {
        this.handler = handler;
        this.party = [];

        this.width = null;
        this.padding = null;
        this.height = null;
        this.x = null;
        this.y = null;

        this.backgroundColor = null;
    }

    addToParty(entity) {
        this.setPartyMemberPosition(entity);

        this.party.push(entity);
    }

    setPartyIndexes() {
        this.party.forEach((member, index) => {
            member.index = index;
        })
    }

    removeFromParty(entity) {
        this.party = this.party.filter(member => entity.id !== member.id);
        this.setPartyIndexes();
    }

    getParty = () => this.party;

    clearParty() {
        this.party = [];
    }

    setAllPartyMembersPositions() {
        this.party.forEach(member => {
            this.setPartyMemberPosition(member);
        });
    }

    replaceRerolledPartyMembers(rerolledEnemies) {
        this.party = this.party.map(member => {
            rerolledEnemies.forEach((enemy) => {
                if (member.id === enemy.id) {
                    enemy.index = member.index;
                    enemy.id = -1 // temporary to dodge deletion by next line
                    this.handler.getWorld().entityManager.removeEntity(member);
                    enemy.id = member.id;
                    member = enemy;
                }
            });

            return member;
        }).reverse();;

        this.sendAllDragonsToLair();

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

    render(graphics) {
        graphics.fillStyle = this.backgroundColor;
        graphics.fillRect(this.x, this.y, this.width, this.height);
        
        this.party.forEach(member => {
            member.render(graphics);
        });

        graphics.drawText("Enemy Party:", this.x + this.padding, this.y - (this.padding * 2), this.textColor, true, GameConstants.BIG_FONT_SIZE);
    }

    setPartyMemberPosition(member) {
        member.x = this.x + this.padding + (member.width * member.index) + this.padding;
        member.y = this.y + this.padding;
    }
}