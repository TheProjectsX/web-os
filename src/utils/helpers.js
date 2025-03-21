import { defaultConfig } from "@/config/default";

// Calculate Application positions
const calculate_application_positions = (positions, idx, width, height) => {
    if (positions) {
        const x = (width * positions.x) / 100;
        const y = (height * positions.y) / 100;

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

const get_unique_number = (digits = 5) => {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return Math.floor(min + (performance.now() % (max - min)));
};

// Below function takes List of Objects (openedApplications) and a status, pid and application code. If status "closed", remove the process (pid) else, change it to whatever status there is
const construct_application_status = (applications, status, pid, code) => {
    if (status === "close") {
        return applications.filter(
            (item) => !(item.pid === pid && item.code === code)
        );
    } else {
        return applications.map((item) => {
            if (item.pid === pid && item.code == code) {
                return {
                    ...item,
                    status: typeof status === "string" ? status : status(item),
                };
            } else {
                return item;
            }
        });
    }
};

export {
    calculate_application_positions,
    focus_on_window,
    get_unique_number,
    construct_application_status,
};
