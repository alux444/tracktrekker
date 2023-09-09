import { useEffect, useState } from "react";
import useSpotify from "../../utils/useSpotify";
import { SongInfo } from "../../interfaces/songInfo";
import SongDisplay from "../Displays/SongDisplay";

const SavedRecommendations = () => {
    const { getSavedRecommendations } = useSpotify();
    const [results, setResults] = useState<SongInfo[]>([]);

    const getResults = async () => {
        const res = await getSavedRecommendations();
        if (res == 2) {
            setResults([]);
        }
        setResults(res.tracks);
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
        <div className="px-5 mt-1 flex w-[95%] flex-col items-center w-screen md:w-[70vw] lg:w-[60vw] xl:w-[50vw]">
            <button className="button2 w-fit" onClick={rerollSearch}>
                <span className="grad">Reroll</span>
            </button>
            {recommendedTracks}
        </div>
    );
};

export default SavedRecommendations;
