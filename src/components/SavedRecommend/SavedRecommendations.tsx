import { useContext, useEffect, useState } from "react";
import useSpotify from "../../utils/useSpotify";
import { SongInfo } from "../../interfaces/songInfo";
import SongDisplay from "../Displays/SongDisplay";
import { DevContext } from "../../App";

const SavedRecommendations = () => {
    const { songCart } = useContext(DevContext);
    const { getSavedRecommendations } = useSpotify();
    const [results, setResults] = useState<SongInfo[]>([]);

    useEffect(() => {
        const getResults = async () => {
            const res = await getSavedRecommendations();
            if (res == 2) {
                setResults([]);
            }
            setResults(res.tracks);
        };
        getResults();
    }, [songCart]);

    const recommendedTracks = results.map((song) => (
        <SongDisplay songInfo={song} statsButton={true} key={song.id} />
    ));

    return (
        <div className="px-5 flex w-[95%] flex-col w-screen md:w-[70vw] lg:w-[60vw] xl:w-[50vw]">
            {recommendedTracks}
        </div>
    );
};

export default SavedRecommendations;
