import React from "react";
import { AudioFeatures } from "../../interfaces/audioFeatures";

const FeaturesDisplay = ({ features }: { features: AudioFeatures }) => {
    return (
        <div>
            <small>Acousticness: {features.acousticness}</small>
        </div>
    );
};

export default FeaturesDisplay;
