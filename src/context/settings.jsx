"use client";

import { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [userSettings, setUserSettings] = useState({});
    const [openedApplications, setOpenedApplications] = useState([]);
    const [userCustomFiles, setUserCustomFiles] = useState([]);
    const [focusedApp, setFocusedApp] = useState({});

    return (
        <SettingsContext.Provider
            value={{
                userSettings,
                setUserSettings,
                openedApplications,
                setOpenedApplications,
                focusedApp,
                setFocusedApp,
                userCustomFiles,
                setUserCustomFiles,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
