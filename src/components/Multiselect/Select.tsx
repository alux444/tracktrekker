import { ChangeEvent, useEffect, useRef, useState } from "react";
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
    optionsRaw: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, optionsRaw }: SelectProps) {
    const [open, setOpen] = useState<boolean>(true);
    const [highlighted, setHighlighted] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    const containerRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLInputElement>(null);

    const options = optionsRaw.filter((option) =>
        option.label.includes(search.toLowerCase())
    );

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

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
                case "Backspace":
                    setSearch((prevSearch) =>
                        prevSearch.slice(0, prevSearch.length - 1)
                    );
                    break;
                default:
                    if (e.key.match(/^[a-zA-Z]$/)) {
                        setSearch((prevSearch) => prevSearch + e.key);
                    }
            }
        };

        containerRef.current?.addEventListener("keydown", handler);

        return () => {
            containerRef.current?.removeEventListener("keydown", handler);
        };
    }, [open, highlighted, options]);

    useEffect(() => {
        if (open && filterRef.current) {
            filterRef.current.focus();
        }
    }, [open]);

    return (
        <>
            <div className="flex items-center">
                <input
                    ref={filterRef}
                    value={search}
                    onChange={handleSearchChange}
                    className="border-[1px] border-slate-300 p-1 rounded-[7px]"
                    placeholder="Filter Genres"
                />{" "}
                <button className="clear-btn" onClick={() => setSearch("")}>
                    &times;
                </button>
            </div>
            <div
                id="genresMultiselect"
                ref={containerRef}
                onClick={() => setOpen(!open)}
                tabIndex={0}
                className="container"
            >
                <span className="value">
                    {multiple
                        ? value.map((v) => (
                              <button
                                  className="deleteOptionButton option-badge"
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
                            className={`selectOptionButton option ${
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
