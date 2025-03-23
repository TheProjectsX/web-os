// Load Application Data
export const defaultConfig = {
    screen: {
        minWidth: 900,
        minHeight: 600,
        minAspectRatio: 1.3,
    },
    wallpaper: "https://i.ibb.co.com/qYKkpxCr/yaqGvs.jpg",
    taskbar: {
        position: "center",
        zIndex: 600,
        heightPX: 53.2,
        visibilityStatus: "regular",
    },
    application: {
        desktopIcon: {
            widthRem: 4.5,
            heightRem: 7,
        },
        taskbarIcon: {
            widthRem: 2.2,
            heightRem: 2.2,
        },
        window: {
            widthPercentage: 65,
            heightPercentage: 65,
            zFocus: 550,
            zRegular: 500,
            zMaximize: 650,
        },
    },
    localStorage: {
        keys: {
            customFiles: "user_custom_files",
            customSettings: "user_custom_settings",
        },
    },
};
