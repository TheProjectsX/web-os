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
        idx
    );

    return (
        <Draggable
            currentPositions={currentPositions}
            onUpdate={updateApplicationPositions}
        >
            <div
                title={description}
                className="flex flex-col items-center p-2 text-white text-center w-fit"
            >
                <img
                    src={logo}
                    alt={name}
                    className="w-14 h-14 select-none pointer-events-none"
                />
                <p className="text-sm select-none pointer-events-none">
                    {name}
                </p>
            </div>
        </Draggable>
    );
};

export default ApplicationDesktopIcon;
