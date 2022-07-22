
import { GameConstants } from '../../constants/game-constants';
import { SpatialGrid } from '../entities/collision/spatial-grid';
import { Dialogue } from '../dialogue/dialogue';
import { Champion } from '../entities/champs/champion';
import { Fighter } from '../entities/champs/fighter';
import { Paladin } from '../entities/champs/paladin';
import { Thief } from '../entities/champs/thief';
import { Wizard } from '../entities/champs/wizard';
import { Goblin } from '../entities/enemies/goblin';
import { Skeleton } from "../entities/enemies/skeleton";
import { Slime } from '../entities/enemies/slime';
import { Dragon } from '../entities/enemies/dragon';
import { Potion } from '../entities/items/potion';
import { Scroll } from '../entities/items/scroll';
import { TreasureChest } from '../entities/items/treasure-chest';
import { Assets } from "../assets/assets";
import { Player } from '../player';
import { DragonsLair } from '../entities/locations/dragons-lair';
import { GraveYard } from '../entities/locations/graveyard';
import { EnemyParty } from '../enemy-party';
import { SkipPhaseButton } from '../entities/static-entities/skip-phase-button';
import { ActionButton } from '../entities/static-entities/action-button';

let counter = 0;

export class WorldOne {
    constructor(handler) {
        this.handler = handler;
        this.entityManager = handler.createEntityManager();
      
        // this.assets = {
        //     background: Assets.getAssets('background').image,
        // };

        this.spatialGrid = new SpatialGrid(
            GameConstants.GAME_WIDTH,
            GameConstants.GAME_HEIGHT,
            GameConstants.SPATIAL_GRID_SIZE,
        );

        this.STATES = {
            CHOOSE_MONSTER_TO_ATTACK: "choose-monster-to-attack",
            CHOOSE_ATTACKING_CHAMP: "choose-attacking-champ",
            CHOOSE_BANNERS_TO_REROLL: "choose-banners-to-reoll",
            DRAGON_ATTACKS: "dragon-attacks",
            GAME_WON: 'game-won',
            INITIALIZE: 'initialize',
            INTRO: 'intro',
            IDLE: 'idle',
            ROLL_ENEMIES: "roll-enemies",
            TEST: 'test',
            TEST_INIT: 'test-init',
            USE_SCROLLS: 'use-scrolls',
            USE_HERO_POWER: 'use-hero-power',
        };

        // this.state = this.states.IDLE;
        this.state = this.STATES.INITIALIZE;
        // this.state = this.states.TEST_INIT;

        this.player = new Player(handler);
        this.enemyParty = new EnemyParty(handler);

        this.clearSelectedEntities();
        // this.selectedRerollScroll = null;
    }

    assignRerollScroll(scroll) {
        // if (this.selectedRerollScroll) {
        //     this.selectedRerollScroll.selected = false;
        // }

        scroll.selected = true;
        this.selectedRerollScroll = scroll;
    }

    clearSelectedEntities() {
        this.selectedEnemies = [];
        this.selectedChamps = [];
        this.selectedRerollScroll = null;
        this.attackingChamp = null;
    }      
    // addCorrectPhoneDialogue(callback) {
    //     this.dialogue = this.entityManager.addEntity(
    //         new Dialogue(
    //             this.handler,
    //             [
    //                 'Hello? HELLO????',
    //                 'Listen keep your voice down... OKAY?!',
    //                 "I'm not supposed to tell you this, but...",
    //                 "The clue is BONK.",
    //             ],
    //         ),
    //     );

    //     callback();
    // }

    // addBadPhoneDialogue(callback) {
    //     this.dialogue = this.entityManager.addEntity(
    //         new Dialogue(
    //             this.handler,
    //             [
    //                 'No answer...',
    //             ],
    //         ),
    //     );

    //     callback();
    // }

    createDialogue(textArray) {
        this.dialogue = this.entityManager.addEntity(
            new Dialogue(this.handler, textArray, true),
        );
    }

    initDialogue() {
        // this.dialogue = this.entityManager.addEntity(
        //     new Dialogue(
        //         this.handler,
        //         [
        //             'Hey, newbie!',
        //             'Looks like the manager is out sick today...',
        //             'I bet you can figure this one out on your own, though.',
        //             'Boot up that computer and check your email!',
        //         ],
        //     ),
        // );
    }

    gameWon() {
        // this.dialogue = this.entityManager.addEntity(
        //     new Dialogue(
        //         this.handler,
        //         [
        //             'Yo, newbie! You did it!',
        //             'Looks like the incidents were resolved!',
        //             'Great Job!',
        //             'Also, we need you in on Saturday...',
        //             'And that piano hammer comes out of your check...',
        //         ],
        //     ),
        // );

        this.state = this.STATES.GAME_WON;
    }

    dialogueFinished() {
        switch (this.state) {
            case this.STATES.INITIALIZE:
            case this.STATES.IDLE:

                break;

            case this.STATES.INTRO:
                // this.entityManager.addEntity(new WallPaperTear(this.handler, 832, 120)),

                // this.handler.getSoundManager().play('bgm');

                this.state = this.STATES.IDLE;
                break;

            case this.STATES.GAME_WON:
                this.state = this.STATES.IDLE;

                break;

            default:
                throw new Error(`World One dialogue finished state "${this.state} is not accounted for`)
        }
    }

    tryAddEnemyToSelected(enemy) {
        if (this.selectedEnemies.length === 0) {
            this.addSelectedEnemy(enemy);
            const actionButton = this.findActionButton();
            
            actionButton.setAction(GameConstants.ACTIONS.ATTACK);
        
            // if attacking champ can kill all of the type of enemy added, check for more and select them automatically
            if (!this.attackingChamp.canKillAllOfSubType(enemy.subType)) {
                return;
            }

            this.enemyParty.getParty().forEach(member => {
                if (member.subType === enemy.subType && member.id !== enemy.id) {
                    this.addSelectedEnemy(member);
                }
            });

            return;
        }

        const firstEnemy = this.selectedEnemies[0];

        // never allowed to have different types of enemies selected to attack at once.
        const tryingToAddSameEnemySubType = firstEnemy.subType === enemy.subType;

        if (!tryingToAddSameEnemySubType) {
            alert("You can only attack one type of enemy at a time.");
            return;
        }

        // assuming we only are letting in all monsters of same type
        const canKillAll = this.attackingChamp.canKillAllOfSubType(firstEnemy.subType);

        if (!canKillAll) {
            alert(`${this.attackingChamp.getDisplayName()} can only kill one ${firstEnemy.subType} at a time.`);
            return;
        }

        this.addSelectedEnemy(enemy);
    }

    setAttackingChamp(champ) {
        // if (this.attackingChamp) {
        //     this.attackingChamp.selected = false;
        // }

        champ.selected = true;
        champ.attacking = true;
        this.attackingChamp = champ;

        this.state = this.STATES.CHOOSE_MONSTER_TO_ATTACK;
    }

    findActionButton = () => this.entityManager.findEntityByType(GameConstants.TYPES.ACTION_BUTTON)[0];

    loadEntities() {
        this.entityManager.addEntity(new ActionButton(this.handler));
        this.entityManager.addEntity(new SkipPhaseButton(this.handler));
        // this.player.getParty().forEach(entity => {
        //     this.entityManager.addEntity(entity);
        // });
    }

    rollEnemy(index, champBeingReplaced) {
        const blackBanners = Object.keys(GameConstants.BLACK_BANNERS).map(x => GameConstants.BLACK_BANNERS[x]);

        const entityName = rndIndex(blackBanners);
        let entity;
        
        switch (entityName) {
            case GameConstants.BLACK_BANNERS.DRAGON:
                entity = new Dragon(this.handler); 
                break;
            
            case GameConstants.BLACK_BANNERS.GOBLIN:
                entity = new Goblin(this.handler);
                break;

            case GameConstants.BLACK_BANNERS.SKELETON:
                entity = new Skeleton(this.handler);
                break;

            case GameConstants.BLACK_BANNERS.SLIME:
                entity = new Slime(this.handler);
                break;

            case GameConstants.BLACK_BANNERS.POTION:
                entity = new Potion(this.handler);
                break;

            case GameConstants.BLACK_BANNERS.TREASURE_CHEST:
                entity = new TreasureChest(this.handler);
                break;

            default:
                throw new Error(`Default case hit for BLACK_BANNERS entity switch. Value: ${entityName}`);
        }

        entity.index = index;
        entity.dontRender = true;

        // if (champBeingReplaced) {
        //     entity.id = champBeingReplaced.id;
        // }

        return entity;
    }

    rollEnemies() {
        this.enemyParty.clearParty();
    
        // TODO: Put back to this.level after testing full hand size or enemy
        // for (let i = 0; i < this.level; i++) {
        for (let i = 0; i < 7; i++) {
            const entity = this.rollEnemy(i);

            this.entityManager.addEntity(entity);
            
            if (entity.subType === GameConstants.BLACK_BANNERS.DRAGON) {
                this.enemyParty.addToDragonsLair(entity);
            } else {
                this.enemyParty.addToParty(entity);
            }
        }

        this.enemyParty.setPartyIndexes();
        this.enemyParty.setAllPartyMembersPositions();
    }

    tick(deltaTime) {
        switch (this.state) {
            case this.STATES.TEST_INIT:
                // this.entityManager.addEntity(new MeMyselfAndI(this.handler));
                // this.state = this.states.IDLE;
                break;

            case this.STATES.TEST:
                break;


            case this.STATES.INITIALIZE:
                // this.initDialogue();
                this.init();
                this.state = this.STATES.ROLL_ENEMIES;
                break;

            case this.STATES.ROLL_ENEMIES:
                this.rollEnemies();
                this.clearSelectedEntities();
                this.state = this.STATES.USE_SCROLLS;
                break;

            case this.STATES.USE_SCROLLS:
                if (!this.player.hasScrollInParty()) {
                    this.clearSelectedEntities();
                    this.state = this.STATES.USE_HERO_POWER;
                }

                if (this.selectedRerollScroll) {
                    const actionButton = this.findActionButton();
                    
                    if (!actionButton) {
                        throw new Error("Action Button type not found!");
                    }

                    actionButton.setAction(GameConstants.ACTIONS.REROLL);
                    this.state = this.STATES.CHOOSE_BANNERS_TO_REROLL;
                }
                break;
            
            case this.STATES.USE_HERO_POWER:
                // implement this state later, for now move on to fight monsters
                this.state = this.STATES.CHOOSE_ATTACKING_CHAMP
                break;

            case this.STATES.CHOOSE_ATTACKING_CHAMP:
                if (this.selectedBanner) {
                    this.state = this.STATES.CHOOSE_MONSTER_TO_ATTACK;
                }
                break;

            case this.STATES.DRAGON_ATTACKS:
            case this.STATES.CHOOSE_BANNERS_TO_REROLL:
            case this.STATES.CHOOSE_MONSTER_TO_ATTACK:
            case this.STATES.GAME_WON:
            case this.STATES.INTRO:
            case this.STATES.IDLE:
                break;

            default:
                throw new Error(`World One animation state "${this.state} is not accounted for`)
        }

        this.entityManager.tick(deltaTime);
    }

    render(graphics) {
        const centerX = (GameConstants.GAME_WIDTH / 2);
        const centerY = (GameConstants.GAME_HEIGHT / 2);

        // switch (this.state) {
        //     case this.STATES.TEST_INIT:
        //         break;

        //     case this.STATES.INITIALIZE:
        //         break;

        //     case this.STATES.CHOOSE_BANNERS_TO_REROLL:
        //     case this.STATES.USE_SCROLLS:
        //     case this.STATES.CHOOSE_ATTACKING_CHAMP:
        //     case this.STATES.USE_HERO_POWER:
        //     case this.STATES.ROLL_ENEMIES:
        //     case this.STATES.GAME_WON:
        //     case this.STATES.CHOOSE_MONSTER_TO_ATTACK:
        //     case this.STATES.INTRO:
        //     case this.STATES.TEST:
        //     case this.STATES.IDLE:
        //         break;

        //     default:
        //         throw new Error(`World One state "${this.state} is not accounted for`)
        // }

        this.player.render(graphics);
        this.enemyParty.render(graphics);

        // Debug purposes
        graphics.drawText(`State: ${this.state}`, centerX - 240 , centerY + 32 + 16 + 8, GameConstants.COLORS.RED, false, GameConstants.BIG_FONT_SIZE);

        graphics.drawText(`Level: ${this.level}`, centerX - 112 , centerY + 16, GameConstants.COLORS.RED, true, GameConstants.MASSIVE_FONT_SIZE);

        this.entityManager.render(graphics);

        this.drawStateText(graphics);
    }

    actionTaken(actionName) {
        switch(actionName) {
            case GameConstants.ACTIONS.REROLL:
                if (this.state !== this.STATES.CHOOSE_BANNERS_TO_REROLL) {
                    throw new Error(`REROLL Action taken when state was not choose_banners_to_reroll. State: ${this.state}`)
                }

                if (!this.selectedChamps.length && !this.selectedEnemies.length) {
                    alert("Please select banners in Enemy or Player Party to reroll.")
                    return;
                }

                console.log('entities before', this.entityManager.entities.map(x => x.getDisplayName ? x.getDisplayName() : x));

                console.log('enemy party before');
                this.enemyParty.getParty().forEach(item => { console.log(item.index, item.id, item.getDisplayName())});
                console.log("----");
                const rerolledChamps = this.rerollSelectedEntities(this.selectedChamps);
                this.player.replaceRerolledChampsInParty(rerolledChamps);

                const rerolledEnemies = this.rerollSelectedEntities(this.selectedEnemies);
                console.log('rerolled enemies');
                rerolledEnemies.forEach(item => { console.log(item.index, item.id, item.getDisplayName())});
                console.log("---");
                this.enemyParty.replaceRerolledEnemiesInParty(rerolledEnemies);

                console.log('enemy party after');
                this.enemyParty.getParty().forEach(item => { console.log(item.index, item.id, item.getDisplayName())});

                if (this.selectedRerollScroll) {
                    this.selectedRerollScroll.selected = false;
                }

                console.log('entities after', this.entityManager.entities.map(x => x.getDisplayName ? x.getDisplayName() : x));
                
                this.clearSelectedEntities();
                this.clearActionButtonAction();
                
                this.state = this.STATES.USE_HERO_POWER;
                break;

            case GameConstants.ACTIONS.ATTACK:
                if (!this.attackingChamp) {
                    throw new Error("actionTaken() No attackingChamp!");
                }

                if (this.selectedEnemies.length === 0) {
                    throw new Error("actionTaken() No selectedEnemies!");
                }

                this.player.sendToGraveyard(this.attackingChamp);
                this.attackingChamp.selected = false;
                this.attackingChamp.attacking = false;
                this.attackingChamp = null;
                
                this.enemyParty.removeAttackedMonsters(this.selectedEnemies);
                this.selectedEnemies = [];

                this.checkForVictoryOrDefeat();
                break;

            default:
                throw new Error(`actionTaken() action not recognized ${actionName}`);
        }
    }

    checkForVictoryOrDefeat() {
        if (this.enemyParty.length === 0) {
            alert("You won!");
            this.state === this.STATES.GAME_WON;
            return;
        }

        this.state = this.STATES.CHOOSE_ATTACKING_CHAMP;
    }

    rerollSelectedEntities(entities) {
        return entities.map((entity, index) => {
            let rerolled;
            if (entity.selected) {
                switch (entity.type) {
                    case GameConstants.TYPES.CHAMP:
                    case GameConstants.TYPES.WHITE_ITEM:
                        rerolled = this.rollChamp(index, entity);
                        this.entityManager.addEntity(rerolled);
                        rerolled.id = entity.id;
                        return rerolled;

                    case GameConstants.TYPES.ENEMY:
                    case GameConstants.TYPES.BLACK_ITEM:
                        rerolled = this.rollEnemy(index, entity);
                        this.entityManager.addEntity(rerolled);
                        rerolled.id = entity.id;
                        return rerolled;
                
                    default:
                        console.log(entity);
                        throw new Error(`Unexpected entity.type in world.rerollSelectedEntities => ${entity.type}`)
                }
            }

            return entity;
        })
    }

    addSelectedChamp(entity) {
        entity.selected = true;
        
        this.selectedChamps.push(entity);
    }

    removeSelectedChamp(entity) {
        entity.selected = false;
        
        this.selectedChamps = this.selectedChamps.filter(e => e.id != entity.id);
    }

    addSelectedEnemy(entity) {
        entity.selected = true;
        
        this.selectedEnemies.push(entity);
    }

    removeSelectedEnemy(entity) {
        entity.selected = false;
        
        this.selectedEnemies = this.selectedEnemies.filter(e => e.id != entity.id);
    }

    drawStateText(graphics) {
        let text = "";
        let text2 = "";
        let text3 = "";

        switch (this.state) {
            case this.STATES.TEST_INIT:
                break;

            case this.STATES.INITIALIZE:
                text = "Initializing..."
                break;

            case this.STATES.ROLL_ENEMIES:
                text = "Creating Enemy Party";
                break;

            case this.STATES.CHOOSE_ATTACKING_CHAMP:
                text = "Click one of your banners to attack the enemy party.";
                text2 = "Hammer kills all Skeletons. Swords all Goblins. Mage hat all slimes."
                text3 = "Champion helm can kill all of one kind. Any banner can kill 1 of any kind."
                break;

            case this.STATES.CHOOSE_MONSTER_TO_ATTACK:
                text = "Now choose a monster in Enemy Party to attack.";
                break;

            case this.STATES.GAME_WON:
                text = "Game Won";
                break;

            case this.STATES.USE_HERO_POWER:
                text = "Click your Hero to use their power.";
                text2 = "Or click \"Skip Phase\" to move on.";
                break;

            case this.STATES.USE_SCROLLS:
                text = "Click a scroll to use it to reroll any number of party and enemy members.";
                text2 = "Or click \"Skip Phase\" to move on.";
                break;

            case this.STATES.CHOOSE_BANNERS_TO_REROLL:
                text = "Choose any number of Enemy Party and Player Party banners to reroll.";
                text2 = "Then click \"Reroll\" or click \"Skip Phase\" to cancel.";
                break;

            case this.STATES.DRAGON_ATTACKS:
                text = "Oh no! You have rolled 3 dragons, so the Dragon attacks!";
                text2 = "You must use 2 different types of companions to defeat the Dragon!";
                break;


            default:
                text = "Welcome to Dungeon Roller!";
        }

        graphics.drawText(`Phase: ${text}`, 96, GameConstants.GAME_HEIGHT - 112, GameConstants.COLORS.BLACK, true, GameConstants.FONT_SIZE);

        if (text2) {
            graphics.drawText(text2, 96, GameConstants.GAME_HEIGHT - 112 + 32, GameConstants.COLORS.BLACK, true, GameConstants.FONT_SIZE);
        }

        if (text3) {
            graphics.drawText(text3, 96, GameConstants.GAME_HEIGHT - 112 + 64, GameConstants.COLORS.BLACK, true, GameConstants.FONT_SIZE);
        }
    }

    clearActionButtonAction() {
        const actionButton = this.entityManager.findEntityByType(GameConstants.TYPES.ACTION_BUTTON)[0];
            
        if (!actionButton) {
            throw new Error("Action Button type not found!");
        }

        actionButton.clearAction();
    }

    skipPhaseClicked() {
        switch (this.state) {
            case this.STATES.CHOOSE_BANNERS_TO_REROLL:
            case this.STATES.USE_SCROLLS:
                if (this.selectedRerollScroll) {
                    this.selectedRerollScroll.selected = false;
                }
                
                this.clearSelectedEntities();
                this.clearActionButtonAction();

                this.state = this.STATES.USE_HERO_POWER;
                break;

            case this.STATES.USE_HERO_POWER:
                this.state = this.STATES.CHOOSE_ATTACKING_CHAMP;
                break;
        
            default:
                throw new Error(`no case for skipPhaseClicked() in state: ${this.state}`)
        }
    }

    init() {
        this.level = 1;
        
        const locationsY = 192;
        const dragonsLair = new DragonsLair(this.handler, 32, locationsY, GameConstants.GAME_WIDTH / 4, GameConstants.GAME_HEIGHT / 4 );
        this.enemyParty.setDragonsLair(dragonsLair);
        this.entityManager.addEntity(dragonsLair);
        
        const graveYardWidth = GameConstants.GAME_WIDTH / 4 + 12;
        const graveYard = new GraveYard(this.handler, GameConstants.GAME_WIDTH - graveYardWidth - 32, locationsY, graveYardWidth, GameConstants.GAME_HEIGHT / 4 );
        this.player.setGraveYard(graveYard);
        this.entityManager.addEntity(graveYard);
        
        this.rollPlayerParty();
        this.loadEntities();

        // TESTING CODE REMOVE
        // this.player.getParty().forEach(member => {
        //     this.player.sendToGraveyard(member);
        // })
    }

    rollChamp(index, champBeingReplaced = null) {
        const whiteBanners = Object.keys(GameConstants.WHITE_BANNERS).map(x => GameConstants.WHITE_BANNERS[x]);
        
        const entityName = rndIndex(whiteBanners);
            let entity;
            
            switch (entityName) {
                case GameConstants.WHITE_BANNERS.CHAMPION:
                    entity = new Champion(this.handler); 
                    break;
                
                case GameConstants.WHITE_BANNERS.FIGHTER:
                    entity = new Fighter(this.handler);
                    break;

                case GameConstants.WHITE_BANNERS.PALADIN:
                    entity = new Paladin(this.handler);
                    break;

                case GameConstants.WHITE_BANNERS.THIEF:
                    entity = new Thief(this.handler);
                    break;

                case GameConstants.WHITE_BANNERS.WIZARD:
                    entity = new Wizard(this.handler);
                    break;

                case GameConstants.WHITE_BANNERS.SCROLL:
                    entity = new Scroll(this.handler);
                    break;

                default:
                    throw new Error(`Default case hit for WHITE_BANNERS entity switch. Value: ${entityName}`);
            }

            entity.index = index;
            entity.dontRender = true;

            // if (champBeingReplaced) {
            //     entity.id = champBeingReplaced.id;
            // }

            return entity;
    }

    rollPlayerParty() {
        this.player.clearParty();
    
        for (let i = 0; i < 7; i++) {
            const entity = this.rollChamp(i);

            this.player.addToParty(entity);
            this.entityManager.addEntity(entity);
        }

    }

    // drawBackground(graphics) {
    //     const bg = this.assets.background;

    //     graphics.drawSprite(bg)
    // }


    getSpatialGrid() {
        return this.spatialGrid;
    }
}