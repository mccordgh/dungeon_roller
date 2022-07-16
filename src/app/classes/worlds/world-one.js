
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

        this.states = {
            INITIALIZE: 'initialize',
            INTRO: 'intro',
            IDLE: 'idle',
            TEST: 'test',
            TEST_INIT: 'test-init',
            GAME_WON: 'game-won',
        };

        // this.state = this.states.IDLE;
        this.state = this.states.INITIALIZE;
        // this.state = this.states.TEST_INIT;
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

        this.state = this.states.GAME_WON;
    }

    dialogueFinished() {
        switch (this.state) {
            case this.states.INITIALIZE:
            case this.states.IDLE:

                break;

            case this.states.INTRO:
                // this.entityManager.addEntity(new WallPaperTear(this.handler, 832, 120)),

                // this.handler.getSoundManager().play('bgm');

                this.state = this.states.IDLE;
                break;

            case this.states.GAME_WON:
                this.handler.getEmailManager().addEmail('easterEggs');
                this.handler.getEmailManager().addEmail('third');
                this.state = this.states.IDLE;

                break;

            default:
                throw new Error(`World One dialogue finished state "${this.state} is not accounted for`)
        }
    }

    loadEntities() {
        const entities = [
            new Champion(this.handler, 0, 0),
            new Fighter(this.handler, 32, 0),
            new Paladin(this.handler, 64, 0),
            new Thief(this.handler, 96, 0),
            new Wizard(this.handler, 128, 0),

            new Dragon(this.handler, 96, 32),
            new Goblin(this.handler, 0, 32),
            new Skeleton(this.handler, 32, 32),
            new Slime(this.handler, 64, 32),

            new Potion(this.handler, 0, 64),
            new Scroll(this.handler, 32, 64),
            new TreasureChest(this.handler, 64, 64),
            // new ComputerScreen(this.handler, 256, 136),
            // new Radio(this.handler, 52, 62),
            // new Telephone(this.handler, 0, 480),
        ];

        entities.forEach(entity => {
            this.entityManager.addEntity(entity);
        });
    }

    tick(deltaTime) {
        switch (this.state) {
            case this.states.TEST_INIT:
                // this.entityManager.addEntity(new MeMyselfAndI(this.handler));
                // this.state = this.states.IDLE;
                break;

            case this.states.TEST:
                break;


            case this.states.INITIALIZE:
                this.initDialogue();

                this.state = this.states.INTRO;
                break;

            case this.states.GAME_WON:
            case this.states.INTRO:
            case this.states.IDLE:
                break;

            default:
                throw new Error(`World One animation state "${this.state} is not accounted for`)
        }

        this.entityManager.tick(deltaTime);
    }

    render(graphics) {
        // this.drawBackground(graphics);

        switch (this.state) {
            case this.states.TEST_INIT:
            case this.states.INITIALIZE:
            case this.states.GAME_WON:
            case this.states.INTRO:
            case this.states.TEST:
            case this.states.IDLE:
                break;

            default:
                throw new Error(`World One state "${this.state} is not accounted for`)
        }

        this.entityManager.render(graphics);
    }

    init() {
        this.loadEntities();
    }

    // drawBackground(graphics) {
    //     const bg = this.assets.background;

    //     graphics.drawSprite(bg)
    // }


    getSpatialGrid() {
        return this.spatialGrid;
    }
}