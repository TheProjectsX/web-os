import { calculate_application_positions } from "@/utils/helpers";
import Draggable from "./Draggable";

const ApplicationDesktopIcon = ({
    metadata,
    idx,
    className,
    runOnDoubleClick = () => {},
}) => {
    const { logo, name, description, code } = metadata;

    const currentPositions = calculate_application_positions(
        JSON.parse(localStorage.getItem(`${code}_pos`)) ?? null,
        idx,
        window.innerWidth,
        window.innerHeight
    );

    return (
        <div
            title={`${name}\n${description}`}
            className={`flex flex-col items-center px-2 py-0.5 gap-1 text-white text-center w-[5rem] hover:bg-gray-300/20 rounded-sm ${className}`}
            onDoubleClick={runOnDoubleClick}
        >
            <img
                src={logo}
                alt={name}
                className="w-14 h-14 select-none pointer-events-none"
            />
            <p className="text-sm select-none pointer-events-none line-clamp-2 leading-4 text-center">
                {name}
            </p>
        </div>
    );
};

export default ApplicationDesktopIcon;
