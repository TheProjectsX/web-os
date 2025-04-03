import React from "react";

const MouseSelect = ({ info }) => {
    if (info.start.x === info.end.x && info.start.y === info.end.y) {
        return <></>;
    }

    return (
        <div
            className="bg-blue-500/40 absolute border border-blue-600"
            style={{
                left: `${info.start.x}px`,
                top: `${info.start.y}px`,

                width: `${info.end.x - info.start.x}px`,
                height: `${info.end.y - info.start.y}px`,
            }}
        ></div>
    );
};

export default MouseSelect;
