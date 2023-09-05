import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ExtrasContext } from "../../App";
import { ExtraInfo } from "../../interfaces/extrasInfo";
import "./multislider.css";

type MinMaxTargConfig = [number, number, number];

const ExtraCriteriaTriple = ({
    criteriaName,
    maxValue,
    dialog,
}: {
    criteriaName: keyof ExtraInfo;
    maxValue: number;
    dialog: string;
}) => {
    const { extras, setExtras } = useContext(ExtrasContext);

    const initial: boolean = criteriaName in extras;

    const criteria = extras?.[criteriaName];

    const initialMinMaxTarg: MinMaxTargConfig = criteria
        ? [criteria.min, criteria.max, criteria.target ? criteria.target : -1]
        : [0, maxValue, -1];

    const [showSelection, setShowSelection] = useState<boolean>(initial);
    const [showDesc, setShowDesc] = useState<boolean>(false);
    const [min, setMin] = useState<number>(initialMinMaxTarg[0]);
    const [max, setMax] = useState<number>(initialMinMaxTarg[1]);
    const [targ, setTarg] = useState<number>(initialMinMaxTarg[2]);

    useEffect(() => {
        const initial = criteriaName in extras;
        const criteria = extras?.[criteriaName];
        const initialMinMaxTarg: MinMaxTargConfig = criteria
            ? [criteria.min, criteria.max, criteria.target]
            : [0, maxValue, -1];
        setShowSelection(initial);
        setMin(initialMinMaxTarg[0]);
        setMax(initialMinMaxTarg[1]);
        setTarg(initialMinMaxTarg[2]);
    }, [extras]);

    const updateForm = () => {
        const updatedExtras: ExtraInfo = { ...extras };

        if (!showSelection) {
            return;
        }

        updatedExtras[criteriaName] = {
            min: min,
            max: max,
            target: targ,
        };

        setExtras(updatedExtras);
    };

    useEffect(() => {
        updateForm();
    }, [min, max, targ, showSelection]);

    const handleChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
        setMin(parseFloat(e.target.value));
    };

    const handleChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(parseFloat(e.target.value));
    };

    const handleChangeTarg = (e: ChangeEvent<HTMLInputElement>) => {
        setTarg(parseFloat(e.target.value));
    };

    const enableTarget = () => {
        const val: number = parseFloat(
            Math.abs((max - min) / 2 + min).toFixed(maxValue == 1 ? 2 : 0)
        );
        setTarg(val);
    };

    const disableTarget = () => {
        setTarg(-1);
    };

    const resetSelection = () => {
        setShowSelection(true);
        const updatedExtras: ExtraInfo = { ...extras };
        updatedExtras[criteriaName] = {
            min: min,
            max: max,
            target: targ,
        };

        setExtras(updatedExtras);
    };

    const clearSelection = () => {
        setShowSelection(false);
        const updatedExtras = { ...extras };
        delete updatedExtras[criteriaName];
        setExtras(updatedExtras);
    };

    const handleSliderClickNoTarg = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const sliderWidth = rect.width;
        const minValuePosition = (min / maxValue) * sliderWidth;
        const maxValuePosition = (max / maxValue) * sliderWidth;
        const distanceToMin = Math.abs(clickX - minValuePosition).toFixed(
            maxValue == 1 ? 2 : 0
        );
        const distanceToMax = Math.abs(clickX - maxValuePosition).toFixed(
            maxValue == 1 ? 2 : 0
        );

        if (parseFloat(distanceToMin) < parseFloat(distanceToMax)) {
            const val: string = ((clickX / sliderWidth) * maxValue).toFixed(
                maxValue == 1 ? 2 : 0
            );
            const res = parseFloat(val);
            setMin(res);
        } else {
            const val: string = ((clickX / sliderWidth) * maxValue).toFixed(
                maxValue == 1 ? 2 : 0
            );
            const res = parseFloat(val);
            setMax(res);
        }
    };

    const handleSliderClickWithTarg = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const sliderWidth = rect.width;

        const minValuePosition = (min / maxValue) * sliderWidth;
        const midValuePosition = (targ / maxValue) * sliderWidth;
        const maxValuePosition = (max / maxValue) * sliderWidth;

        const distanceToMin = Math.abs(clickX - minValuePosition).toFixed(
            maxValue === 1 ? 2 : 0
        );
        const distanceToMid = Math.abs(clickX - midValuePosition).toFixed(
            maxValue === 1 ? 2 : 0
        );
        const distanceToMax = Math.abs(clickX - maxValuePosition).toFixed(
            maxValue === 1 ? 2 : 0
        );

        if (
            parseFloat(distanceToMin) < parseFloat(distanceToMid) &&
            parseFloat(distanceToMin) < parseFloat(distanceToMax)
        ) {
            const val = ((clickX / sliderWidth) * maxValue).toFixed(
                maxValue === 1 ? 2 : 0
            );
            const res = parseFloat(val);
            setMin(res);
        } else if (parseFloat(distanceToMid) < parseFloat(distanceToMax)) {
            const val = ((clickX / sliderWidth) * maxValue).toFixed(
                maxValue === 1 ? 2 : 0
            );
            const res = parseFloat(val);
            setTarg(res);
        } else {
            const val = ((clickX / sliderWidth) * maxValue).toFixed(
                maxValue === 1 ? 2 : 0
            );
            const res = parseFloat(val);
            setMax(res);
        }
    };

    return (
        <div className="flex flex-col items-center text-center w-full">
            <div className="flex gap-2 justify-center items-center align-center">
                {!showSelection && (
                    <div className="flex gap-1 flex-col items-center">
                        <button onClick={resetSelection} className="button2">
                            <span className="grad">
                                Enable {criteriaName.charAt(0).toUpperCase()}
                                {criteriaName.slice(1)} Filter
                            </span>
                        </button>
                        <button
                            className="buttonprev"
                            onClick={() => setShowDesc(!showDesc)}
                        >
                            What is {criteriaName}?
                        </button>
                    </div>
                )}
                {showSelection && (
                    <div className="flex flex-col justify-center items-center align-center">
                        <div className="flex flex-col gap-1 items-center p-1">
                            <p className="grad">
                                {" "}
                                {criteriaName.charAt(0).toUpperCase()}
                                {criteriaName.slice(1)}
                            </p>

                            <div className="flex gap-1 items-center">
                                <button
                                    onClick={clearSelection}
                                    className="buttoncancel h-min"
                                >
                                    Disable Filter
                                </button>
                                {targ !== -1 ? (
                                    <button
                                        onClick={disableTarget}
                                        className="buttoncancel h-fit"
                                    >
                                        Disable Target
                                    </button>
                                ) : (
                                    <button
                                        onClick={enableTarget}
                                        className="buttonselect h-fit"
                                    >
                                        Enable Target
                                    </button>
                                )}
                                <button
                                    className="buttonprev"
                                    onClick={() => setShowDesc(!showDesc)}
                                >
                                    Description
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 items-center">
                            <div className="flex flex-col items-center">
                                <p>
                                    Range: {min} - {max}
                                </p>
                                {targ !== -1 && <p>Target: {targ}</p>}
                                <div
                                    className="range-slider flex h-[30px]"
                                    onClick={
                                        targ == -1
                                            ? handleSliderClickNoTarg
                                            : handleSliderClickWithTarg
                                    }
                                >
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
                                    {targ !== -1 && (
                                        <input
                                            className="targ"
                                            type="range"
                                            step={maxValue / 100}
                                            max={maxValue}
                                            value={targ}
                                            onChange={handleChangeTarg}
                                        />
                                    )}
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
