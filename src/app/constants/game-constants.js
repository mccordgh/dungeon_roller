///////////////////////
//////////////////////
//////The Coding Geek//
/////////////////////

let basePath = window.location.href;

if (process.env.NODE_ENV === 'production') {
    basePath = basePath.replace(/index.html/, '');
}

export const GameConstants = {
    BIG_FONT_SIZE: 32,
    FONT_SIZE: 24,
    MASSIVE_FONT_SIZE: 64,
   
    COLORS: {
        GREY: "#888888",
        BLACK: "#333333",
        PURPLE: "#7B538F",
        LIGHT_PURPLE: "#BD7FDB",
        DARK_PURPLE: "#4F355C",
        CREAM: "#FCEDC3",
        RED: "#FF2F4C",
        LIGHT_RED: "#FF7A8C",
        DARK_RED: "#803D46",
    },

    FPS: 60,

    // DIALOGUE: {
    //     X: 64,
    //     Y: 448,
    //     WIDTH: 896,
    //     HEIGHT: 256 / 1.5,
    // },

    GAME_WIDTH: 1024,
    GAME_HEIGHT: 768,

    // TILE_HEIGHT: 64,
    // TILE_WIDTH: 64,

    SPATIAL_GRID_SIZE: 64,

    TYPES: {
        HERO: "hero",
        ENEMY: "enemy",
        BLACK_ITEM: "black-item",
        WHITE_ITEM: "white-item",
        STATIC_BUTTON: "static-button",
        ACTION_BUTTON: "action-button",
    },

    WHITE_BANNERS: {
        CHAMPION: "champion",
        FIGHTER: "fighter",
        PALADIN: "paladin",
        THIEF: "thief",
        WIZARD: "wizard",
        SCROLL: "scroll",
    },

    BLACK_BANNERS: {
        DRAGON: "dragon",
        GOBLIN: "goblin",
        SKELETON: "skeleton",
        SLIME: "slime",
        POTION: "potion",
        TREASURE_CHEST: "treasure-chest",
    },

    BASE_PATH: basePath,
    ASSETS_PATH: `${basePath}src/resources`,
    MUSIC_PATH: `${basePath}src/music`
};
