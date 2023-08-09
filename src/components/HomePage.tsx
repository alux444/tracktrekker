import React, { useContext, useState } from "react";
import useSpotify from "../utils/useSpotify";
import {
    ArtistSeedContext,
    GenreContext,
    SongSeedContext,
    TokenContext,
} from "../App";
import AskForSongs from "./AskFor/AskForSongs";
import AskForArtists from "./AskFor/AskForArtists";
import AskForGenres from "./AskFor/AskForGenres";
import CurrentSearch from "./CurrentSearch";
import AskForExtra from "./AskFor/AskForExtra";
import { RecommendForm } from "../interfaces/recommendForm";
import ResultsPage from "./ResultsPage";

const HomePage = () => {
    const { token, setToken } = useContext(TokenContext);
    const [songSelected, setSongSelected] = useState<boolean>(false);
    const [artistSelected, setArtistSelected] = useState<boolean>(false);
    const [genreSelected, setGenreSelected] = useState<boolean>(false);
    const [extraSelected, setExtraSelected] = useState<boolean>(false);
    const [completedQuery, setCompletedQuery] = useState<boolean>(false);
    const [currentQuery, setCurrentQuery] = useState<RecommendForm>();

    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);

    const generateForm = () => {
        const genreValues: string[] = [];
        genres.filter((genre) => {
            genreValues.push(genre.value);
        });

        const form: RecommendForm = {
            seed_tracks: songSeeds,
            seed_artists: artistSeeds,
            seed_genres: genreValues,
        };

        setCurrentQuery(form);
        setCompletedQuery(true);
        console.log(form);
    };

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

    const alternateExtraSelected = () => {
        setExtraSelected(!extraSelected);
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
                    {!songSelected && (
                        <AskForSongs submit={alternateSongSelect} />
                    )}
                    {songSelected && !artistSelected && (
                        <AskForArtists
                            submit={alternateArtistSelect}
                            goBack={alternateSongSelect}
                        />
                    )}
                    {songSelected && artistSelected && !genreSelected && (
                        <AskForGenres
                            submit={alternateGenreSelected}
                            goBack={alternateArtistSelect}
                        />
                    )}
                    {songSelected &&
                        artistSelected &&
                        genreSelected &&
                        !extraSelected && (
                            <AskForExtra
                                submit={() => {
                                    alternateExtraSelected();
                                    generateForm();
                                }}
                                goBack={alternateGenreSelected}
                            />
                        )}
                    {completedQuery && currentQuery !== undefined && (
                        <ResultsPage
                            query={currentQuery}
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
