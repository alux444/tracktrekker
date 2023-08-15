import { SetStateAction, createContext, useContext, useState } from "react";
import {
    ArtistSeedContext,
    ExtrasContext,
    GenreContext,
    SongSeedContext,
    TokenContext,
} from "../../App";
import AskForSongs from "../AskFor/AskForSongs";
import AskForArtists from "../AskFor/AskForArtists";
import AskForGenres from "../AskFor/AskForGenres";
import AskForExtra from "../AskFor/AskForExtra";
import { RecommendForm } from "../../interfaces/recommendForm";
import ResultsPage from "./ResultsPage";
import LandingPage from "./LandingPage";
import PromptScreen from "./PromptScreen";
import { PromptPageContext } from "./Views";

export const StatsContext = createContext<{
    showStats: boolean;
    setShowStats: React.Dispatch<SetStateAction<boolean>>;
}>({
    showStats: false,
    setShowStats: () => {},
});

const HomePage = () => {
    const { token } = useContext(TokenContext);
    const { promptPage, setPromptPage } = useContext(PromptPageContext);
    const [currentQuery, setCurrentQuery] = useState<RecommendForm>();
    const [showStats, setShowStats] = useState<boolean>(false);

    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);
    const { extras } = useContext(ExtrasContext);

    const generateForm = () => {
        const genreValues: string[] = [];
        genres.filter((genre) => {
            genreValues.push(genre.value);
        });

        const form: RecommendForm = {
            seed_tracks: songSeeds,
            seed_artists: artistSeeds,
            seed_genres: genreValues,
            extras: extras,
        };

        setCurrentQuery(form);
        setPromptPage("results");
        console.log(form);
    };

    const returnToHome = () => {
        setPromptPage("home");
    };

    if (token === null) {
        return <LandingPage />;
    }

    return (
        <StatsContext.Provider value={{ showStats, setShowStats }}>
            <div className="w-full mt-8">
                <div className="flex w-full">
                    <div className="w-[100vw] flex flex-col justify-center items-center">
                        {
                            <PromptScreen
                                setArtist={() => setPromptPage("artists")}
                                setGenre={() => setPromptPage("genres")}
                                setSong={() => setPromptPage("songs")}
                                setExtra={() => setPromptPage("extras")}
                                setSubmit={generateForm}
                            />
                        }
                        {promptPage === "songs" && (
                            <AskForSongs submit={returnToHome} />
                        )}
                        {promptPage === "artists" && (
                            <AskForArtists submit={returnToHome} />
                        )}
                        {promptPage === "genres" && (
                            <AskForGenres submit={returnToHome} />
                        )}
                        {promptPage === "extras" && (
                            <AskForExtra submit={returnToHome} />
                        )}
                        {promptPage === "results" &&
                            currentQuery !== undefined && (
                                <ResultsPage
                                    query={currentQuery}
                                    goBack={returnToHome}
                                />
                            )}
                    </div>
                </div>
            </div>
        </StatsContext.Provider>
    );
};

export default HomePage;
