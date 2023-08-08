import React, { useContext, useState } from "react";
import useSpotify from "../utils/useSpotify";
import { TokenContext } from "../App";
import AskForSongs from "./AskForSongs";
import AskForArtists from "./AskForArtists";
import AskForGenres from "./AskForGenres";

const HomePage = () => {
    const { token, setToken } = useContext(TokenContext);
    const [songSelected, setSongSelected] = useState<boolean>(false);
    const [artistSelected, setArtistSelected] = useState<boolean>(false);
    const [genreSelected, setGenreSelected] = useState<boolean>(false);

    const { getAccessToken } = useSpotify();

    const alternateSongSelect = () => {
        setSongSelected(!songSelected);
    };

    const alternateArtistSelect = () => {
        setArtistSelected(!artistSelected);
    };

    const alternateGenreSelected = () => {
        setGenreSelected(!genreSelected);
    };

    const setAccessToken = async () => {
        const token: string | null = await getAccessToken();
        if (token !== null) {
            console.log(token);
            setToken(token);
        } else {
            console.log("error getting token");
        }
    };

    return (
        <div className="flex gap-2 flex-col">
            {token === null && (
                <button onClick={setAccessToken}>Get Token</button>
            )}
            {token !== null && !songSelected && (
                <AskForSongs submit={alternateSongSelect} />
            )}
            {token !== null && songSelected && !artistSelected && (
                <AskForArtists
                    submit={alternateArtistSelect}
                    goBack={alternateSongSelect}
                />
            )}
            {token !== null &&
                songSelected &&
                artistSelected &&
                !genreSelected && (
                    <AskForGenres
                        submit={alternateArtistSelect}
                        goBack={alternateGenreSelected}
                    />
                )}
        </div>
    );
};

export default HomePage;
