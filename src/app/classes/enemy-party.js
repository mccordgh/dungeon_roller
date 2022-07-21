import { GameConstants } from "../constants/game-constants";

export class EnemyParty {
    constructor(handler) {
        this.handler = handler;
        this.party = [];

        this.width = 480;
        this.padding = 8;
        this.height = 64 + (this.padding * 2);
        this.x = (GameConstants.GAME_WIDTH / 2) - (this.width / 2);
        this.y = 64;

        this.dragonsLair = null;
    }

    setDragonsLair(lair) {
        this.dragonsLair = lair;
    }

    addToDragonsLair(member) {
        this.dragonsLair.addMember(member);
        this.removeFromParty(member);
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
        
        this.party.forEach(member => {
            this.setPartyMemberPosition(member);
        });
    }

    getParty = () => this.party;

    clearParty() {
        this.party = [];
    }

    removeAttackedMonsters(monsters) {
        const ids = monsters.map(monster => monster.id);

        this.party = this.party.filter(member => !ids.includes(member.id));
        this.setPartyIndexes();    
        
        this.setAllPartyMembersPositions();
    }

    setAllPartyMembersPositions() {
        this.party.forEach(member => {
            this.setPartyMemberPosition(member);
        });
    }

    replaceRerolledEnemiesInParty(rerolledEnemies) {
        const membersToRemove = [];

        this.party = this.party.map(member => {
            rerolledEnemies.forEach((enemy) => {
                if (member.id === enemy.id) {
                    if (enemy.subType === GameConstants.BLACK_BANNERS.DRAGON) {
                        this.addToDragonsLair(enemy);
                        membersToRemove.push(member);
                    } else {
                        enemy.index = member.index;
                        this.setPartyMemberPosition(enemy);
                        member = enemy;
                    }
                }
            });

            return member;
        });

        membersToRemove.forEach(member => {
            this.removeFromParty(member);
        })

        this.setPartyIndexes();
        this.setAllPartyMembersPositions();
    }

    render(graphics) {
        graphics.fillStyle = GameConstants.COLORS.LIGHT_PURPLE;
        graphics.fillRect(this.x, this.y, this.width, this.height);
        
        this.party.forEach(member => {
            member.render(graphics);
        });

        graphics.drawText("Enemy Party:", this.x + this.padding, this.y - (this.padding * 2), GameConstants.COLORS.LIGHT_PURPLE, true, GameConstants.BIG_FONT_SIZE);
    }

    setPartyMemberPosition(member) {
        member.x = this.x + this.padding + (member.width * member.index) + this.padding;
        member.y = this.y + this.padding;
    }
}