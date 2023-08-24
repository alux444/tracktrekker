import { useRef } from "react";
import { AudioFeatures } from "../../interfaces/audioFeatures";
import FeatureLevel from "./FeatureLevel";
import useOutsideClick from "../../utils/useOutsideClose";
import { SongInfo } from "../../interfaces/songInfo";
import SmallSongDisplay from "./SmallSongDisplay";

const FeaturesDisplay = ({
    features,
    onClose,
    songInfo,
}: {
    features: AudioFeatures;
    onClose: () => void;
    songInfo: SongInfo;
}) => {
    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);

    const totalSeconds = Math.floor(features.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const duration: string = `${minutes}:${seconds}`;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div
                ref={modalRef}
                className="bg-white flex flex-col p-2 rounded-lg shadow-md flex justify-center items-center align-center max-w-[90vw] z-10"
            >
                <div className="flex flex-col gap-1 items-center">
                    <SmallSongDisplay song={songInfo} />
                </div>
                <div className="flex justify-between w-full p-1">
                    <div className="flex flex-col align-center">
                        <small>{duration}</small>
                        <small>{features.tempo.toFixed(0)} BPM</small>
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
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <small>
                                Danceability: {features.danceability.toFixed(2)}
                            </small>
                            <FeatureLevel
                                inputVal={features.danceability}
                                gap={0.1}
                            />
                        </div>

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
