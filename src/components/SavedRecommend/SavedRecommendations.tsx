import { useContext, useEffect, useState } from "react";
import useSpotify from "../../utils/useSpotify";
import { SongInfo } from "../../interfaces/songInfo";
import SongDisplay from "../Displays/SongDisplay";
import { AudioContext } from "../Pages/Views";

type NameAndArtist = {
    name: string;
    artist: string;
};

const SavedRecommendations = ({ error }: { error: boolean }) => {
    const { audio, setAudioIsPlaying } = useContext(AudioContext);
    const { getSavedRecommendations, getFeatures } = useSpotify();
    const [results, setResults] = useState<SongInfo[]>([]);
    const [songSearched, setSongSearched] = useState<NameAndArtist>();
    const [message, setMessage] = useState<boolean>(false);

    useEffect(() => {
        if (audio !== null) {
            audio.pause();
            setAudioIsPlaying(false);
        }
    }, [results]);

    const getResults = async () => {
        const res = await getSavedRecommendations();
        setMessage(false);
        if (res == -1 || res == null) {
            setResults([]);
            setMessage(true);
            return;
        }
        const songIds = res.res.map((song) => song.id).join(",");
        const features = await getFeatures(songIds);
        if (features) {
            for (let i = 0; i < features.audio_features.length; i++) {
                res.res[i].features = features.audio_features[i];
            }
        }
        setResults(res.res);
        setSongSearched({ name: res.songName, artist: res.artist });
    };

    useEffect(() => {
        getResults();
    }, []);

    const rerollSearch = async () => {
        getResults();
    };

    const recommendedTracks = results.map((song) => (
        <SongDisplay songInfo={song} statsButton={true} key={song.id} />
    ));

    return (
        <div className="px-5 mt-1 flex w-[95%] flex-col flex-wrap text-center gap-1 items-center w-screen md:w-[70vw] lg:w-[60vw] xl:w-[50vw]">
            <button className="button2 w-fit" onClick={rerollSearch}>
                <span className="grad">Reroll</span>
            </button>
            {songSearched && (
                <>
                    <p>
                        {error ? "But b" : "B"}ecause you saved{" "}
                        <span className="grad">{songSearched.name}</span> by{" "}
                        <span className="grad">{songSearched.artist}</span>
                    </p>
                    <p>You may like:</p>
                </>
            )}
            {message && <p>Click reroll!</p>}
            {recommendedTracks}
        </div>
    );
};

export default SavedRecommendations;
