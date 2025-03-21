import { defaultConfig } from "@/config/default";

const TaskbarApplicationIcon = ({
    application_info,
    application_list,
    runOnWindowClick,
    runOnClick,
}) => {
    const currentApplicationMetadata = defaultConfig.application.list.find(
        (item) => item.metadata.code === application_info.code
    )?.metadata;

    return (
        <div
            title={currentApplicationMetadata.name}
            onClick={(e) => runOnClick(application_info)}
            className="relative flex flex-col items-center group p-0.5 rounded-md hover:bg-white/5 hover:backdrop-blur-md"
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

            {/* Preview of Opened Applications */}
            <div
                className="absolute p-2 w-max rounded-md bg-white/30 backdrop-blur-md bottom-14 gap-2 text-sm flex invisible group-hover:visible transition-[visibility] duration-500
"
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
