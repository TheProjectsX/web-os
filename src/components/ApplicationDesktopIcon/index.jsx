import { calculate_application_positions } from "@/utils/helpers";
import Draggable from "./Draggable";

const ApplicationDesktopIcon = ({
    metadata,
    idx,
    updateApplicationPositions,
}) => {
    const { logo, name, description, code } = metadata;

    const currentPositions = calculate_application_positions(
        JSON.parse(localStorage.getItem(`${code}_positions`)) ?? null,
        idx,
        window.innerWidth,
        window.innerHeight
    );

    return (
        <Draggable
            currentPositions={currentPositions}
            onUpdate={updateApplicationPositions}
        >
            <div
                title={description}
                className="flex flex-col items-center p-2 gap-1 text-white text-center w-[5rem] hover:bg-gray-300/20 rounded-sm"
            >
                <img
                    src={logo}
                    alt={name}
                    className="w-14 h-14 select-none pointer-events-none"
                />
                <p className="text-sm select-none pointer-events-none line-clamp-2 text-center">
                    {name} something else is also
                </p>
            </div>
        </Draggable>
    );
};

export default ApplicationDesktopIcon;
