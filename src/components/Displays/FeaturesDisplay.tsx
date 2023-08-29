import { useContext, useEffect, useRef, useState } from "react";
import { AudioFeatures } from "../../interfaces/audioFeatures";
import FeatureLevel from "./FeatureLevel";
import useOutsideClick from "../../utils/useOutsideClose";
import { SongInfo } from "../../interfaces/songInfo";
import SongDisplay from "./SongDisplay";
import StatsBar from "./StatsBar";
import { ExtrasContext } from "../../App";
import { ExtraInfo } from "../../interfaces/extrasInfo";

const FeaturesDisplay = ({
    features,
    onClose,
    songInfo,
}: {
    features: AudioFeatures;
    onClose: () => void;
    songInfo: SongInfo;
}) => {
    const { extras } = useContext(ExtrasContext);
    const [filters, setFilters] = useState<ExtraInfo>({});

    useEffect(() => {
        setFilters(extras);
        console.log(extras);
    }, []);

    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div
                ref={modalRef}
                className="bg-white flex flex-col p-2 rounded-lg shadow-md flex items-center w-[90vw] lg:w-[60vw] xl:w-[45vw] z-10 max-h-[90vh] overflow-auto"
            >
                <div className="flex flex-col gap-1 items-center w-full">
                    <SongDisplay songInfo={songInfo} />
                </div>
                <div className="flex gap-1 h-[300px] border-2">
                    <StatsBar
                        scale={1}
                        value={features.energy}
                        filters={filters}
                        type={"energy"}
                    />
                </div>
                <div className="flex flex-col lg:flex-row justify-between w-full p-1">
                    <div className="flex flex-col align-center">
                        <div className="flex justify-between items-center">
                            <small>Energy: {features.energy.toFixed(2)}</small>
                            <FeatureLevel
                                inputVal={features.energy}
                                gap={0.1}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-between">
                                <small>Popularity: {songInfo.popularity}</small>
                            </div>
                            <FeatureLevel
                                inputVal={songInfo.popularity}
                                gap={10}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <small>
                                Acousticness: {features.acousticness.toFixed(2)}
                            </small>
                            <FeatureLevel
                                inputVal={features.acousticness}
                                gap={0.1}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <small>
                                Danceability: {features.danceability.toFixed(2)}
                            </small>
                            <FeatureLevel
                                inputVal={features.danceability}
                                gap={0.1}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <small>
                                Speechiness: {features.speechiness.toFixed(2)}
                            </small>
                            <FeatureLevel
                                inputVal={features.speechiness}
                                gap={0.1}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <small>
                                Instrumentalness:{" "}
                                {features.instrumentalness.toFixed(2)}
                            </small>
                            <FeatureLevel
                                inputVal={features.instrumentalness}
                                gap={0.1}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <small>
                                Liveness: {features.liveness.toFixed(2)}
                            </small>
                            <FeatureLevel
                                inputVal={features.liveness}
                                gap={0.1}
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <small>
                                Valence: {features.valence.toFixed(2)}
                            </small>
                            <FeatureLevel
                                inputVal={features.valence}
                                gap={0.1}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturesDisplay;
