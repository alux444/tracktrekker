import React from "react";
import ExtraCriteriaTriple from "./ExtraCriteriaTriple";
import { descriptions } from "../../utils/descriptions";

interface AskForExtrasProps {
    submit: () => void;
}

const AskForExtra: React.FC<AskForExtrasProps> = ({ submit }) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5">
            <div className="flex flex-col text-center text-wrap justify-center">
                <h2 className="text-lg grad">Extra Criteria (Optional)</h2>
                <small>
                    All search results will be FILTERED to be within your min to
                    max range.
                </small>
                <small>
                    With target, results will be SORTED based on CLOSEST to your
                    given target.
                </small>
            </div>
            <button className="button3 mb-2" onClick={submit}>
                <span>Hide</span>
            </button>
            <div className="flex flex-col gap-2">
                <ExtraCriteriaTriple
                    criteriaName="popularity"
                    maxValue={100}
                    dialog={descriptions.popularity}
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
                    criteriaName="energy"
                    maxValue={1}
                    dialog={descriptions.energy}
                />
                <ExtraCriteriaTriple
                    criteriaName="instrumentalness"
                    maxValue={1}
                    dialog={descriptions.instrumentalness}
                />
                <ExtraCriteriaTriple
                    criteriaName="liveness"
                    maxValue={1}
                    dialog={descriptions.liveness}
                />
                <ExtraCriteriaTriple
                    criteriaName="speechiness"
                    maxValue={1}
                    dialog={descriptions.speechiness}
                />
                <ExtraCriteriaTriple
                    criteriaName="valence"
                    maxValue={1}
                    dialog={descriptions.valence}
                />
            </div>
        </div>
    );
};

export default AskForExtra;
