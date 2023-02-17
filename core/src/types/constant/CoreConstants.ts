export const CoreConstants = {
    layout_config_url: `/layout-{platform}.json`,
    resources_config_url: `/resources.json`,
    size_report_url: `/size-report.json`,
    general_config_url: "/config.json",

    deviceType: {
        DESKTOP: false,
        MOBILE: false,
        IOS: false,
        isSafari: false,
        isIpad: false
    },

    dpi: {
        xhdpi: {
            type: "1080",
            screenDefinition: 720,
            multiply: 1
        },
        hdpi: {
            type: "720",
            screenDefinition: 540,
            multiply: 0.6666
        },
        mdpi: {
            type: "540",
            screenDefinition: 320,
            multiply: 0.5
        },
        ldpi: {
            type: "mini",
            screenDefinition: 0,
            multiply: 0.3
        },
    },

    urlParameters: {
        dpi: "dpi",
        debug: "debug"
    },

    scenes: {
        gameScene: "gameView"
    }
};
