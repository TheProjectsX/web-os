import { createContext, useState } from "react";

export const OSContext = createContext();

export const OSProvider = ({ children }) => {
    // const [theme, setTheme] = useState("light");
    const [userSettings, setUserSettings] = useState({});

    return (
        <OSContext.Provider value={{ userSettings, setUserSettings }}>
            {children}
        </OSContext.Provider>
    );
};
