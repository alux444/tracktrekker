import React from "react";
import ExtraCriteriaTriple from "./ExtraCriteriaTriple";

interface AskForExtrasProps {
    submit: () => void;
}

const descriptions = {
    acousticness:
        "A measure of how acoustic a track is, where 1 is most acoustic.",
    danceability:
        "A measure of how well a track is suited for dancing, where 1 is most dancable.",
    energy: "A measure of intensity and activity of the track, where 1 is most intense",
    instrumentalness:
        "A measure of the instrumentalness of the track. Values above 0.5 likely contain no vocals.",
    liveness:
        "A measure of the probability of the track being performed live. Values above 0.8 are likely live recordings.",
    loudness:
        "A measure of the overall loudness of a track in dB. Values typically range from -60 to 0 dB.",
    popularity:
        "A measure of the popularity of a track, where 100 is most popular",
    speechiness:
        "A measure of presence of spoken word in the track. Values above 0.66 are likely all spoken words, and values under 0.33 likely have no speech.",
    tempo: "Estimated Beats per Minute of a track.",
    valence:
        "A measure of the positiveness of a track, where 1 is most cheerful or euphoric sounding.",
};

const AskForExtra: React.FC<AskForExtrasProps> = ({ submit }) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5">
            <h2 className="text-lg grad">Extra Criteria (Optional)</h2>
            <button
                className="button2 border-[1px] border-purple-500"
                onClick={submit}
            >
                <span className="grad">Hide</span>
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
                    criteriaName="liveliness"
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
