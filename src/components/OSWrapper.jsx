"use client";

import { SettingsContext } from "@/context/settings";
import { defaultConfig } from "@/config/default";
import { useContext, useEffect, useState } from "react";
import Taskbar from "./Taskbar";

const OSWrapper = ({ children }) => {
    const { userSettings, setUserSettings } = useContext(SettingsContext);
    const [screenStatus, setScreenStatus] = useState({
        screen: "loading",
        isAcceptable: false,
    });

    useEffect(() => {
        // Save the user settings to Context API
        const customSettings = localStorage.getItem("userCustomOSSettings");
        if (customSettings) {
            setUserSettings({
                ...defaultConfig,
                ...JSON.parse(customSettings),
            });
        } else {
            setUserSettings(defaultConfig);
        }

        // Use Event Listener to check if the screen is acceptable
        const handleResize = () => {
            const { innerWidth, innerHeight } = window;
            setScreenStatus((prev) => ({
                screen: innerWidth > innerHeight ? "desktop" : null,
                isAcceptable:
                    innerHeight >= defaultConfig.screen.minHeight &&
                    innerWidth >= defaultConfig.screen.minWidth &&
                    innerWidth / innerHeight >=
                        defaultConfig.screen.minAspectRatio,
            }));
        };
        // Run the function once
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        console.log("Updated screenStatus:", screenStatus);
    }, [screenStatus]);

    // Set Loading Screen
    if (screenStatus.screen === "loading") {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <h1 className="text-4xl text-blue-500">Loading...</h1>
            </div>
        );
    }

    // Check if Screen is Acceptable
    if (screenStatus.screen !== "desktop" || !screenStatus.isAcceptable) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <h1 className="text-4xl text-red-500">
                    Screen size is not acceptable
                </h1>
            </div>
        );
    }

    return (
        <main
            className="bg-cover bg-center h-screen w-screen relative"
            style={{ backgroundImage: `url(${defaultConfig.wallpaper})` }}
        >
            {children}
            <Taskbar />
        </main>
    );
};

export default OSWrapper;
