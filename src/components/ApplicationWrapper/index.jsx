"use client";

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
import ApplicationBody from "./ApplicationBody";

const ApplicationWrapper = ({ application, metadata, idx }) => {
    const { openedApplications, setOpenedApplications } =
        useContext(SettingsContext);

    const [applicationInfo, setApplicationInfo] = useState([]);

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
        const newApplication = {
            status: "open",
            pid: get_unique_number(),
            code: metadata.code,
        };

        setApplicationInfo((prev) => [...prev, newApplication]);

        setOpenedApplications((prev) => [...prev, newApplication]);
    };

    const handleCloseApplication = (pid) => {
        setApplicationInfo((prev) => prev.filter((item) => item.pid !== pid));

        setOpenedApplications((prev) =>
            prev.filter(
                (item) => !(item.pid === pid && item.code === metadata.code)
            )
        );
    };

    const handleMinimizeWindow = (pid) => {
        setApplicationInfo((prev) =>
            prev.map((item) => {
                if (item.pid === pid) {
                    return { ...item, status: "minimize" };
                } else {
                    return item;
                }
            })
        );

        setOpenedApplications((prev) =>
            prev.map((item) => {
                if (item.pid === pid && item.code == metadata.code) {
                    return { ...item, status: "minimize" };
                } else {
                    return item;
                }
            })
        );
    };
    const handleMaximizeWindow = (pid) => {
        setApplicationInfo((prev) =>
            prev.map((item) => {
                if (item.pid === pid) {
                    return { ...item, status: "maximize" };
                } else {
                    return item;
                }
            })
        );

        setOpenedApplications((prev) =>
            prev.map((item) => {
                if (item.pid === pid && item.code == metadata.code) {
                    return { ...item, status: "maximize" };
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
            {applicationInfo.map(
                (applicationData) =>
                    applicationData.status === "open" && (
                        <Rnd
                            key={applicationData.pid}
                            onMouseDown={(e) => {
                                focus_on_window(e.currentTarget);
                            }}
                            style={{
                                zIndex:
                                    openedApplications[
                                        openedApplications.length - 1
                                    ].pid === applicationData.pid &&
                                    openedApplications[
                                        openedApplications.length - 1
                                    ].code === metadata.code ? (
                                        defaultConfig.application.window.zFocus
                                    ) : (
                                        <defaultConfig className="application window zre"></defaultConfig>
                                    ),
                            }}
                            minHeight={252}
                            minWidth={392}
                            className="!cursor-default"
                            dragHandleClassName="application-top-bar"
                            default={{
                                x: 182 + 12 * applicationInfo.length,
                                y: 100 + 12 * applicationInfo.length,
                                ...defaultWindowSize,
                            }}
                        >
                            <ApplicationBody
                                handleMinimizeWindow={handleMinimizeWindow}
                                handleMaximizeWindow={handleMaximizeWindow}
                                handleCloseApplication={handleCloseApplication}
                                pid={applicationData.pid}
                            >
                                {application}
                            </ApplicationBody>
                        </Rnd>
                    )
            )}
        </>
    );
};

export default ApplicationWrapper;
