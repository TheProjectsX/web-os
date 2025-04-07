"use client";

// React
import { useContext, useEffect } from "react";

// Custom
import {
    calculate_application_positions,
    construct_application_info,
    construct_application_status,
    get_unique_number,
} from "@/utils/helpers";
import ApplicationDesktopIcon from "./ApplicationDesktopIcon";
import { defaultConfig } from "@/config/default";

// RND
import { Rnd } from "react-rnd";
import { SettingsContext } from "@/context/settings";
import ApplicationBody from "./ApplicationBody";

const ApplicationWrapper = ({
    children,
    metadata,
    runOnMinimize = () => {},
    runOnMaximize = (status) => {},
    runOnClose = () => {},
    idx,
}) => {
    // useEffect(() => console.log("From AR:", metadata), []);

    const {
        openedApplications,
        setOpenedApplications,
        focusedApp,
        setFocusedApp,
    } = useContext(SettingsContext);

    const defaultWindowSize = {
        width:
            ((metadata.size?.width ??
                defaultConfig.application.window.widthPercentage) /
                100) *
            window.innerWidth,
        height:
            ((metadata.size?.height ??
                defaultConfig.application.window.heightPercentage) /
                100) *
            window.innerHeight,
    };

    const currentIconPositions = calculate_application_positions(
        JSON.parse(
            localStorage.getItem(`${metadata.code}_${metadata.key}_pos`)
        ) ?? null,
        idx,
        window.innerWidth,
        window.innerHeight
    );

    const updateApplicationPositions = (positions) => {
        const x = Number(((positions.x / window.innerWidth) * 100).toFixed(2));
        const y = Number(((positions.y / window.innerHeight) * 100).toFixed(2));

        localStorage.setItem(
            `${metadata.code}_${metadata.key}_pos`,
            JSON.stringify({ x, y })
        );
    };

    // Window Handlers
    const handleOpenApplication = () => {
        const newApplication = {
            status: "open",
            pid: get_unique_number(),
            code: metadata.code,
            positions: {
                x: (window.innerWidth - defaultWindowSize.width) / 2,
                y: (window.innerHeight - defaultWindowSize.height) / 2,
            },
            key: metadata.key,
        };

        setOpenedApplications((prev) => [...prev, newApplication]);

        setFocusedApp(newApplication);
    };

    const handleCloseApplication = (pid) => {
        setOpenedApplications((prev) =>
            construct_application_status(
                prev,
                "close",
                pid,
                metadata.code,
                metadata.key
            )
        );

        runOnClose();
    };

    const handleMinimizeWindow = (pid) => {
        setOpenedApplications((prev) =>
            construct_application_status(
                prev,
                "minimize",
                pid,
                metadata.code,
                metadata.key
            )
        );

        runOnMinimize();
    };
    const handleMaximizeWindow = (pid) => {
        let status = "";

        setOpenedApplications((prev) =>
            construct_application_status(
                prev,
                (info) => {
                    status = info.status === "maximize" ? "open" : "maximize";
                    return status;
                },
                pid,
                metadata.code,
                metadata.key
            )
        );

        runOnMaximize(status);
    };

    // useEffect(() => console.log(metadata, idx), [metadata]);

    useEffect(() => {
        console.table(openedApplications);
        // console.log(focusedApp);
    }, [openedApplications, focusedApp]);

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
                    applicationData.code === metadata.code &&
                    applicationData.key === metadata.key && (
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
                                        : focusedApp?.pid ===
                                              applicationData.pid &&
                                          focusedApp?.code ===
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
                            minHeight={
                                metadata.size?.height
                                    ? (metadata.size?.height / 100) *
                                      window.innerHeight
                                    : 252
                            }
                            minWidth={
                                metadata.size?.width
                                    ? (metadata.size?.width / 100) *
                                      window.innerWidth
                                    : 352
                            }
                            className={`!cursor-default ${
                                applicationData.status === "maximize"
                                    ? "transition-all duration-200 ease-in-out"
                                    : ""
                            }`}
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
                                        applicationData.code,
                                        applicationData.key
                                    )
                                );
                            }}
                            enableResizing={
                                metadata.resize
                                    ? applicationData.status === "open"
                                    : false
                            }
                            disableDragging={
                                metadata.draggable
                                    ? applicationData.status !== "open"
                                    : true
                            }
                        >
                            <ApplicationBody
                                handleMinimizeWindow={handleMinimizeWindow}
                                handleMaximizeWindow={handleMaximizeWindow}
                                handleCloseApplication={handleCloseApplication}
                                pid={applicationData.pid}
                                title={`${metadata.name} [${idx + 1}]`}
                            >
                                {children}
                            </ApplicationBody>
                        </Rnd>
                    )
            )}
        </>
    );
};

export default ApplicationWrapper;
