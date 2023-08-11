import React from "react";

interface CriteriaInputProps {
    label: string;
    value: number | undefined;
    changeFunction: (value: number | undefined) => void;
    type: "Min" | "Max" | "Target";
}

const ExtraInputPattern: React.FC<CriteriaInputProps> = ({
    label,
    value,
    changeFunction,
    type,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseInt(e.target.value);
        changeFunction(inputValue || undefined);
    };
    return (
        <div>
            <input
                className="border-[1px]"
                type="number"
                placeholder={`${type} ${label}`}
                value={value || ""}
                onChange={handleChange}
            />
        </div>
    );
};

export default ExtraInputPattern;
