export const CoreEvents = {
    APPLICATION_STARTED: "APPLICATION_STARTED",
    CONFIG_LOADED: "CONFIG_LOADED",
    RESIZE: "RESIZE",
    ON_RENDER: "ON_RENDER",
    REQUEST_CHANGE_FULL_SCREEN: "REQUEST_CHANGE_FULL_SCREEN",
    FULL_SCREEN_CHANGED: "FULL_SCREEN_CHANGED",
    ADD_SCENE: "ADD_SCENE",
    REMOVE_SCENE: "REMOVE_SCENE",
    GAME_META_LOADED: "GAME_META_LOADED",
    INTRO_SCENE_CLOSE: "INTRO_SCENE_CLOSE",
    LOAD_SCENE_CLOSE: "LOAD_SCENE_CLOSE",
    INIT_SCENE_DATA: "INIT_SCENE_DATA",
    SCENE_LOADED: "SCENE_LOADED",

    // Asset loading
    PRELOAD_ASSETS_START_LOADING: "PRELOAD_ASSETS_START_LOADING",
    PRELOAD_ASSETS_LOADED: "PRELOAD_ASSETS_LOADED",
    INITIAL_ASSETS_START_LOADING: "INITIAL_ASSETS_START_LOADING",
    INITIAL_ASSETS_PROGRESS: "INITIAL_ASSETS_PROGRESS",
    INITIAL_ASSETS_LOADED: "INITIAL_ASSETS_LOADED",
    LAZY_ASSETS_START_LOADING: "LAZY_ASSETS_START_LOADING",
    LAZY_ASSETS_LOADED: "LAZY_ASSETS_LOADED",
    ASSET_LOADED: "ASSET_LOADED",

    //sound
    SOUND_ACTION: "SOUND_ACTION",

    //game
    SPIN_CLICK: 'spinClick',
    CLICK: 'click',
    ENABLE_DEBUG: 'ENABLE_DEBUG',
    DISABLE_DEBUG: 'DISABLE_DEBUG',
    SPIN_CONFIG_DEBUG_CLICK: 'SPIN_CONFIG_DEBUG_CLICK',
    SHOW_DEBUGMODE: 'SHOW_DEBUGMODE',
    HIDE_DEBUGMODE: 'HIDE_DEBUGMODE',
    LOAD_CHEATCOMBINATIONS: 'LOAD_CHEATCOMBINATIONS',
    EXECUTE_CHEAT: 'EXECUTE_CHEAT',

    SHOW_SCREEN_OVERLAY: 'SHOW_SCREEN_OVERLAY',
    HIDE_SCREEN_OVERLAY: 'HIDE_SCREEN_OVERLAY',

    //SERVER
    SERVER_REQUEST: "SERVER_REQUEST",
    SERVER_ERROR: "SERVER_ERROR",
    LOST_CONNECTION: "LOST_CONNECTION",

    //StateMachineService
    FSM_EVENT: "FSM_EVENT",

    //UI
    BALANCE_UPDATE: 'BALANCE_UPDATE',
    WIN_INFO_UPDATE: 'WIN_INFO_UPDATE',
    TOTAL_BET_UPDATE: 'TOTAL_BET_UPDATE',
    ON_TOTAL_BET_CLICK: 'ON_TOTAL_BET_CLICK',
    COIN_PANEL_STATE_CHANGE: 'COIN_PANEL_STATE_CHANGE',
    COIN_PANEL_CLOSE: 'COIN_PANEL_CLOSE',
    ON_CURRENCY_STATE_CHANGED: "ON_CURRENCY_STATE_CHANGED",

    SPIN_RESPONSE_COMPLETE: 'spinResponseConmplete',

    // Interaction events
    ON_SPACE_KEY_PRESS: 'ON_SPACE_KEY_PRESS',
    ON_TOUCH_ANY_WHERE: 'ON_TOUCH_ANY_WHERE',

    LOSE_GAME_FOCUS: "LOSE_GAME_FOCUS",
    RECOVER_GAME_FOCUS: "RECOVER_GAME_FOCUS"
};