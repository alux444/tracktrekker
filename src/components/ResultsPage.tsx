import { useEffect, useState } from "react";
import { RecommendForm } from "../interfaces/recommendForm";
import { SongInfo } from "../interfaces/songInfo";
import useSpotify from "../utils/useSpotify";
import SongDisplay from "./Displays/SongDisplay";

const ResultsPage = ({
    query,
    goBack,
}: {
    query: RecommendForm;
    goBack: () => void;
}) => {
    const { getRecommended } = useSpotify();
    const [songs, setSongs] = useState<SongInfo[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        getSongs();
    }, [query]);

    const getSongs = async () => {
        const res = await getRecommended(query);

        if (res === 1) {
            setMessage(
                "You need to select one artist, song or genre to search."
            );
            return;
        }

        if (res === 2) {
            setMessage(
                "Sorry... there were no matches for your search.Maybe your tracks/artists were too obscure, or your search was too complicated"
            );
        }

        console.log(res);
        setSongs(res.tracks);
    };

    const results = songs.map((song) => (
        <SongDisplay songInfo={song} type={3} />
    ));

    return (
        <div className="h-full flex flex-col items-center align-center w-full gap-2">
            <h2>Results</h2>
            <button className="button1" onClick={goBack}>
                <span className="button1-content">Back</span>
            </button>
            <button className="button1" onClick={getSongs}>
                <span className="button1-content">Reroll</span>
            </button>
            {songs.length > 0 ? (
                <div className="p-5 block h-[50vh] overflow-auto">
                    {results}
                </div>
            ) : (
                <div>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;
