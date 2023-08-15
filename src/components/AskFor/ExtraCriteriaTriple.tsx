import { ChangeEvent, useContext, useEffect, useState } from "react";
import ExtraInputPattern from "./ExtraInputPattern";
import { ClearOutlined } from "@mui/icons-material";
import { ExtrasContext } from "../../App";
import { ExtraInfo } from "../../interfaces/extrasInfo";

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

    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentDescription, setCurrentDescription] = useState("");

    const [showSelection, setShowSelection] = useState<boolean>(initial);
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
    }, [min, max, targ]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dialogOpen &&
                event.target instanceof Element &&
                !event.target.closest(".dialog-content")
            ) {
                handleDialogClose();
            }
        };

        if (dialogOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [dialogOpen]);

    const handleDialogOpen = (description: string) => {
        setCurrentDescription(description);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

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
        setTarg(max / 2);
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

    return (
        <div className="flex gap-2 justify-center items-center align-center">
            {!showSelection && (
                <div className="flex gap-2">
                    <button
                        onClick={resetSelection}
                        className="button2 border-purple-500 border-[1px]"
                    >
                        <span className="grad">
                            {criteriaName.charAt(0).toUpperCase()}
                            {criteriaName.slice(1)}
                        </span>
                    </button>
                    <button
                        type="button"
                        className="button2 border-[1px] border-purple-500"
                        onClick={() => handleDialogOpen(dialog)}
                    >
                        <span className="grad">?</span>
                    </button>
                </div>
            )}
            {showSelection && (
                <div className="flex flex-col justify-center items-center align-center">
                    <p className="grad">
                        {" "}
                        {criteriaName.charAt(0).toUpperCase()}
                        {criteriaName.slice(1)}
                    </p>
                    <div className="flex flex-col md:flex-row gap-1 items-center">
                        <ExtraInputPattern
                            value={min}
                            changeFunction={handleChangeMin}
                            type="Min"
                            max={maxValue}
                            enable={enableTarget}
                            disable={disableTarget}
                        />
                        <ExtraInputPattern
                            value={max}
                            changeFunction={handleChangeMax}
                            type="Max"
                            max={maxValue}
                            enable={enableTarget}
                            disable={disableTarget}
                        />
                        <ExtraInputPattern
                            value={targ}
                            changeFunction={handleChangeTarg}
                            type="Target"
                            max={maxValue}
                            enable={enableTarget}
                            disable={disableTarget}
                        />
                        <div className="flex md:flex-col gap-2 md:gap-1 items-center">
                            <button
                                onClick={clearSelection}
                                className="buttoncancel h-min"
                            >
                                <ClearOutlined />
                            </button>
                            <button
                                type="button"
                                className="button2 border-[1px] border-purple-500"
                                onClick={() => handleDialogOpen(dialog)}
                            >
                                <span className="grad">?</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <dialog
                className="border-[1px] border-purple-500 rounded-[20px] p-2"
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <div className="dialog-content flex gap-2 text-center items-center align-center justify-center max-w-[80vw]">
                    <p>{currentDescription}</p>
                </div>
            </dialog>
        </div>
    );
};

export default ExtraCriteriaTriple;
