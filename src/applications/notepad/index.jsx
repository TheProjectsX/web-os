"use client";

import { defaultConfig } from "@/config/default";
import { useRef } from "react";

export const notepad_metadata = {
    logo: "/application_logo/notepad_pc_application_logo.png",
    name: "Notepad",
    description: "Notepad application",
    type: "application",
    code: "notepad_application",
};

const notepad_application = () => {
    const areaRef = useRef(null);

    const handleSaveDocument = () => {
        const pastData = localStorage.getItem(
            defaultConfig.localStorage.keys.customFiles
        );
        const fileName = prompt("Enter File Name:> ", `${Date.now()}.txt`);

        const currentData = {
            name: fileName,
            type: "txt",
            time: Date.now(),
            content: areaRef.current.value,
        };

        const newData = JSON.stringify(
            [...(JSON.parse(pastData) ?? [])],
            currentData
        );
        console.log(newData);

        localStorage.setItem(
            defaultConfig.localStorage.keys.customFiles,
            newData
        );
    };

    return (
        <div className="h-full">
            {/* Controls */}
            <div className="bg-gray-600 text-white flex border-t items-center px-1.5 py-1">
                <button
                    className="px-1.5 hover:underline underline-offset-2"
                    onClick={handleSaveDocument}
                >
                    Save
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
                ref={areaRef}
            ></textarea>
        </div>
    );
};

export default notepad_application;
