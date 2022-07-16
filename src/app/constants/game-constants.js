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
    FONT_SIZE: 18,
    EMAIL_ITEM_SIZE: 16,
    APP_NAME_SIZE: 16,

    APPS: {
        CODE_MAN:'Code Man',
        FOOTAGE: 'Footage',
        EMAIL: 'Email',
        SETTINGS: 'Settings',
        THE_CORE: 'The Core',
        ME_MYSELF_I: 'Me, Myself, & I',
        THE_CODERS_GAME: 'Coder\'s Game',
    },

    COLORS: {
        PURPLE: "#7B538F",
        LIGHT_PURPLE: "#BD7FDB",
        DARK_PURPLE: "#4F355C",
        CREAM: "#FCEDC3",
        RED: "#FF2F4C",
        LIGHT_RED: "#FF7A8C",
        DARK_RED: "#803D46",
    },

    FPS: 60,

    DIALOGUE: {
        X: 64,
        Y: 448,
        WIDTH: 896,
        HEIGHT: 256 / 1.5,
    },

    TELEBUTTON_WIDTH: 35,
    TELEBUTTON_HEIGHT: 28,

    SCREEN_WIDTH: 512,
    SCREEN_HEIGHT: 384,

    GAME_WIDTH: 1024,
    GAME_HEIGHT: 768,

    ICON_HEIGHT: 64,
    ICON_WIDTH: 64,

    SPATIAL_GRID_SIZE: 64,

    RADIO_WIDTH: 133,
    RADIO_HEIGHT: 74,

    TYPES: {
        HERO: "hero",
        ENEMY: "enemy",
        ITEM: "item",
        INTERACTIVE: 'interactive',
    },

    FINGER_WIDTH: 16,

    // rndIndex: (arr) => arr[Math.floor(Math.random() * (arr.length))],

    BASE_PATH: basePath,
    ASSETS_PATH: `${basePath}src/resources`,
    MUSIC_PATH: `${basePath}src/music`
};
