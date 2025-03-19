"use client";

import { LuMinus } from "react-icons/lu";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import ApplicationDesktopIcon from "./ApplicationDesktopIcon";
import { defaultConfig } from "@/config/default";
import Draggable from "./ApplicationDesktopIcon/Draggable";

const ApplicationWrapper = ({ application, metadata, idx }) => {
    const [applicationStatus, setApplicationStatus] = useState("close");

    const updateApplicationPositions = (positions) => {
        const x = Number(((positions.x / window.innerWidth) * 100).toFixed(2));
        const y = Number(((positions.y / window.innerHeight) * 100).toFixed(2));

        localStorage.setItem(`${metadata.code}_pos`, JSON.stringify({ x, y }));
    };

    return (
        <>
            <ApplicationDesktopIcon
                metadata={metadata}
                idx={idx}
                updateApplicationPositions={updateApplicationPositions}
                runOnDoubleClick={() => setApplicationStatus("open")}
            />

            {/* Application Window */}
            {applicationStatus === "open" && (
                <Draggable currentPositions={{ x: 183, y: 100 }}>
                    <div
                        data-name="application-window"
                        style={{
                            width: `${
                                (defaultConfig.application.window
                                    .widthPercentage /
                                    100) *
                                window.innerWidth
                            }px`,
                            height: `${
                                (defaultConfig.application.window
                                    .heightPercentage /
                                    100) *
                                window.innerHeight
                            }px`,
                        }}
                        className="bg-black/40 backdrop-blur-sm rounded-md overflow-hidden"
                    >
                        {/* Top Bar */}
                        <div className="flex justify-between items-center bg-white/10">
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

                        <div className="select-none pointer-events-none">
                            {application}
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    );
};

export default ApplicationWrapper;
