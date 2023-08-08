import { useState } from "react";
import "./select.css";

export type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = {
    options: SelectOption[];
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div
            onClick={() => setOpen(true)}
            onBlur={() => setOpen(!open)}
            tabIndex={0}
            className="container"
        >
            <span className="value">{value?.label}</span>
            <button className="clear-btn">&times;</button>
            <div className="divider"></div>
            <div className="caret"></div>

            <ul className={`options ${open ? "show" : ""}`}>
                {options.map((option) => (
                    <li key={option.value} className="option">
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
