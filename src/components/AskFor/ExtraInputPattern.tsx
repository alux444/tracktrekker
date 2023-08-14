import React, { ChangeEvent } from "react";

interface CriteriaInputProps {
    value: number | undefined;
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    type: "Min" | "Max" | "Target";
    max: number;
}

const ExtraInputPattern: React.FC<CriteriaInputProps> = ({
    value,
    changeFunction,
    type,
    max,
}) => {
    return (
        <div className="border-[1px] p-1 rounded-[10px] flex flex-col justify-center text-center">
            <p>
                {type} {value}
            </p>
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
