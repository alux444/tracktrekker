import { ChangeEvent, useState } from "react";
import ExtraInputPattern from "./ExtraInputPattern";
import { ClearOutlined } from "@mui/icons-material";

const ExtraCriteriaTriple = ({
    criteriaName,
    maxValue,
    dialog,
}: {
    criteriaName: string;
    maxValue: number;
    dialog: string;
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentDescription, setCurrentDescription] = useState("");
    const [showSelection, setShowSelection] = useState<boolean>(false);

    const [min, setMin] = useState<number | undefined>(0);
    const [max, setMax] = useState<number | undefined>(maxValue);
    const [targ, setTarg] = useState<number | undefined>(maxValue / 2);

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

    const resetSelection = () => {
        setShowSelection(true);
        setMin(0);
        setMax(maxValue);
        setTarg(maxValue / 2);
    };

    const clearSelection = () => {
        setMin(undefined);
        setMax(undefined);
        setTarg(undefined);
        setShowSelection(false);
    };

    return (
        <div className="flex gap-2 justify-center items-center align-center">
            {!showSelection && (
                <div className="flex gap-2">
                    <button
                        onClick={resetSelection}
                        className="button2 border-purple-500 border-[1px]"
                    >
                        <span className="grad">{criteriaName}</span>
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
                    <p className="grad">{criteriaName}</p>
                    <div className="flex gap-1 items-center">
                        <ExtraInputPattern
                            value={min}
                            changeFunction={handleChangeMin}
                            type="Min"
                            max={maxValue}
                        />
                        <ExtraInputPattern
                            value={max}
                            changeFunction={handleChangeMax}
                            type="Max"
                            max={maxValue}
                        />
                        <ExtraInputPattern
                            value={targ}
                            changeFunction={handleChangeTarg}
                            type="Target"
                            max={maxValue}
                        />
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
                            ?
                        </button>
                    </div>
                </div>
            )}

            <dialog
                className="border-[1px] p-2"
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <div className="dialog-content flex gap-2 items-center align-center justify-center">
                    <p>{currentDescription}</p>
                    <button onClick={handleDialogClose}>&times;</button>
                </div>
            </dialog>
        </div>
    );
};

export default ExtraCriteriaTriple;
