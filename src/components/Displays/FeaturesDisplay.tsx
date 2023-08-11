import React from "react";
import { AudioFeatures } from "../../interfaces/audioFeatures";

const FeaturesDisplay = ({
    features,
    popularity,
}: {
    features: AudioFeatures;
    popularity: number;
}) => {
    const totalSeconds = Math.floor(features.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const duration: string = `${minutes}:${seconds}`;

    return (
        <div className="flex flex-col">
            <small>{duration}</small>
            <small>Tempo: {features.tempo.toFixed(0)} BPM</small>
            <small>Popularity: {popularity}</small>
            <small>Acousticness: {features.acousticness.toFixed(2)}</small>
            <small>Danceability: {features.danceability.toFixed(2)}</small>
            <small>Loudness: {features.loudness.toFixed(0)} dB</small>
            <small>Speechiness: {features.speechiness.toFixed(2)}</small>
            <small>
                Instrumentalness: {features.instrumentalness.toFixed(2)}
            </small>
            <small>Liveness: {features.liveness.toFixed(2)}</small>
            <small>Valence: {features.valence.toFixed(2)}</small>
        </div>
    );
};

export default FeaturesDisplay;
