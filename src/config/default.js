// Load Application Data
import chrome_application, { chrome_metadata } from "@/applications/chrome";
import demo_application, { demo_metadata } from "@/applications/demo";
import notepad_application, { notepad_metadata } from "@/applications/notepad";

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
        apps: [demo_metadata],
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
        list: [
            { application: demo_application, metadata: demo_metadata },
            { application: chrome_application, metadata: chrome_metadata },
            { application: notepad_application, metadata: notepad_metadata },
        ],
    },
    localStorage: {
        keys: {
            customFiles: "user_custom_files",
        },
    },
};
