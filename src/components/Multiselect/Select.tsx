import { useEffect, useRef, useState } from "react";
import "./select.css";

export type SelectOption = {
    label: string;
    value: string;
};

type MultipleSelectProps = {
    multiple: true;
    value: SelectOption[];
    onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
    multiple?: false;
    value?: SelectOption;
    onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [highlighted, setHighlighted] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const clearOptions = () => {
        multiple ? onChange([]) : onChange(undefined);
    };

    const selectOption = (option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter((o) => o != option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) {
                onChange(option);
            }
        }
    };

    const isSelected = (option: SelectOption) => {
        return multiple ? value.includes(option) : option === value;
    };

    useEffect(() => {
        if (open) {
            setHighlighted(0);
        }
    }, [open]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target !== containerRef.current) return;
            switch (e.code) {
                case "Enter":
                case "Space":
                    setOpen((prev) => !prev);
                    if (open) selectOption(options[highlighted]);
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    if (!open) {
                        setOpen(true);
                    } else {
                        const newValue =
                            highlighted + (e.code === "ArrowDown" ? 1 : -1);
                        if (newValue >= 0 && newValue < options.length) {
                            setHighlighted(newValue);
                        }
                    }
                    break;
                case "Escape":
                    setOpen(false);
                    break;
                default:
                    break;
            }
        };

        containerRef.current?.addEventListener("keydown", handler);

        return () => {
            containerRef.current?.removeEventListener("keydown", handler);
        };
    }, [open, highlighted, options]);

    return (
        <>
            <div>
                <label>Filter</label>
            </div>
            <div
                ref={containerRef}
                onFocus={() => setOpen(true)}
                onClick={() => setOpen(true)}
                onBlur={() => setOpen(!open)}
                tabIndex={0}
                className="container"
            >
                <span className="value">
                    {multiple
                        ? value.map((v) => (
                              <button
                                  className="option-badge"
                                  key={v.value}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      selectOption(v);
                                  }}
                              >
                                  {v.label}{" "}
                                  <span className="remove-btn">&times;</span>
                              </button>
                          ))
                        : value?.label}
                </span>
                <button
                    className="clear-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        clearOptions();
                    }}
                >
                    &times;
                </button>

                <ul className={`options ${open ? "show" : ""}`}>
                    {options.map((option, index) => (
                        <li
                            onMouseEnter={() => setHighlighted(index)}
                            onClick={(e) => {
                                e.stopPropagation();
                                selectOption(option);
                                setOpen(false);
                            }}
                            key={option.value}
                            className={`option ${
                                isSelected(option) ? "selected" : ""
                            } ${index === highlighted ? "highlighted" : ""}`}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
