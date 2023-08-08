import React, { useContext, useEffect, useState } from "react";
import { RecommendForm } from "../interfaces/recommendForm";
import { SongInfo } from "../interfaces/songInfo";
import useSpotify from "../utils/useSpotify";
import { TokenContext } from "../App";
import SongDisplay from "./Displays/SongDisplay";

const ResultsPage = ({ query }: { query: RecommendForm }) => {
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

    return (
        <div>
            <h2>results</h2>
            <div className="flex gap-2 flex-wrap">{results}</div>
        </div>
    );
};

export default ResultsPage;
