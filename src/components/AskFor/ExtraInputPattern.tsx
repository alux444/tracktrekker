import React, { ChangeEvent } from "react";

interface CriteriaInputProps {
    value: number | undefined;
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    type: "Min" | "Max" | "Target";
    max: number;
    enable: () => void;
    disable: () => void;
}

const ExtraInputPattern: React.FC<CriteriaInputProps> = ({
    value,
    changeFunction,
    type,
    max,
    enable,
    disable,
}) => {
    if (type === "Target" && value === -1) {
        return (
            <button
                className="button2 border-purple-500 border-[1px]"
                onClick={enable}
            >
                <span className="grad">Enable Target</span>
            </button>
        );
    }

    return (
        <div className="border-[1px] p-1 rounded-[10px] flex flex-col items-center justify-center text-center">
            <div className="flex gap-1 items-center p-1">
                <p className={`${value === undefined && "text-red-500"}`}>
                    {value === undefined
                        ? "Target Disabled"
                        : type + ":" + value}
                </p>
                {type === "Target" && value !== undefined && (
                    <button onClick={disable} className="buttoncancel">
                        &times;
                    </button>
                )}
            </div>
            <input
                className="border-[1px]"
                min={0}
                max={max}
                step={max / 100}
                type="range"
                value={value}
                onChange={changeFunction}
            />
        </div>
    );
};

export default ExtraInputPattern;
