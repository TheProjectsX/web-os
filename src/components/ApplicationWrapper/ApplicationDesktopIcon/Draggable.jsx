import { useState, useRef } from "react";

const Draggable = ({
    currentPositions,
    onUpdate = (finalPos) => {},
    runOnDoubleClick = () => {},
    runOnClick = () => {},
    blurOnActive = false,
    children,
}) => {
    const applicationRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const handleMouseDown = (e) => {
        setDragging(true);
        const applicationElm = applicationRef.current;
        const shiftX = e.clientX - applicationElm.getBoundingClientRect().left;
        const shiftY = e.clientY - applicationElm.getBoundingClientRect().top;

        const handleMouseMove = (event) => {
            applicationElm.style.left = `${event.clientX - shiftX}px`;
            applicationElm.style.top = `${event.clientY - shiftY}px`;
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener(
            "mouseup",
            () => {
                setDragging(false);
                document.removeEventListener("mousemove", handleMouseMove);

                const finalPos = applicationElm.getBoundingClientRect();
                onUpdate({
                    x: Number(finalPos.x.toFixed(2)),
                    y: Number(finalPos.y.toFixed(2)),
                });
            },
            { once: true }
        );
    };

    return (
        <div
            ref={applicationRef}
            onMouseDown={handleMouseDown}
            onDoubleClick={runOnDoubleClick}
            onClick={runOnClick}
            className={`w-fit absolute ${
                dragging && blurOnActive ? "opacity-90" : ""
            }`}
            style={{
                left: `${currentPositions.x}px`,
                top: `${currentPositions.y}px`,
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
