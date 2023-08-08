import React, { useContext, useState } from "react";
import useSpotify from "../utils/useSpotify";
import { TokenContext } from "../App";
import AskForSongs from "./AskForSongs";
import AskForArtists from "./AskForArtists";
import AskForGenres from "./AskForGenres";
import CurrentSearch from "./CurrentSearch";

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

    if (token === null) {
        return (
            <button className="button1" onClick={setAccessToken}>
                <span className="button1-content">Get Started</span>
            </button>
        );
    }

    return (
        <div className="w-full h-full">
            <div className="flex">
                <div className="w-[80%]  border-2 max-h-[80vh]">
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
                <div className="w-[20%] border-2 max-h-[80vh]">
                    <CurrentSearch />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
