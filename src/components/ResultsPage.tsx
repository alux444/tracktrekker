import { useContext, useEffect, useState } from "react";
import { RecommendForm } from "../interfaces/recommendForm";
import { SongInfo } from "../interfaces/songInfo";
import useSpotify from "../utils/useSpotify";
import SongDisplay from "./Displays/SongDisplay";
import { StatsContext } from "./Pages/HomePage";

const ResultsPage = ({
    query,
    goBack,
}: {
    query: RecommendForm;
    goBack: () => void;
}) => {
    const { showStats, setShowStats } = useContext(StatsContext);
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
            <button className="button1" onClick={goBack}>
                <span className="button1-content">Back</span>
            </button>
            <div className="flex gap-2">
                <button
                    className="button2 border-purple-500 border-[1px]"
                    onClick={getSongs}
                >
                    <span className="grad">Reroll</span>
                </button>
                <button
                    className="button2 border-purple-500 border-[1px]"
                    type="button"
                    onClick={() => setShowStats(!showStats)}
                >
                    <span className="grad">
                        {showStats ? "Hide Stats" : "Show Stats"}
                    </span>
                </button>
            </div>
            {songs.length > 0 ? (
                <div className="p-5 flex w-full flex-col gap-2 h-[50vh] overflow-auto">
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
