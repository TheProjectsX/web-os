// Load Application Data
import demo_application, { demo_metadata } from "@/applications/demo";

export const defaultConfig = {
    screen: {
        minWidth: 900,
        minHeight: 600,
        minAspectRatio: 1.3,
    },
    wallpaper: "https://i.ibb.co.com/qYKkpxCr/yaqGvs.jpg",
    taskbar: {
        position: "center",
    },
    application: {
        desktopIcon: {
            widthRem: 4.5,
            heightRem: 7,
        },
        taskbarIcon: {},
        window: {
            widthPercentage: 65,
            heightPercentage: 65,
            zFocus: 999,
            zRegular: 800,
        },
        list: [
            { application: demo_application, metadata: demo_metadata },
            { application: demo_application, metadata: demo_metadata },
            { application: demo_application, metadata: demo_metadata },
        ],
    },
};
