export const CoreConstants = {
    layout_config_url: `/layout-{platform}.json`,
    resources_config_url: `/resources.json`,
    size_report_url: `/size-report.json`,
    general_config_url: "/config.json",

    styles: {
        game: {
            canvas: {
                position: "absolute",
                top: '0px',
                left: '0px',
            }
        }
    },

    // canvasStyle: {
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     height: '100%',
    //     background: "#bde6eb"
    // },

    // canvasStyleReplay: {
    //     position: "absolute",
    //     bottom: 0,
    //     left: '15%',
    //     height: '70%',
    //     width: '70%',
    //     background: "#bde6eb"
    // },

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

    scrollerSettings: {
        offsetForInaccurateTouchScreens: 10
    },

    urlParameters: {
        dpi: "dpi",
        debug: "debug"
    },

    gameScreenArea: {
        minRatio: 1.33,
        ratio: 2 //  1440/720
    },

    scenes: {
        gameScene: "gameView"
    }
};
