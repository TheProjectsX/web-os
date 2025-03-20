"use client";

import { LuMinus } from "react-icons/lu";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import ApplicationDesktopIcon from "./ApplicationDesktopIcon";
import { defaultConfig } from "@/config/default";
import { SettingsContext } from "@/context/settings";
import {
    calculate_application_positions,
    focus_on_window,
} from "@/utils/helpers";

import { Rnd } from "react-rnd";

const ApplicationWrapper = ({ application, metadata, idx }) => {
    const [applicationStatus, setApplicationStatus] = useState("close");

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

    return (
        <>
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
                    runOnDoubleClick={() => setApplicationStatus("open")}
                    className="application-icon"
                />
            </Rnd>

            {/* Application Window */}
            {applicationStatus === "open" && (
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
                                <button
                                    className="text-white w-12 h-10 cursor-default hover:bg-white/20"
                                    title="Minimize"
                                >
                                    <p className="flex items-center justify-center text-md">
                                        <LuMinus />
                                    </p>
                                </button>
                                <button
                                    className="text-white w-12 h-10 cursor-default hover:bg-white/20"
                                    title="Maximize"
                                >
                                    <p className="flex items-center justify-center text-md">
                                        <MdCheckBoxOutlineBlank />
                                    </p>
                                </button>
                                <button
                                    className="text-white w-12 h-10 cursor-default hover:bg-red-500"
                                    title="Close"
                                    onClick={() =>
                                        setApplicationStatus("close")
                                    }
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
