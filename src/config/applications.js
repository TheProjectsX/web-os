import chrome_application, { chrome_metadata } from "@/applications/chrome";
import demo_application, { demo_metadata } from "@/applications/demo";
import notepad_application, { notepad_metadata } from "@/applications/notepad";

export const defaultApplications = {
    desktop: [
        { application: demo_application, metadata: demo_metadata },
        { application: chrome_application, metadata: chrome_metadata },
        { application: notepad_application, metadata: notepad_metadata },
    ],
    taskbar: [demo_metadata],
    app_by_type: {
        txt: { application: notepad_application, metadata: notepad_metadata },
    },
};
