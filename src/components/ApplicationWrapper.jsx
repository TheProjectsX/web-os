"use client";

// Icons
import { LuMinus } from "react-icons/lu";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

// React
import { useContext, useEffect, useState } from "react";

// Custom
import {
    calculate_application_positions,
    focus_on_window,
    get_unique_number,
} from "@/utils/helpers";
import ApplicationDesktopIcon from "./ApplicationDesktopIcon";
import { defaultConfig } from "@/config/default";

// RND
import { Rnd } from "react-rnd";
import { SettingsContext } from "@/context/settings";

const ApplicationWrapper = ({ application, metadata, idx }) => {
    const { openedApplications, setOpenedApplications } =
        useContext(SettingsContext);

    const [applicationInfo, setApplicationInfo] = useState({
        status: "closed",
        pid: get_unique_number(),
    });

    const defaultWindowSize = {
        width:
            (defaultConfig.application.window.widthPercentage / 100) *
            window.innerWidth,
        height:
            (defaultConfig.application.window.heightPercentage / 100) *
            window.innerHeight,
    };
    const currentIconPositions = calculate_application_positions(
        JSON.parse(localStorage.getItem(`${metadata.code}_pos`)) ?? null,
        idx,
        window.innerWidth,
        window.innerHeight
    );

    const updateApplicationPositions = (positions) => {
        const x = Number(((positions.x / window.innerWidth) * 100).toFixed(2));
        const y = Number(((positions.y / window.innerHeight) * 100).toFixed(2));

        localStorage.setItem(`${metadata.code}_pos`, JSON.stringify({ x, y }));
    };

    // Window Handlers
    const handleOpenApplication = () => {
        setApplicationInfo((prev) => ({ ...prev, status: "open" }));

        setOpenedApplications((prev) => [
            ...prev,
            { status: "open", pid: applicationInfo.pid, code: metadata.code },
        ]);
    };

    const handleCloseApplication = () => {
        setApplicationInfo((prev) => ({ ...prev, status: "close" }));

        setOpenedApplications((prev) =>
            prev.filter(
                (item) =>
                    item.pid !== applicationInfo.pid &&
                    item.code !== metadata.code
            )
        );
    };

    const handleMinimizeWindow = () => {
        setApplicationInfo((prev) => ({ ...prev, status: "minimize" }));

        setOpenedApplications((prev) =>
            prev.map((item) => {
                if (
                    item.pid === applicationInfo.pid &&
                    item.code == metadata.code
                ) {
                    return { ...item, status: "minimize" };
                } else {
                    return item;
                }
            })
        );
    };
    const handleMaximizeWindow = () => {
        setApplicationInfo((prev) => ({ ...prev, status: "maximize" }));

        setOpenedApplications((prev) =>
            prev.map((item) => {
                if (
                    item.pid === applicationInfo.pid &&
                    item.code == metadata.code
                ) {
                    return { ...item, status: "maximize." };
                } else {
                    return item;
                }
            })
        );
    };

    useEffect(() => console.table(openedApplications), [openedApplications]);

    return (
        <>
            {/* Application Icon */}
            <Rnd
                className="!cursor-default"
                enableResizing={false}
                onDragStop={(e, d) =>
                    updateApplicationPositions({ x: d.x, y: d.y })
                }
                default={{ ...currentIconPositions }}
            >
                <ApplicationDesktopIcon
                    metadata={metadata}
                    idx={idx}
                    runOnDoubleClick={handleOpenApplication}
                    className="application-icon"
                />
            </Rnd>

            {/* Application Window */}
            {applicationInfo.status === "open" && (
                <Rnd
                    onMouseDown={(e) => {
                        focus_on_window(e.currentTarget);
                    }}
                    minHeight={252}
                    minWidth={392}
                    className="!cursor-default"
                    dragHandleClassName="application-top-bar"
                    default={{ x: 182, y: 100, ...defaultWindowSize }}
                >
                    <div
                        data-name="application-window"
                        className="bg-gray-500 rounded-md overflow-hidden border-[0.5px] border-gray-400 w-full h-full"
                    >
                        {/* Top Bar */}
                        <div
                            data-name="application-top-bar"
                            className="flex justify-between items-center bg-gray-600 application-top-bar"
                        >
                            {/* Here can be custom top bar items of the applications */}
                            <div></div>

                            {/* Controls */}
                            <div className="">
                                {/* Minimize Button */}
                                <button
                                    className="text-white w-12 h-10 cursor-default hover:bg-white/20"
                                    title="Minimize"
                                    onClick={handleMinimizeWindow}
                                >
                                    <p className="flex items-center justify-center text-md">
                                        <LuMinus />
                                    </p>
                                </button>

                                {/* Maximize Button */}
                                <button
                                    className="text-white w-12 h-10 cursor-default hover:bg-white/20"
                                    title="Maximize"
                                    onClick={handleMaximizeWindow}
                                >
                                    <p className="flex items-center justify-center text-md">
                                        <MdCheckBoxOutlineBlank />
                                    </p>
                                </button>

                                {/* Close Button */}
                                <button
                                    className="text-white w-12 h-10 cursor-default hover:bg-red-500"
                                    title="Close"
                                    onClick={handleCloseApplication}
                                >
                                    <p className="flex items-center justify-center text-lg">
                                        <RxCross2 />
                                    </p>
                                </button>
                            </div>
                        </div>

                        <div
                            data-name="application-body"
                            className="select-none pointer-events-none z-50"
                        >
                            {application}
                        </div>
                    </div>
                </Rnd>
            )}
        </>
    );
};

export default ApplicationWrapper;
