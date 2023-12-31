import React, { useRef } from "react";
import ExtraCriteriaTriple from "./ExtraCriteriaTriple";
import { descriptions } from "../../utils/descriptions";
import useOutsideClick from "../../utils/useOutsideClose";

interface AskForExtrasProps {
    onClose: () => void;
}

const AskForExtra: React.FC<AskForExtrasProps> = ({ onClose }) => {
    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-screen h-screen">
            <div
                ref={modalRef}
                className="bg-dark3 flex flex-col p-3 gap-2 rounded-lg shadow-md flex items-center w-fit max-h-[90vh] max-w-[90vw] overflow-auto relative"
            >
                <button
                    className="absolute top-2 right-3 cursor-pointer"
                    onClick={onClose}
                >
                    <span>&times;</span>
                </button>
                <div className="flex flex-col text-center text-wrap justify-center w-full">
                    <h2 className="text-lg grad">Manage Filters</h2>
                    <p>
                        All search results will be filtered to be within your
                        min to max range.
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <ExtraCriteriaTriple
                        criteriaName="popularity"
                        maxValue={100}
                        dialog={descriptions.popularity}
                    />

                    <ExtraCriteriaTriple
                        criteriaName="energy"
                        maxValue={1}
                        dialog={descriptions.energy}
                    />

                    <ExtraCriteriaTriple
                        criteriaName="acousticness"
                        maxValue={1}
                        dialog={descriptions.acousticness}
                    />

                    <ExtraCriteriaTriple
                        criteriaName="danceability"
                        maxValue={1}
                        dialog={descriptions.danceability}
                    />

                    <ExtraCriteriaTriple
                        criteriaName="happiness"
                        maxValue={1}
                        dialog={descriptions.happiness}
                    />
                </div>
            </div>
        </div>
    );
};

export default AskForExtra;
