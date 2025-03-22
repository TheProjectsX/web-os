import { defaultConfig } from "@/config/default";
import { useEffect } from "react";

const TaskbarApplicationIcon = ({
    application_info,
    application_list,
    runOnWindowClick,
    runOnClick,
    currentlyFocused,
}) => {
    const currentApplicationMetadata = defaultConfig.application.list.find(
        (item) => item.metadata.code === application_info.code
    )?.metadata;

    const openedAndFocused =
        application_list.find(
            (item) =>
                item.pid === currentlyFocused.pid &&
                item.code === currentlyFocused.code
        )?.status === "open";

    // useEffect(
    //     () =>
    //         console.log(
    //             application_list.find(
    //                 (item) =>
    //                     item.pid === currentlyFocused.pid &&
    //                     item.code === currentlyFocused.code
    //             )
    //         ),
    //     [application_list]
    // );

    return (
        <div className="relative group flex flex-col items-center">
            <div
                title={currentApplicationMetadata.name}
                onClick={(e) => runOnClick(application_info)}
                className={`relative flex flex-col items-center justify-center group pt-0.5 px-1.5 rounded-md hover:bg-white/5 hover:backdrop-blur-md gap-0.5 ${
                    openedAndFocused ? "bg-white/10 backdrop-blur-md" : ""
                }`}
            >
                <img
                    src={currentApplicationMetadata.logo}
                    alt={currentApplicationMetadata.name}
                    style={{
                        width: `${defaultConfig.application.taskbarIcon.widthRem}rem`,
                        height: `${defaultConfig.application.taskbarIcon.heightRem}rem`,
                    }}
                    className="select-none pointer-events-none"
                />
                <div className="h-1">
                    {application_list.length > 0 && (
                        <p
                            className={`h-1 transition-[width] duration-200 rounded-lg ${
                                openedAndFocused
                                    ? "w-4 bg-blue-400"
                                    : "w-2 bg-gray-500"
                            }`}
                        ></p>
                    )}
                </div>
            </div>
            {/* Preview of Opened Applications */}
            <div
                className={`absolute p-2 w-max rounded-md bg-white/30 backdrop-blur-md bottom-14 gap-2 text-sm flex invisible transition-[visibility] delay-300 ${
                    application_list.length > 1
                        ? "group-hover:visible"
                        : "group-hover:visible"
                }`}
                hidden={application_list.length === 1}
            >
                {application_list.map((item, idx) => (
                    <button
                        key={item.pid}
                        className="bg-gray-700 rounded-lg px-3 py-1.5"
                        title={`${currentApplicationMetadata.name} [${
                            idx + 1
                        }]`}
                        onClick={() => runOnWindowClick(item)}
                    >
                        {currentApplicationMetadata.name} [{idx + 1}]
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaskbarApplicationIcon;
