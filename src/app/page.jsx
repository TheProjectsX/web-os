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
            {defaultApplications.desktop.map(
                (item, idx) =>
                    item.view !== false && (
                        <item.application key={idx} idx={idx} />
                    )
            )}

            {userCustomFiles.map((item, idx) => {
                const reqApplication =
                    defaultApplications.app_by_type[item.type];

                return (
                    <reqApplication.application
                        key={idx}
                        idx={defaultApplications.desktop.length + idx}
                        file_metadata={item}
                    />
                );
            })}
        </div>
    );
}
