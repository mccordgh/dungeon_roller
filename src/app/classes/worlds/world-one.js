
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
            FIGHT_MONSTERS: "fight-monsters",
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

    loadEntities() {
        this.entityManager.addEntity(new SkipPhaseButton(this.handler));
        // this.player.getParty().forEach(entity => {
        //     this.entityManager.addEntity(entity);
        // });
    }

    rollEnemies() {
        const blackBanners = Object.keys(GameConstants.BLACK_BANNERS).map(x => GameConstants.BLACK_BANNERS[x]);
    
        this.enemyParty.clearParty();
    
        for (let i = 0; i < this.level; i++) {
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

            entity.id = i;
            this.enemyParty.addToParty(entity);
        }
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
                // this.state = this.STATES.INTRO;
                break;

            case this.STATES.ROLL_ENEMIES:
                this.rollEnemies();
                this.state = this.STATES.USE_SCROLLS;
                break;

            case this.STATES.USE_SCROLLS:
            case this.STATES.FIGHT_MONSTERS:
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

        switch (this.state) {
            case this.STATES.TEST_INIT:
                break;

            case this.STATES.INITIALIZE:
                break;

            case this.STATES.USE_SCROLLS:
            case this.STATES.FIGHT_MONSTERS:
            case this.STATES.ROLL_ENEMIES:
            case this.STATES.GAME_WON:
            case this.STATES.INTRO:
            case this.STATES.TEST:
            case this.STATES.IDLE:
                break;

            default:
                throw new Error(`World One state "${this.state} is not accounted for`)
        }

        this.player.render(graphics);
        this.enemyParty.render(graphics);

        graphics.drawText(`Level: ${this.level}`, centerX - 112 , centerY + 16, GameConstants.COLORS.RED, true, GameConstants.MASSIVE_FONT_SIZE);

        this.entityManager.render(graphics);

        this.drawStateText(graphics);
    }

    drawStateText(graphics) {
        let text = "placeholder";

        switch (this.state) {
            case this.STATES.TEST_INIT:
                break;

            case this.STATES.INITIALIZE:
                text = "Initializing..."
                break;

            case this.STATES.ROLL_ENEMIES:
                text = "Creating Enemy Party";
                break;

            case this.STATES.FIGHT_MONSTERS:
                text = "Fight Monsters";
                break;

            case this.STATES.GAME_WON:
                text = "Game Won";
                break;

                case this.STATES.USE_SCROLLS:
                text = "Click a scroll to use it to reroll any number of party and enemy members";
            // case this.STATES.INTRO:
            // case this.STATES.TEST:
            // case this.STATES.IDLE:
                break;

            // default:
            //     throw new Error(`World One state "${this.state} is not accounted for`)
        }

        graphics.drawText(`Phase: ${text}`, 96, GameConstants.GAME_HEIGHT - 112, GameConstants.COLORS.BLACK, true, GameConstants.FONT_SIZE);
    }

    init() {
        this.level = 1;
        
        const locationsY = 192;
        this.entityManager.addEntity(new DragonsLair(this.handler, 32, locationsY, GameConstants.GAME_WIDTH / 4, GameConstants.GAME_HEIGHT / 4 ));
        
        const graveYardWidth = GameConstants.GAME_WIDTH / 4;
        this.entityManager.addEntity(new GraveYard(this.handler, GameConstants.GAME_WIDTH - graveYardWidth - 32, locationsY, graveYardWidth, GameConstants.GAME_HEIGHT / 4 ));
        
        this.rollPlayerParty();
        this.loadEntities();
    }

    rollPlayerParty() {
        const whiteBanners = Object.keys(GameConstants.WHITE_BANNERS).map(x => GameConstants.WHITE_BANNERS[x]);
    
        this.player.clearParty();
    
        for (let i = 0; i < 7; i++) {
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

            entity.id = i;
            this.player.addToParty(entity);
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