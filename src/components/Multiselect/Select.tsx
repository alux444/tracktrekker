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
        if (open && filterRef.current) {
            filterRef.current.focus();
        }
    }, [open]);

    return (
        <div className="h-[20em] items-center flex flex-col gap-1">
            <div className="flex items-center">
                <input
                    ref={filterRef}
                    value={search}
                    onChange={handleSearchChange}
                    className="border-[1px] border-slate-300 bg-dark3 p-1 rounded-[7px] mr-1"
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
                    {options.length > 0 ? (
                        options.map((option, index) => (
                            <li
                                onMouseEnter={() => setHighlighted(index)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    selectOption(option);
                                }}
                                key={option.value}
                                className={`selectOptionButton option ${
                                    isSelected(option) ? "selected" : ""
                                } ${
                                    index === highlighted ? "highlighted" : ""
                                }`}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="selectOptionsButton option">
                            No results for your search.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
