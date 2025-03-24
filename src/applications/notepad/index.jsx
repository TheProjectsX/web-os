"use client";

import ApplicationWrapper from "@/components/ApplicationWrapper";
import { defaultConfig } from "@/config/default";
import { SettingsContext } from "@/context/settings";
import { useContext, useRef, useState } from "react";

// Notepad Metadata
export const notepad_metadata = {
    logo: "/application_logo/notepad_pc_application_logo.png",
    name: "Notepad",
    description: "Notepad application",
    type: "application",
    code: "notepad_application",
    key: "original",
};

// Notepad Application
const notepad_application = ({ file_metadata, idx }) => {
    const { setUserCustomFiles, setOpenedApplications } =
        useContext(SettingsContext);
    // console.log(file_metadata, idx);

    const [currentFileData, setCurrentFileData] = useState(file_metadata ?? {});

    const metadata = { ...notepad_metadata };
    if (file_metadata) {
        metadata["time"] = file_metadata["time"];
        metadata["name"] = file_metadata.name;
        metadata["key"] = file_metadata.time;
    }

    // Application Controller Func
    const handleSaveDocument = () => {
        const pastData = JSON.parse(
            localStorage.getItem(defaultConfig.localStorage.keys.customFiles)
        );
        const fileName = prompt("Enter File Name: ", `${Date.now()}`);
        if (!fileName) return;

        const currentData = {
            name: fileName,
            type: "txt",
            time: Date.now(),
            content: currentFileData.content,
        };

        const newData = [...(pastData ?? []), currentData];

        localStorage.setItem(
            defaultConfig.localStorage.keys.customFiles,
            JSON.stringify(newData)
        );

        setUserCustomFiles(newData);
    };

    const handleDeleteDocument = () => {
        const pastData = JSON.parse(
            localStorage.getItem(defaultConfig.localStorage.keys.customFiles)
        );

        const newData = pastData.filter((item) => item.time !== metadata.time);

        localStorage.setItem(
            defaultConfig.localStorage.keys.customFiles,
            JSON.stringify(newData)
        );

        setUserCustomFiles(newData);
        setOpenedApplications((prev) =>
            prev.filter(
                (item) =>
                    item.key !== metadata.key && item.code !== metadata.code
            )
        );
    };

    return (
        <ApplicationWrapper
            idx={idx}
            metadata={metadata}
            runOnClose={() => setCurrentFileData({})}
        >
            <div className="h-full">
                {/* Controls */}
                <div className="bg-gray-600 text-white flex border-t items-center px-1.5 py-1">
                    <button
                        className="px-1.5 hover:underline underline-offset-2"
                        onClick={handleSaveDocument}
                    >
                        Save
                    </button>
                    <button
                        className="px-1.5 hover:underline underline-offset-2"
                        onClick={handleDeleteDocument}
                        disabled={!file_metadata}
                    >
                        Delete
                    </button>
                    <button className="px-1.5 hover:underline underline-offset-2">
                        File
                    </button>
                    <button className="px-1.5 hover:underline underline-offset-2">
                        Edit
                    </button>
                    <button className="px-1.5 hover:underline underline-offset-2">
                        Options
                    </button>
                </div>

                {/* Text area */}
                <textarea
                    className="w-full h-full resize-none outline-none px-2 py-1.5"
                    value={currentFileData.content ?? ""}
                    onChange={(e) =>
                        setCurrentFileData((prev) => ({
                            ...prev,
                            content: e.target.value,
                        }))
                    }
                ></textarea>
            </div>
        </ApplicationWrapper>
    );
};

export default notepad_application;
