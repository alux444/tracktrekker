import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ExtrasContext } from "../../App";
import { ExtraInfo } from "../../interfaces/extrasInfo";
import "./multislider.css";

type MinMaxDouble = [number, number];

const ExtraCriteriaTriple = ({
    criteriaName,
    maxValue,
    dialog,
}: {
    criteriaName: keyof ExtraInfo;
    maxValue: 1 | 100;
    dialog: string;
}) => {
    const { extras, setExtras } = useContext(ExtrasContext);

    const initial: boolean = criteriaName in extras;

    const criteria = extras?.[criteriaName];

    const initialMinMax: MinMaxDouble = criteria
        ? [criteria.min, criteria.max]
        : [0, maxValue];

    const [showSelection, setShowSelection] = useState<boolean>(initial);
    const [showDesc, setShowDesc] = useState<boolean>(false);
    const [min, setMin] = useState<number>(initialMinMax[0]);
    const [max, setMax] = useState<number>(initialMinMax[1]);

    useEffect(() => {
        const initial = criteriaName in extras;
        const criteria = extras?.[criteriaName];
        const initialMinMax: MinMaxDouble = criteria
            ? [criteria.min, criteria.max]
            : [0, maxValue];
        setShowSelection(initial);
        setMin(initialMinMax[0]);
        setMax(initialMinMax[1]);
    }, [extras]);

    const updateForm = () => {
        const updatedExtras: ExtraInfo = { ...extras };

        if (!showSelection) {
            return;
        }

        updatedExtras[criteriaName] = {
            min: min,
            max: max,
        };

        setExtras(updatedExtras);
    };

    useEffect(() => {
        const timer = setTimeout(updateForm, 500);
        return () => clearTimeout(timer);
    }, [min, max, showSelection]);

    const handleChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        const val: number = parseFloat(e.target.value);
        if (val < max) {
            setMin(parseFloat(e.target.value));
        } else {
            setMin(max - (maxValue === 1 ? 0.01 : 1));
        }
    };

    const handleChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        const val: number = parseFloat(e.target.value);
        if (val > min) {
            setMax(parseFloat(e.target.value));
        } else {
            setMax(min + (maxValue === 1 ? 0.01 : 1));
        }
    };

    const resetSelection = () => {
        setShowSelection(true);
        const updatedExtras: ExtraInfo = { ...extras };
        updatedExtras[criteriaName] = {
            min: min,
            max: max,
        };

        setExtras(updatedExtras);
    };

    const clearSelection = () => {
        setShowSelection(false);
        const updatedExtras = { ...extras };
        delete updatedExtras[criteriaName];
        setExtras(updatedExtras);
    };

    return (
        <div className="flex flex-col items-center text-center w-full">
            <div className="flex gap-2 justify-center items-center align-center">
                {!showSelection && (
                    <div className="flex gap-1 items-center">
                        <button onClick={resetSelection} className="button2">
                            <span className="grad">
                                Enable {criteriaName.charAt(0).toUpperCase()}
                                {criteriaName.slice(1)} Filter
                            </span>
                        </button>
                        <button
                            className="buttonquestion"
                            onClick={() => setShowDesc(!showDesc)}
                        >
                            ?
                        </button>
                    </div>
                )}
                {showSelection && (
                    <div className="flex flex-col justify-center items-center align-center">
                        <div className="flex flex-col gap-1 items-center p-">
                            <div className="flex gap-1 items-center">
                                <p className="grad text-lg">
                                    {" "}
                                    {criteriaName.charAt(0).toUpperCase()}
                                    {criteriaName.slice(1)}
                                </p>
                                <button
                                    className="buttonquestion"
                                    onClick={() => setShowDesc(!showDesc)}
                                >
                                    ?
                                </button>
                            </div>

                            <div className="flex gap-1 pt-1 items-center">
                                <button
                                    onClick={clearSelection}
                                    className="buttoncancel h-min"
                                >
                                    Disable Filter
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 items-center">
                            <div className="flex flex-col items-center">
                                <p>
                                    Range:{" "}
                                    {maxValue === 1
                                        ? (min * 100).toFixed(0)
                                        : min}{" "}
                                    -{" "}
                                    {maxValue === 1
                                        ? (max * 100).toFixed(0)
                                        : max}
                                </p>
                                <div className="range-slider flex h-[30px] mt-[20px] w-[200px] lg:w-[300px]">
                                    <input
                                        className="min"
                                        type="range"
                                        step={maxValue / 100}
                                        max={maxValue}
                                        value={min}
                                        onChange={handleChangeMin}
                                    />
                                    <input
                                        className="max"
                                        type="range"
                                        step={maxValue / 100}
                                        max={maxValue}
                                        value={max}
                                        onChange={handleChangeMax}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showDesc && <p className="mt-1 flex flex-wrap">{dialog}</p>}
        </div>
    );
};

export default ExtraCriteriaTriple;
