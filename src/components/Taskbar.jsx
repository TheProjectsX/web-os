"use client";

import { useEffect, useState } from "react";

const Taskbar = ({ extraApps, userSettings }) => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full px-2 py-1.5 text-white bg-white/10 backdrop-blur-md flex justify-between items-center">
            {/* Left Side */}
            <div>
                {userSettings.taskbar?.position === "left" && <p>Taskbar</p>}
            </div>
            {/* Center */}
            <div>
                {userSettings.taskbar?.position === "center" && <p>Taskbar</p>}
            </div>
            {/* Right Side */}
            <div>
                {/* Time */}
                <div className="text-xs text-right">
                    <p>
                        {dateTime.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
                    <p>
                        {dateTime
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "/")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Taskbar;
