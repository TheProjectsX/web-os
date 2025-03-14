"use client";

import { OSContext } from "@/context/OSContext";
import { getARSize } from "@/utils/funcs";
import { useContext, useEffect } from "react";
import { osConfig } from "@/config/os-config";

const OSWrapper = ({ children }) => {
    const { userSettings, setUserSettings } = useContext(OSContext);
    const { width: screenWidth, height: screenHeight } = userSettings;

    useEffect(() => {
        const { width, height, aspectRatio } = getARSize(
            window.innerWidth,
            window.innerHeight
        );

        setUserSettings({ ...userSettings, width, height, aspectRatio });
        console.log(width, height, aspectRatio);
    }, []);

    if (!screenWidth || !screenHeight) {
        return;
    }

    return (
        <main
            style={{
                "--aspect-ratio": screenWidth / screenHeight,
                "--font-size": `${(screenWidth / screenHeight) * 1.5} rem`,
                width: screenWidth,
                height: screenHeight,
                fontSize: `${(screenWidth / screenHeight) * 8}px`,
                backgroundImage: `url(${osConfig.wallpaper})`,
            }}
            className="bg-cover bg-center"
        >
            {children}
        </main>
    );
};

export default OSWrapper;
