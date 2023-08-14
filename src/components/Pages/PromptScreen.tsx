import React, { useContext, useState } from "react";
import { ArtistSeedContext, GenreContext, SongSeedContext } from "../../App";
import CurrentSearchPage from "./CurrentSearchPage";

type PromptProps = {
    setSong: () => void;
    setArtist: () => void;
    setGenre: () => void;
    setSubmit: () => void;
    setExtra: () => void;
};

const PromptScreen: React.FC<PromptProps> = ({
    setSong,
    setArtist,
    setGenre,
    setSubmit,
    setExtra,
}) => {
    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);

    const [expandSearch, setExpandSearch] = useState<boolean>(false);

    return (
        <div className="flex flex-wrap flex-col justify-center align-center items-center gap-5 w-full">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col flex-wrap text-center p-3">
                    <h2 className="grad text-lg">
                        Select at least one song, artist or genre.
                    </h2>
                    <h2 className="grad text-md">
                        Then, click results to get song recommendations!
                    </h2>
                </div>
                <div className="flex flex-col justify-center text-center items-center">
                    <button
                        className="button1 w-fit"
                        onClick={() => setExpandSearch(!expandSearch)}
                    >
                        <div className="button1-content">
                            <h2>Current Search</h2>
                            <p>
                                {songSeeds.length} song(s) |{" "}
                                {artistSeeds.length} artist(s) | {genres.length}{" "}
                                genre(s)
                            </p>
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
            </div>
            <button
                className="button1"
                onClick={setSubmit}
                disabled={
                    genres.length === 0 &&
                    songSeeds.length === 0 &&
                    artistSeeds.length === 0
                }
            >
                <span className="button1-content">
                    {genres.length === 0 &&
                    songSeeds.length === 0 &&
                    artistSeeds.length === 0
                        ? "Select Song/Artist/Genre for results"
                        : "Get results"}
                </span>
            </button>
        </div>
    );
};

export default PromptScreen;
