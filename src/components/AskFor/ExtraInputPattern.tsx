import React, { ChangeEvent } from "react";

interface CriteriaInputProps {
    value: number;
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    type: "Min" | "Max" | "Target";
    max: number;
    enable: () => void;
}

const ExtraInputPattern: React.FC<CriteriaInputProps> = ({
    value,
    changeFunction,
    type,
    max,
    enable,
}) => {
    if (type === "Target" && value === -1) {
        return (
            <button className="button2" onClick={enable}>
                <span className="grad">Enable Target</span>
            </button>
        );
    }

    return (
        <div className="flex gap-1 items-center">
            <div className="p-1 rounded-[10px] flex flex-col items-center justify-center text-center">
                <div className="flex gap-1 items-center p-1">
                    <p>
                        {type}: {value}
                    </p>
                </div>
                <input
                    className="targ"
                    min={0}
                    max={max}
                    step={max / 100}
                    type="range"
                    value={value}
                    onChange={changeFunction}
                />
            </div>
        </div>
    );
};

export default ExtraInputPattern;
