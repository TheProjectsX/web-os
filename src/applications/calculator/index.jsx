import ApplicationWrapper from "@/components/ApplicationWrapper";
import React, { useEffect, useState } from "react";

export const calculator_metadata = {
    logo: "/application_logo/calculator_pc_application_logo.png",
    name: "Calculator",
    description: "This is a Demo Application, nothing to see!",
    type: "application",
    code: "calculator_application",
    key: "original",
    resize: false,
    draggable: true,
    size: {
        width: 35,
        height: 70,
    },
};

const calculator_application = ({ idx }) => {
    const [values, setValues] = useState({
        input: "",
        result: "",
    });

    useEffect(() => {
        let result = "";

        try {
            result = eval(values.input);
        } catch (error) {}

        setValues((prev) => ({ ...prev, result }));
    }, [values.input]);

    const validInputs = {
        0: "0",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        "+": "+",
        "−": "-",
        "×": "*",
        "÷": "/",
        ".": ".",
    };

    const buttons = [
        "%",
        "CE",
        "C",
        "⌫",
        "⅟x",
        "x²",
        "²√x",
        "÷",
        "7",
        "8",
        "9",
        "×",
        "4",
        "5",
        "6",
        "−",
        "1",
        "2",
        "3",
        "+",
        "+/-",
        "0",
        ".",
        "=",
    ];

    const buttonElements = buttons.map((btn, i) => {
        const isInput = validInputs[btn] !== undefined;

        let onClick;
        if (isInput) {
            onClick = () =>
                setValues((prev) => ({
                    ...prev,
                    input: prev.input + validInputs[btn],
                }));
        } else if (btn === "C") {
            onClick = () =>
                setValues((prev) => ({
                    ...prev,
                    input: "",
                }));
        } else if (btn === "⌫") {
            onClick = () =>
                setValues((prev) => ({
                    ...prev,
                    input: prev.input.slice(0, -1),
                }));
        }

        // else if (btn === "=") {
        //     onClick = () => {
        //         try {
        //             setValues((prev) => ({
        //                 ...prev,
        //                 input: eval(prev.input).toString(),
        //             }));
        //         } catch {
        //             setValues((prev) => ({ ...prev, input: "Error" }));
        //         }
        //     };
        // }

        const isEquals = btn === "=";
        const isDisabled = !onClick;

        return (
            <button
                key={i}
                onClick={onClick}
                disabled={isDisabled}
                className={`rounded-md text-lg py-2 ${
                    isEquals
                        ? "bg-blue-200 active:bg-blue-300 text-black"
                        : "bg-gray-500 active:bg-gray-600"
                } ${isDisabled ? "cursor-not-allowed" : ""}`}
            >
                {btn}
            </button>
        );
    });

    return (
        <ApplicationWrapper metadata={calculator_metadata} idx={idx}>
            <div className="h-full bg-[white] flex flex-col items-center">
                {/* Screen */}
                <div className=" bg-gray-700 w-full text-white text-right flex flex-col items-end px-3 py-4 gap-4">
                    <p className="h-6 line-clamp-1">{values.input}</p>
                    {/* result */}
                    <h4 className="text-4xl font-semibold h-10">
                        {values.result}
                    </h4>
                </div>

                {/* Controllers */}
                <div className="grid grid-cols-4 grid-rows-6 gap-1 w-full flex-grow bg-gray-700 text-white p-1">
                    {buttonElements}
                </div>
            </div>
        </ApplicationWrapper>
    );
};

export default calculator_application;
