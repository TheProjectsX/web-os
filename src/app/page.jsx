"use client";

import { defaultApplications } from "@/config/applications";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "@/context/settings";
import MouseSelect from "@/components/MouseSelect";

export default function Home() {
    const { userCustomFiles } = useContext(SettingsContext);
    const [mouseSelect, setMouseSelect] = useState({
        onSelect: false,
        released: false,
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
    });

    return (
        <div
            className="w-full h-full relative"
            onMouseDown={(e) => {
                if (e.currentTarget === e.target) {
                    setMouseSelect({
                        onSelect: true,
                        released: false,
                        start: { x: e.clientX, y: e.clientY },
                        end: { x: e.clientX, y: e.clientY },
                    });
                }
            }}
            onMouseMove={(e) => {
                if (mouseSelect.onSelect) {
                    setMouseSelect((prev) => ({
                        ...prev,
                        end: { x: e.clientX, y: e.clientY },
                    }));
                }
            }}
            onMouseUp={(e) => {
                if (mouseSelect.onSelect) {
                    setMouseSelect((prev) => ({
                        ...prev,
                        onSelect: false,
                        released: true,
                    }));
                } else if (
                    mouseSelect.released &&
                    info.start.x === info.end.x &&
                    info.start.y === info.end.y
                ) {
                    setMouseSelect((prev) => ({
                        ...prev,
                        start: { x: 0, y: 0 },
                        end: { x: 0, y: 0 },
                    }));
                }
            }}
        >
            <MouseSelect info={mouseSelect} />
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
