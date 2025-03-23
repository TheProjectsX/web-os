"use client";

import { SettingsContext } from "@/context/settings";
import { useContext, useEffect, useState } from "react";
import TaskbarApplicationIcon from "./TaskbarApplicationIcon";
import {
    construct_application_status,
    get_unique_number,
} from "@/utils/helpers";
import { defaultConfig } from "@/config/default";
import { defaultApplications } from "@/config/applications";

const Taskbar = ({ userSettings }) => {
    const {
        openedApplications,
        setOpenedApplications,
        focusedApp,
        setFocusedApp,
    } = useContext(SettingsContext);
    const [dateTime, setDateTime] = useState(new Date());
    const extraApps = defaultApplications.taskbar ?? [];

    // Handle the Icon click when there is only one window opened
    const handleIconClick = (application_info) => {
        const applications = openedApplications.filter(
            (item) => item.code === application_info.code
        );

        // Open the Window if Only 1 Window is Opened
        if (applications.length === 1) {
            setOpenedApplications((prev) =>
                construct_application_status(
                    prev,
                    (info) =>
                        info.status === "open" || info.status === "maximize"
                            ? "minimize"
                            : "open",
                    application_info.pid,
                    application_info.code,
                    application_info.key
                )
            );

            setFocusedApp(
                openedApplications.find(
                    (item) =>
                        item.pid === application_info.pid &&
                        item.code === application_info.code
                )
            );
        }
        // Open a new Application Window if None Opened
        else if (applications.length === 0) {
            const newApplication = {
                status: "open",
                pid: get_unique_number(),
                code: application_info.code,
                positions: {
                    x: 182 + 12 * openedApplications.length,
                    y: 100 + 12 * openedApplications.length,
                },
            };

            setOpenedApplications((prev) => [...prev, newApplication]);

            setFocusedApp(newApplication);

            return newApplication;
        }
    };

    // Handle individual Window control from Taskbar
    const handleWindowClick = (application_info) => {
        setOpenedApplications((prev) =>
            construct_application_status(
                prev,
                "open",
                application_info.pid,
                application_info.code,
                application_info.key
            )
        );

        setFocusedApp(
            openedApplications.find(
                (item) =>
                    item.pid === application_info.pid &&
                    item.code === application_info.code
            )
        );
    };

    const taskbarApplications = Array.from(
        new Map(
            [...openedApplications, ...extraApps].map((item) => [
                item.code,
                item,
            ])
        ).values()
    );

    // Clock
    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer
            className="w-full px-2 py-1 text-white bg-white/10 backdrop-blur-md flex justify-between items-center select-none"
            style={{
                zIndex: defaultConfig.taskbar.zIndex,
                height: `${defaultConfig.taskbar.heightPX}px`,
            }}
        >
            {userSettings.taskbar?.position === "center" && (
                <div>
                    {/* This is a blank Div to get the actual items to go to center */}
                </div>
            )}

            {/* Center */}
            <div className="flex items-center gap-2">
                {taskbarApplications.map((item, idx) => (
                    <TaskbarApplicationIcon
                        key={idx}
                        application_info={item}
                        application_list={openedApplications.filter(
                            (item2) => item2.code === item.code
                        )}
                        runOnWindowClick={handleWindowClick}
                        runOnClick={handleIconClick}
                        currentlyFocused={focusedApp}
                    />
                ))}
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
