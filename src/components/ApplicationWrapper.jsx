"use client";

import { useState } from "react";
import ApplicationDesktopIcon from "./ApplicationDesktopIcon";

const ApplicationWrapper = ({ application, metadata }) => {
    const [applicationStatus, setApplicationStatus] = useState("closed");

    return (
        <>
            <ApplicationDesktopIcon
                logo={metadata.logo}
                name={metadata.name}
                description={metadata.description}
                position={{ xp: 0, yp: 0 }}
            />
        </>
    );
};

export default ApplicationWrapper;
