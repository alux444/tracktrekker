import { useContext, useState } from "react";
import {
    ArtistSeedContext,
    DevContext,
    ExtrasContext,
    GenreContext,
    SongSeedContext,
} from "../../App";
import CurrentSearchPage from "./CurrentSearchPage";
import { PromptPageContext } from "./Views";

const PromptScreen = ({ submit }: { submit: () => void }) => {
    const { devMode } = useContext(DevContext);
    const { promptPage, setPromptPage } = useContext(PromptPageContext);

    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);
    const { extras } = useContext(ExtrasContext);

    const [expandSearch, setExpandSearch] = useState<boolean>(false);

    const switchCustomMode = () => {
        if (promptPage !== "user") {
            setPromptPage("user");
        } else {
            setPromptPage("home");
        }
    };

    return (
        <div className="flex flex-wrap flex-col justify-center align-center items-center gap-5 w-full">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1 justify-center text-center items-center">
                    {devMode && (
                        <button className="button3" onClick={switchCustomMode}>
                            {promptPage === "user"
                                ? "To Custom Search"
                                : "To My Top Artists/Songs"}
                        </button>
                    )}
                    {(songSeeds.length > 0 ||
                        artistSeeds.length > 0 ||
                        genres.length > 0 ||
                        Object.keys(extras).length > 0) && (
                        <button
                            className="button2 hfit border-purple-600 border-[1px] w-fit mb-2"
                            onClick={() => setExpandSearch(!expandSearch)}
                        >
                            <div className="grad">
                                <h2>Current Search</h2>
                                {songSeeds.length === 0 &&
                                artistSeeds.length === 0 &&
                                genres.length === 0 &&
                                Object.keys(extras).length === 0 ? (
                                    <p>Empty</p>
                                ) : (
                                    <>
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
                                        )}{" "}
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
                                                extra criteria
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </button>
                    )}
                </div>
                {(songSeeds.length > 0 ||
                    artistSeeds.length > 0 ||
                    genres.length > 0 ||
                    Object.keys(extras).length > 0) &&
                    expandSearch && (
                        <div className="overlay">
                            <div className="overlay-content">
                                <CurrentSearchPage />
                            </div>
                        </div>
                    )}
                {promptPage !== "user" && (
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button
                            className="button3"
                            onClick={() => setPromptPage("songs")}
                        >
                            <span>Songs</span>
                        </button>
                        <button
                            className="button3"
                            onClick={() => setPromptPage("artists")}
                        >
                            <span>Artists</span>
                        </button>
                        <button
                            className="button3"
                            onClick={() => setPromptPage("genres")}
                        >
                            <span>Genres</span>
                        </button>
                        <button
                            className="button3"
                            onClick={() => setPromptPage("extras")}
                        >
                            <span>Extra</span>
                        </button>
                    </div>
                )}
            </div>
            {genres.length === 0 &&
            songSeeds.length === 0 &&
            artistSeeds.length === 0 ? (
                (promptPage === "home" || promptPage === "user") && (
                    <div className="flex flex-col flex-wrap text-center p-1">
                        <h2 className="grad text-lg">
                            Select at least one song, artist or genre.
                        </h2>
                    </div>
                )
            ) : (
                <button className="button1" onClick={submit}>
                    <span className="button1-content">Get results</span>
                </button>
            )}
        </div>
    );
};

export default PromptScreen;
