"use client";

import { defaultConfig } from "@/config/default";
import ApplicationWrapper from "@/components/ApplicationWrapper";
import { defaultApplications } from "@/config/applications";
import { useContext } from "react";
import { SettingsContext } from "@/context/settings";

export default function Home() {
    const { userCustomFiles } = useContext(SettingsContext);

    return (
        <div className="w-full h-full relative">
            {defaultApplications.desktop.map((item, idx) => (
                <ApplicationWrapper
                    application={<item.application />}
                    metadata={item.metadata}
                    idx={idx}
                    key={idx}
                />
            ))}

            {userCustomFiles.map((item, idx) => {
                const reqApplication =
                    defaultApplications.app_by_type[item.type];

                return (
                    <ApplicationWrapper
                        application={
                            <reqApplication.application file_metadata={item} />
                        }
                        metadata={reqApplication.metadata}
                        idx={defaultApplications.desktop.length + idx}
                        key={idx}
                    />
                );
            })}
        </div>
    );
}
