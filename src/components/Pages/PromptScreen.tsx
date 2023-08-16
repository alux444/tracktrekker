import React, { useContext, useState } from "react";
import {
    ArtistSeedContext,
    ExtrasContext,
    GenreContext,
    SongSeedContext,
} from "../../App";
import CurrentSearchPage from "./CurrentSearchPage";
import { PromptPageContext } from "./Views";

type PromptProps = {
    setUser: () => void;
    setSong: () => void;
    setArtist: () => void;
    setGenre: () => void;
    setSubmit: () => void;
    setExtra: () => void;
};

const PromptScreen: React.FC<PromptProps> = ({
    setUser,
    setSong,
    setArtist,
    setGenre,
    setSubmit,
    setExtra,
}) => {
    const { promptPage, setPromptPage } = useContext(PromptPageContext);

    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);
    const { extras } = useContext(ExtrasContext);

    const [expandSearch, setExpandSearch] = useState<boolean>(false);
    const [customMode, setCustomMode] = useState<boolean>(false);

    const switchCustomMode = () => {
        if (customMode) {
            setUser();
            setCustomMode(false);
        } else {
            setPromptPage("home");
            setCustomMode(true);
        }
    };

    return (
        <div className="flex flex-wrap flex-col justify-center align-center items-center gap-5 w-full">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1 justify-center text-center items-center">
                    <button className="button3" onClick={switchCustomMode}>
                        {promptPage === "user"
                            ? "To Custom Search"
                            : "To My Top Artists/Songs"}
                    </button>
                    <button
                        className="button2 hfit border-purple-600 border-[1px] w-fit mb-2"
                        onClick={() => setExpandSearch(!expandSearch)}
                    >
                        <div className="grad">
                            <h2>Current Search</h2>
                            <p>
                                {songSeeds.length}{" "}
                                {songSeeds.length === 1 ? "song" : "songs"} |{" "}
                                {artistSeeds.length}{" "}
                                {artistSeeds.length === 1
                                    ? "artist"
                                    : "artists"}{" "}
                                | {genres.length}{" "}
                                {genres.length === 1 ? "genre" : "genres"}
                            </p>
                            <p>{Object.keys(extras).length} extra criteria</p>
                        </div>
                    </button>
                </div>
                {expandSearch && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <CurrentSearchPage />
                        </div>
                    </div>
                )}
                {promptPage !== "user" && (
                    <div className="flex gap-2 flex-wrap justify-center">
                        <button className="button3" onClick={setSong}>
                            <span>Songs</span>
                        </button>
                        <button className="button3" onClick={setArtist}>
                            <span>Artists</span>
                        </button>
                        <button className="button3" onClick={setGenre}>
                            <span>Genres</span>
                        </button>
                        <button className="button3" onClick={setExtra}>
                            <span>Extra</span>
                        </button>
                    </div>
                )}
            </div>
            {genres.length === 0 &&
            songSeeds.length === 0 &&
            artistSeeds.length === 0 ? (
                promptPage === "home" && (
                    <div className="flex flex-col flex-wrap text-center p-1">
                        <h2 className="grad text-lg">
                            Select at least one song, artist or genre.
                        </h2>
                    </div>
                )
            ) : (
                <button className="button1" onClick={setSubmit}>
                    <span className="button1-content">Get results</span>
                </button>
            )}
        </div>
    );
};

export default PromptScreen;
