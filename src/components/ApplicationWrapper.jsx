"use client";

import { useEffect, useState } from "react";
import ApplicationDesktopIcon from "./ApplicationDesktopIcon";

const ApplicationWrapper = ({ application, metadata, idx }) => {
    const [applicationInfo, setApplicationInfo] = useState({
        status: "closed",
    });

    const updateApplicationPositions = (positions) => {
        localStorage.setItem(
            `${metadata.code}_positions`,
            JSON.stringify(positions)
        );
    };

    return (
        <>
            <ApplicationDesktopIcon
                metadata={metadata}
                idx={idx}
                updateApplicationPositions={updateApplicationPositions}
            />
        </>
    );
};

export default ApplicationWrapper;
