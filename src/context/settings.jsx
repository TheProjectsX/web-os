"use client";

import { createContext, useState } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [userSettings, setUserSettings] = useState({});

    return (
        <SettingsContext.Provider
            value={{
                userSettings,
                setUserSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
