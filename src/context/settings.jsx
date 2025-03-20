"use client";

import { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [userSettings, setUserSettings] = useState({});
    const [openedApplications, setOpenedApplications] = useState([]);

    return (
        <SettingsContext.Provider
            value={{
                userSettings,
                setUserSettings,
                openedApplications,
                setOpenedApplications,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
