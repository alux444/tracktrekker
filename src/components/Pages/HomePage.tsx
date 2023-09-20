import { useContext, useState } from "react";
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
import { RecommendForm } from "../../interfaces/recommendForm";
import ResultsPage, { SortOption } from "./ResultsPage";
import LandingPage from "./LandingPage";
import PromptScreen from "./PromptScreen";
import { PromptPageContext } from "./Views";
import UserTopItemsPage from "./UserTopItemsPage";
import { ExtraInfo } from "../../interfaces/extrasInfo";

const HomePage = () => {
    const { token } = useContext(TokenContext);
    const { promptPage, setPromptPage } = useContext(PromptPageContext);
    const [currentQuery, setCurrentQuery] = useState<RecommendForm>();
    const [queryFilters, setQueryFilters] = useState<number>(0);

    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);
    const { extras, setExtras } = useContext(ExtrasContext);

    const generateForm = () => {
        const genreValues: string[] = [];
        genres.filter((genre) => {
            genreValues.push(genre.value);
        });

        setQueryFilters(Object.keys(extras).length);

        const form: RecommendForm = {
            seed_tracks: songSeeds,
            seed_artists: artistSeeds,
            seed_genres: genreValues,
            extras: extras,
        };

        setCurrentQuery(form);
        setPromptPage("results");
    };

    const changeSort = (sortBy: SortOption) => {
        const key = sortBy.sortBy;

        const max: number = sortBy.sortBy == "popularity" ? 100 : 1;
        if (currentQuery) {
            const newExtras: ExtraInfo = extras;

            if (key === "none") {
                for (const extraKey in newExtras) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            newExtras,
                            extraKey
                        )
                    ) {
                        if (newExtras[extraKey]) {
                            newExtras[extraKey].target = -1;
                        }
                    }
                }
            } else {
                if (!newExtras[key]) {
                    newExtras[key] = {
                        min: 0,
                        max: max,
                        target: sortBy.descending ? max : 0,
                    };
                } else {
                    newExtras[key]!.target = sortBy.descending ? max : 0;
                }
            }

            setExtras(newExtras);
            generateForm();
            return;
        }
    };

    const returnToSongs = () => {
        setPromptPage("songs");
    };

    if (token === null) {
        return <LandingPage />;
    }

    return (
        <div className="w-full mt-8">
            <div className="flex w-full">
                <div className="w-[100vw] flex flex-col justify-between items-center">
                    {<PromptScreen submit={generateForm} />}
                    {promptPage === "user" && <UserTopItemsPage />}
                    {promptPage === "songs" && <AskForSongs />}
                    {promptPage === "artists" && <AskForArtists />}
                    {promptPage === "genres" && <AskForGenres />}
                    {promptPage === "results" && currentQuery !== undefined && (
                        <ResultsPage
                            query={currentQuery}
                            goBack={returnToSongs}
                            filters={queryFilters}
                            changeSort={changeSort}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
