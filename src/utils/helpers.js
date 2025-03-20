import { defaultConfig } from "@/config/default";

// Calculate Application positions
const calculate_application_positions = (positions, idx, width, height) => {
    if (positions) {
        const x = (width * positions.x) / 100;
        const y = (height * positions.y) / 100;

        console.log("From calc 1: ", { x, y });
        return { x, y };
    } else {
        const remInPx = parseFloat(
            getComputedStyle(document.documentElement).fontSize
        );
        const itemsPerColumn = Math.floor(
            height / (defaultConfig.application.desktopIcon.heightRem * remInPx)
        );
        const column = Math.floor(idx / itemsPerColumn);
        const row = idx % itemsPerColumn;

        const x =
            column * (defaultConfig.application.desktopIcon.widthRem * remInPx);
        const y =
            row * (defaultConfig.application.desktopIcon.heightRem * remInPx);

        console.log("From calc 2: ", { x, y });

        return { x, y };
    }
};

// Focus on Window
let lastOpenedWindowElement = null;
const focus_on_window = (elm) => {
    if (lastOpenedWindowElement) {
        lastOpenedWindowElement.style.zIndex =
            defaultConfig.application.window.zRegular;
    }

    lastOpenedWindowElement = elm;
    elm.style.zIndex = defaultConfig.application.window.zFocus;
};

export { calculate_application_positions, focus_on_window };
