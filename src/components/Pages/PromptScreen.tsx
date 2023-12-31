import { useContext, useState } from "react";
import {
    ArtistSeedContext,
    LoginContext,
    ExtrasContext,
    GenreContext,
    SongSeedContext,
} from "../../App";
import CurrentSearchPage from "./CurrentSearchPage";
import { PromptPageContext } from "./Views";
import TutorialModal from "../Tutorial/TutorialModal";
import AskForExtra from "../AskFor/AskForExtra";

const PromptScreen = ({ submit }: { submit: () => void }) => {
    const { loginMode } = useContext(LoginContext);
    const { promptPage, setPromptPage } = useContext(PromptPageContext);

    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);
    const { extras } = useContext(ExtrasContext);

    const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
    const [expandSearch, setExpandSearch] = useState<boolean>(false);
    const [expandTutorial, setExpandTutorial] = useState<boolean>(false);

    const switchCustomMode = () => {
        if (promptPage !== "user") {
            setPromptPage("user");
        } else {
            setPromptPage("songs");
        }
    };

    const closeTutorial = () => {
        setExpandTutorial(false);
    };

    const closeSearch = () => {
        setExpandSearch(false);
    };

    return (
        <div className="flex flex-wrap flex-col justify-center align-center items-center gap-2 w-full">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1 justify-center text-center items-center">
                    <button
                        className="button2 border-[1px] border-purple-700 my-2"
                        onClick={() => {
                            setExpandTutorial(true);
                        }}
                    >
                        <span className="grad">How to use TrackTrekker</span>
                    </button>
                    {expandTutorial && (
                        <TutorialModal onClose={closeTutorial} />
                    )}
                    {loginMode && (
                        <button className="button2" onClick={switchCustomMode}>
                            {promptPage === "user"
                                ? "To Custom Search"
                                : "To My Top Artists/Songs"}
                        </button>
                    )}
                    {(songSeeds.length > 0 ||
                        artistSeeds.length > 0 ||
                        genres.length > 0 ||
                        Object.keys(extras).length > 0) && (
                        <div>
                            <div className="items-center align-center flex flex-col">
                                <h2 className="grad">Your Search</h2>
                                <div className="flex gap-1 justify-center items-center mb-1">
                                    {songSeeds.length > 0 && (
                                        <p>
                                            {songSeeds.length}{" "}
                                            {songSeeds.length === 1
                                                ? "song"
                                                : "songs"}
                                        </p>
                                    )}
                                    {artistSeeds.length > 0 && (
                                        <p>
                                            {artistSeeds.length}{" "}
                                            {artistSeeds.length === 1
                                                ? "artist"
                                                : "artists"}{" "}
                                        </p>
                                    )}
                                    {genres.length > 0 && (
                                        <p>
                                            {genres.length}{" "}
                                            {genres.length === 1
                                                ? "genre"
                                                : "genres"}
                                        </p>
                                    )}
                                    {Object.keys(extras).length > 0 && (
                                        <p>
                                            {Object.keys(extras).length}{" "}
                                            {Object.keys(extras).length === 1
                                                ? "filter"
                                                : "filters"}
                                        </p>
                                    )}
                                </div>
                                <button
                                    className="button2 hfit border-purple-600 border-[1px] w-fit mb-1"
                                    id="expandSearchBtn"
                                    onClick={() =>
                                        setExpandSearch(!expandSearch)
                                    }
                                >
                                    <div className="grad">
                                        <h2>View Search</h2>
                                        {songSeeds.length === 0 &&
                                            artistSeeds.length === 0 &&
                                            genres.length === 0 &&
                                            Object.keys(extras).length ===
                                                0 && <p>Empty</p>}
                                    </div>
                                </button>
                                <button
                                    className="button2 hfit w-fit mb-1"
                                    id="expandFiltersBtn"
                                    onClick={() => setOpenFilterModal(true)}
                                >
                                    <span className="grad">Manage Filters</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {(songSeeds.length > 0 ||
                    artistSeeds.length > 0 ||
                    genres.length > 0 ||
                    Object.keys(extras).length > 0) &&
                    expandSearch && (
                        <div className="overlay">
                            <div className="overlay-content">
                                <CurrentSearchPage onClose={closeSearch} />
                            </div>
                        </div>
                    )}
            </div>

            {(genres.length !== 0 ||
                songSeeds.length !== 0 ||
                artistSeeds.length !== 0) && (
                <button
                    id="getResultsButton"
                    className="button1"
                    onClick={submit}
                >
                    <span className="button1-content">Get results</span>
                </button>
            )}
            {songSeeds.length + artistSeeds.length + genres.length > 5 && (
                <p className="px-3 text-center text-lightred">
                    Your search is above the recommended 5 combined total of
                    songs, artists and genres.
                </p>
            )}
            {openFilterModal && (
                <AskForExtra onClose={() => setOpenFilterModal(false)} />
            )}
        </div>
    );
};

export default PromptScreen;
