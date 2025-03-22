"use client";

// React
import { useContext, useEffect, useState } from "react";

// Custom
import {
    calculate_application_positions,
    construct_application_info,
    construct_application_status,
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
    const {
        openedApplications,
        setOpenedApplications,
        focusedApp,
        setFocusedApp,
    } = useContext(SettingsContext);

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
            positions: {
                x: 182 + 12 * openedApplications.length,
                y: 100 + 12 * openedApplications.length,
            },
        };

        setOpenedApplications((prev) => [...prev, newApplication]);

        setFocusedApp(newApplication);
    };

    const handleCloseApplication = (pid) => {
        setOpenedApplications((prev) =>
            construct_application_status(prev, "close", pid, metadata.code)
        );
    };

    const handleMinimizeWindow = (pid) => {
        setOpenedApplications((prev) =>
            construct_application_status(prev, "minimize", pid, metadata.code)
        );
    };
    const handleMaximizeWindow = (pid) => {
        setOpenedApplications((prev) =>
            construct_application_status(
                prev,
                (info) => (info.status === "maximize" ? "open" : "maximize"),
                pid,
                metadata.code
            )
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
            {openedApplications.map(
                (applicationData, idx) =>
                    (applicationData.status === "open" ||
                        applicationData.status === "maximize") &&
                    applicationData.code === metadata.code && (
                        <Rnd
                            key={applicationData.pid}
                            onMouseDown={(e) => {
                                setFocusedApp(applicationData);
                            }}
                            style={{
                                zIndex:
                                    applicationData.status === "maximize"
                                        ? defaultConfig.application.window
                                              .zMaximize
                                        : focusedApp.pid ===
                                              applicationData.pid &&
                                          focusedApp.code ===
                                              applicationData.code
                                        ? defaultConfig.application.window
                                              .zFocus
                                        : defaultConfig.application.window
                                              .zRegular,
                            }}
                            position={
                                applicationData.status === "maximize"
                                    ? { x: 0, y: 0 }
                                    : applicationData.positions
                            }
                            size={
                                applicationData.status === "maximize"
                                    ? {
                                          width: "100vw",
                                          height:
                                              defaultConfig.taskbar
                                                  .visibilityStatus ===
                                              "regular"
                                                  ? "100vh"
                                                  : "100vh",
                                      }
                                    : undefined
                            }
                            minHeight={252}
                            minWidth={392}
                            className="!cursor-default"
                            dragHandleClassName="application-top-bar"
                            default={{
                                ...applicationData.positions,
                                ...defaultWindowSize,
                            }}
                            onDragStop={(e, d) => {
                                setOpenedApplications((prev) =>
                                    construct_application_info(
                                        prev,
                                        "positions",
                                        { x: d.x, y: d.y },
                                        applicationData.pid,
                                        applicationData.code
                                    )
                                );
                            }}
                            enableResizing={applicationData.status === "open"}
                            disableDragging={applicationData.status !== "open"}
                        >
                            <ApplicationBody
                                handleMinimizeWindow={handleMinimizeWindow}
                                handleMaximizeWindow={handleMaximizeWindow}
                                handleCloseApplication={handleCloseApplication}
                                pid={applicationData.pid}
                                title={`${metadata.name} [${idx + 1}]`}
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
