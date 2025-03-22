// Icons
import { LuMinus } from "react-icons/lu";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const ApplicationBody = ({
    handleMinimizeWindow,
    handleMaximizeWindow,
    handleCloseApplication,
    pid,
    title,
    children,
}) => {
    return (
        <div
            data-name="application-window"
            className="bg-gray-500 rounded-md overflow-hidden border-[0.5px] border-gray-400 w-full h-full"
        >
            {/* Top Bar */}
            <div
                onDoubleClick={() => handleMaximizeWindow(pid)}
                data-name="application-top-bar"
                className="flex justify-between items-center bg-gray-600 application-top-bar"
            >
                {/* Here can be custom top bar items of the applications */}
                <div className="px-4">
                    <p className="text-white font-semibold">{title}</p>
                </div>

                {/* Controls */}
                <div className="">
                    {/* Minimize Button */}
                    <button
                        className="text-white w-12 h-10 cursor-default hover:bg-white/20"
                        title="Minimize"
                        onClick={() => handleMinimizeWindow(pid)}
                    >
                        <p className="flex items-center justify-center text-md">
                            <LuMinus />
                        </p>
                    </button>

                    {/* Maximize Button */}
                    <button
                        className="text-white w-12 h-10 cursor-default hover:bg-white/20"
                        title="Maximize"
                        onClick={() => handleMaximizeWindow(pid)}
                    >
                        <p className="flex items-center justify-center text-md">
                            <MdCheckBoxOutlineBlank />
                        </p>
                    </button>

                    {/* Close Button */}
                    <button
                        className="text-white w-12 h-10 cursor-default hover:bg-red-500"
                        title="Close"
                        onClick={() => handleCloseApplication(pid)}
                    >
                        <p className="flex items-center justify-center text-lg">
                            <RxCross2 />
                        </p>
                    </button>
                </div>
            </div>

            <div
                data-name="application-body"
                className="select-none pointer-events-none z-50"
            >
                {children}
            </div>
        </div>
    );
};

export default ApplicationBody;
