import React, { ChangeEvent } from "react";

interface CriteriaInputProps {
    value: number;
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    type: "Min" | "Max";
    max: number;
}

const ExtraInputPattern: React.FC<CriteriaInputProps> = ({
    value,
    changeFunction,
    type,
    max,
}) => {
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
