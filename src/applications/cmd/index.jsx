import ApplicationWrapper from "@/components/ApplicationWrapper";
import { useState } from "react";

export const cmd_metadata = {
    logo: "/application_logo/cmd_pc_application_logo.png",
    name: "CMD",
    description: "This is a Demo Application, nothing to see!",
    type: "application",
    code: "cmd_application",
    key: "original",
    resize: true,
    draggable: true,
    scroll: { y: true },
};

const cmd_application = ({ idx }) => {
    const [userUsages, setUserUsage] = useState([
        {
            type: "reply",
            status: "success",
            value: `Web OS [Version 1.0.1]`,
        },
        {
            type: "reply",
            status: "success",
            value: `© TheProjectsX. All rights reserved.`,
        },
    ]);

    // Supported Commands
    const supportedCommands = ["ls", "cd", "clear", "date", "time", "whoami"];

    const handleUserSubmit = (e) => {
        e.preventDefault();
        const command = e.target.command.value.trim();
        const commandPrefix = command.split(" ")[0];

        if (command === "") {
            return setUserUsage((prev) => [
                ...prev,
                { type: "command", value: command },
            ]);
        }

        if (!supportedCommands.includes(command.split(" ")[0])) {
            setUserUsage((prev) => [
                ...prev,
                { type: "command", value: command },
                {
                    type: "reply",
                    status: "error",
                    value: `"${
                        command.split(" ")[0]
                    }" is not recognized as an internal or external command. Type "help" to get available commands`,
                },
            ]);
        }

        if (commandPrefix === "clear") {
            setUserUsage([]);
        } else if (commandPrefix === "date") {
        }

        e.target.command.value = "";
        const parent = e.target.closest('[data-name="application-body"]');

        setTimeout(() => {
            parent.scrollTop = parent.scrollHeight;
        }, 0);
    };

    return (
        <ApplicationWrapper metadata={cmd_metadata} idx={idx}>
            <div className="p-2 min-h-full h-fit bg-gray-900 text-gray-200 text-base">
                {/* Controls */}
                <div>
                    {/* User Results */}
                    {userUsages.map((item, idx) => {
                        if (item.type == "command") {
                            return (
                                <p
                                    className="mt-3 flex items-center gap-0.5"
                                    key={idx}
                                >
                                    Desktop:&gt;<span>{item.value}</span>
                                </p>
                            );
                        }

                        return (
                            <p className={``} key={idx}>
                                {item.value}
                            </p>
                        );
                    })}

                    {/* Type */}
                    <form onSubmit={handleUserSubmit} className="mt-3">
                        <label className="flex items-center gap-0.5">
                            Desktop:&gt;
                            <input
                                type="text"
                                name="command"
                                className="outline-none border-none bg-transparent w-full"
                                autoComplete="off"
                            />
                        </label>
                    </form>
                </div>
            </div>
        </ApplicationWrapper>
    );
};

export default cmd_application;
