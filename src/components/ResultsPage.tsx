import { useContext, useEffect, useRef, useState } from "react";
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

    const topRef = useRef(null);

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    const getSongs = async () => {
        const res = await getRecommended(query);

        if (res === 1) {
            setMessage(
                "You need to select one artist, song or genre to search."
            );
            return;
        }

        setMessage(
            "Sorry... there were no matches for your search. Maybe your tracks/artists were too obscure, or your search was too complicated"
        );

        console.log(res);
        setSongs(res.tracks);
    };

    useEffect(() => {
        getSongs();
    }, [query]);

    const results = songs.map((song) => (
        <SongDisplay songInfo={song} type={3} />
    ));

    return (
        <div className="h-full flex flex-col items-center align-center gap-2 mt-12">
            <h2 className="grad text-xl">Search Results</h2>
            <p className="grad">
                Searching for {query.seed_tracks.length}{" "}
                {query.seed_tracks.length === 1 ? "song" : "songs"},{" "}
                {query.seed_artists.length}{" "}
                {query.seed_artists.length === 1 ? "artist" : "artists"},{" "}
                {query.seed_genres.length}{" "}
                {query.seed_genres.length === 1 ? "genre" : "genres"}
            </p>
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
                <button className="button3" onClick={goBack} ref={topRef}>
                    <span>Hide</span>
                </button>
            </div>
            {songs.length > 0 ? (
                <div className="flex flex-col justify-center w-[100vw] items-center">
                    <div className="p-5 flex w-full flex-col gap-2">
                        {results}
                    </div>
                    <button
                        className="button2 border-purple-500 border-[1px]"
                        onClick={scrollToTop}
                        ref={topRef}
                    >
                        <span className="grad">Top</span>
                    </button>
                </div>
            ) : (
                <div className="flex text-center p-3">
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default ResultsPage;
