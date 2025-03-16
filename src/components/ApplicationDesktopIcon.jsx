import React from "react";

const ApplicationDesktopIcon = ({ logo, name, description, position }) => {
    return (
        <div
            title={description}
            className="flex flex-col items-center gap-1.5 p-1.5 text-white text-center w-fit cursor-pointer absolute"
            style={{ left: `${position.xp}rem`, top: `${position.yp}rem` }}
            onMouseDown={(e) => {
                e.target.classList.add("cursor-grabbing");
            }}
            onMouseUp={(e) => {
                e.target.classList.remove("cursor-grabbing");
            }}
        >
            <img src={logo} alt={name} className="w-12 h-12" />
            <p className="text-sm">{name}</p>
        </div>
    );
};

export default ApplicationDesktopIcon;
