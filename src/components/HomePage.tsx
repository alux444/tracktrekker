import { useContext, useState } from "react";
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
        <div className="w-[80%] h-[80vh]">
            <div className="flex h-full">
                <div className="w-full h-full flex items-center">
                    {!songSelected &&
                        !artistSelected &&
                        !genreSelected &&
                        !extraSelected &&
                        !completedQuery && (
                            <div className="flex flex-col justify-center align-center items-center w-full gap-2 h-full">
                                <button
                                    className="button1"
                                    onClick={() => setSongSelected(true)}
                                >
                                    <span className="button1-content">
                                        Songs
                                    </span>
                                </button>
                                <button
                                    className="button1"
                                    onClick={() => setArtistSelected(true)}
                                >
                                    <span className="button1-content">
                                        Artist
                                    </span>
                                </button>
                                <button
                                    className="button1"
                                    onClick={() => setGenreSelected(true)}
                                >
                                    <span className="button1-content">
                                        Genres
                                    </span>
                                </button>
                                <button
                                    className="button1"
                                    onClick={() => setExtraSelected(true)}
                                >
                                    <span className="button1-content">
                                        Extra
                                    </span>
                                </button>
                                <button
                                    className="button1"
                                    onClick={() => {
                                        setCompletedQuery(true);
                                        generateForm();
                                    }}
                                >
                                    <span className="button1-content">
                                        Get results
                                    </span>
                                </button>
                            </div>
                        )}
                    {songSelected && (
                        <AskForSongs submit={alternateSongSelect} />
                    )}
                    {artistSelected && (
                        <AskForArtists submit={alternateArtistSelect} />
                    )}
                    {genreSelected && (
                        <AskForGenres submit={alternateGenreSelected} />
                    )}
                    {extraSelected && (
                        <AskForExtra submit={alternateExtraSelected} />
                    )}
                    {completedQuery && currentQuery !== undefined && (
                        <ResultsPage
                            query={currentQuery}
                            goBack={() => setCompletedQuery(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
