import React, { useContext, useEffect, useState } from "react";
import { RecommendForm } from "../interfaces/recommendForm";
import { SongInfo } from "../interfaces/songInfo";
import useSpotify from "../utils/useSpotify";
import { TokenContext } from "../App";
import SongDisplay from "./Displays/SongDisplay";

const ResultsPage = ({
    query,
    goBack,
}: {
    query: RecommendForm;
    goBack: any;
}) => {
    const { token } = useContext(TokenContext);
    const { getRecommended } = useSpotify();
    const [songs, setSongs] = useState<SongInfo[]>([]);

    useEffect(() => {
        getSongs();
    }, [query]);

    const getSongs = async () => {
        if (typeof token === "string") {
            const res = await getRecommended(token, query);
            if (res !== null) {
                console.log(res);
                setSongs(res.tracks);
            } else {
                console.log("error getting tracks");
            }
        } else {
            console.log("Not a valid token.");
        }
    };

    const results = songs.map((song) => <SongDisplay songInfo={song} />);

    return (
        <div>
            <h2>results</h2>
            <button onClick={getSongs}>aaa</button>
            <div className="flex gap-2 flex-wrap">{results}</div>
            <button className="button1" onClick={goBack}>
                <span className="button1-content">Back</span>
            </button>
        </div>
    );
};

export default ResultsPage;
