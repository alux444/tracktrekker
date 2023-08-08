import React, { useContext, useState } from "react";
import { recommendForm } from "../interfaces/recommendForm";
import useSpotify from "../utils/useSpotify";
import SongDisplay from "./SongDisplay";
import { SongInfo } from "../interfaces/songInfo";
import CriteriaForm from "./CriteriaForm";
import SearchForm from "./SearchForm";
import { TokenContext } from "../App";

const HomePage = () => {
    const { token, setToken } = useContext(TokenContext);

    const [songForm, setSongForm] = useState<recommendForm>({
        seed_artists: "2OxyMQXlbUfE4zpHG3fwqk",
        seed_genres: "hardstyle",
        seed_tracks: "0c6xIDDpzE81m2q797ordA",
    });
    const [songs, setSongs] = useState<SongInfo[]>([]);

    const { getAccessToken, getArtistData, getRecommended } = useSpotify();

    const setAccessToken = async () => {
        const token: string | null = await getAccessToken();
        if (token !== null) {
            console.log(token);
            setToken(token);
        } else {
            console.log("error getting token");
        }
    };

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
        <div className="flex gap-2 flex-col">
            {token === null ? (
                <button onClick={setAccessToken}>Get Token</button>
            ) : (
                <>
                    <button onClick={() => getArtistData(token)}>artist</button>
                    <button onClick={getSongs}>get songs</button>
                    <SearchForm token={token} />
                    <CriteriaForm />
                    <div className="flex gap-4 flex-wrap justify-between p-5">
                        {results}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
