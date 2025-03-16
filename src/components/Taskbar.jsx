"use client";

import { useEffect, useState } from "react";

const Taskbar = ({ extraApps }) => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="absolute w-full bottom-0 px-2 py-1.5 text-white bg-white/10 backdrop-blur-md flex justify-between items-center">
            {/* Left Side */}
            <div>Left</div>
            {/* Center */}
            <div>Right</div>
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
