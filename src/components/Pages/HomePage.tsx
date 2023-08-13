import { SetStateAction, createContext, useContext, useState } from "react";
import {
    ArtistSeedContext,
    GenreContext,
    SongSeedContext,
    TokenContext,
} from "../../App";
import AskForSongs from "../AskFor/AskForSongs";
import AskForArtists from "../AskFor/AskForArtists";
import AskForGenres from "../AskFor/AskForGenres";
import AskForExtra from "../AskFor/AskForExtra";
import { RecommendForm } from "../../interfaces/recommendForm";
import ResultsPage from "../ResultsPage";
import LandingPage from "./LandingPage";

export const StatsContext = createContext<{
    showStats: boolean;
    setShowStats: React.Dispatch<SetStateAction<boolean>>;
}>({
    showStats: false,
    setShowStats: () => {},
});

const HomePage = () => {
    const { token } = useContext(TokenContext);
    const [songSelected, setSongSelected] = useState<boolean>(false);
    const [artistSelected, setArtistSelected] = useState<boolean>(false);
    const [genreSelected, setGenreSelected] = useState<boolean>(false);
    const [extraSelected, setExtraSelected] = useState<boolean>(false);
    const [completedQuery, setCompletedQuery] = useState<boolean>(false);
    const [currentQuery, setCurrentQuery] = useState<RecommendForm>();
    const [showStats, setShowStats] = useState<boolean>(false);

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

    if (token === null) {
        return <LandingPage />;
    }

    return (
        <StatsContext.Provider value={{ showStats, setShowStats }}>
            <div className="w-[80%] h-[80vh] w-full">
                <div className="flex h-full w-full">
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
                                    {/* <button
                                    className="button1"
                                    onClick={() => setExtraSelected(true)}
                                >
                                    <span className="button1-content">
                                        Extra
                                    </span>
                                </button> */}
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
        </StatsContext.Provider>
    );
};

export default HomePage;
