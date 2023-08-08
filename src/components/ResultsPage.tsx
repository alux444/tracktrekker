import React, { useContext, useState } from "react";
import { recommendForm } from "../interfaces/recommendForm";
import { SongInfo } from "../interfaces/songInfo";
import useSpotify from "../utils/useSpotify";
import { TokenContext } from "../App";
import SongDisplay from "./Displays/SongDisplay";

const ResultsPage = () => {
    const { token } = useContext(TokenContext);
    const { getRecommended } = useSpotify();

    const [songForm, setSongForm] = useState<recommendForm>({
        seed_artists: "2OxyMQXlbUfE4zpHG3fwqk",
        seed_genres: "hardstyle",
        seed_tracks: "0c6xIDDpzE81m2q797ordA",
    });
    const [songs, setSongs] = useState<SongInfo[]>([]);

    const getSongs = async () => {
        if (typeof token === "string") {
            const res = await getRecommended(token, songForm);
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

    const results = songs.map((song) => (
        <SongDisplay key={song.external_ids.isrc} songInfo={song} />
    ));

    return (
        <div>
            <h2>results</h2>
            <div className="flex gap-2 flex-wrap">{results}</div>
        </div>
    );
};

export default ResultsPage;
