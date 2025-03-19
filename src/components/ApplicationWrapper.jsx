"use client";

import { useEffect, useState } from "react";
import ApplicationDesktopIcon from "./ApplicationDesktopIcon";

const ApplicationWrapper = ({ application, metadata, idx }) => {
    const [applicationInfo, setApplicationInfo] = useState({
        status: "closed",
    });

    const updateApplicationPositions = (positions) => {
        const x = Number(((positions.x / window.innerWidth) * 100).toFixed(2));
        const y = Number(((positions.y / window.innerHeight) * 100).toFixed(2));

        localStorage.setItem(
            `${metadata.code}_positions`,
            JSON.stringify({ x, y })
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
