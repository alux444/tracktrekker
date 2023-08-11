import { AudioFeatures } from "../../interfaces/audioFeatures";
import FeatureLevel from "./FeatureLevel";

const FeaturesDisplay = ({
    features,
    popularity,
}: {
    features: AudioFeatures;
    popularity: number;
}) => {
    const totalSeconds = Math.floor(features.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const duration: string = `${minutes}:${seconds}`;

    return (
        <div className="flex lg:flex-col justify-between w-full">
            <div className="flex flex-col align-center">
                <small>{duration}</small>
                <small>{features.tempo.toFixed(0)} BPM</small>
                <div className="flex justify-between">
                    <small>LOUD: {features.loudness.toFixed(0)} dB</small>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between">
                        <small>POPULARITY: {popularity}</small>
                    </div>
                    <FeatureLevel inputVal={popularity} gap={10} />
                </div>
                <div className="flex justify-between items-center">
                    <small>ACOUSTIC: {features.acousticness.toFixed(2)}</small>
                    <FeatureLevel inputVal={features.acousticness} gap={0.1} />
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center">
                    <small>DANCE: {features.danceability.toFixed(2)}</small>
                    <FeatureLevel inputVal={features.danceability} gap={0.1} />
                </div>

                <div className="flex justify-between items-center">
                    <small>SPEECH: {features.speechiness.toFixed(2)}</small>
                    <FeatureLevel inputVal={features.speechiness} gap={0.1} />
                </div>
                <div className="flex justify-between items-center">
                    <small>
                        INSTRUM: {features.instrumentalness.toFixed(2)}
                    </small>
                    <FeatureLevel
                        inputVal={features.instrumentalness}
                        gap={0.1}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <small>LIVENESS: {features.liveness.toFixed(2)}</small>
                    <FeatureLevel inputVal={features.liveness} gap={0.1} />
                </div>
                <div className="flex justify-between items-center">
                    <small>VALENCE: {features.valence.toFixed(2)}</small>
                    <FeatureLevel inputVal={features.valence} gap={0.1} />
                </div>
            </div>
        </div>
    );
};

export default FeaturesDisplay;
