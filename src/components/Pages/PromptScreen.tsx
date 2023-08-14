import React from "react";

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
    return (
        <div className="flex flex-wrap flex-col justify-center align-center items-center gap-5 w-full">
            <div>
                <div className="flex flex-col flex-wrap text-center p-3">
                    <h2 className="grad text-lg">
                        Select at least one song, artist or genre.
                    </h2>
                    <h2 className="grad text-md">
                        Then, click results to get song recommendations!
                    </h2>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                    <button
                        className="button2 border-purple-500 border-[1px]"
                        onClick={setSong}
                    >
                        <span className="button2-content grad">Songs</span>
                    </button>
                    <button
                        className="button2 border-purple-500 border-[1px] "
                        onClick={setArtist}
                    >
                        <span className="button2-content grad">Artists</span>
                    </button>
                    <button
                        className="button2 border-purple-500 border-[1px]"
                        onClick={setGenre}
                    >
                        <span className="button2-content grad">Genres</span>
                    </button>
                    <button
                        className="button2 border-purple-500 border-[1px]"
                        onClick={setExtra}
                    >
                        <span className="grad">Extra</span>
                    </button>
                </div>
            </div>
            <button className="button1" onClick={setSubmit}>
                <span className="button1-content">Get results</span>
            </button>
        </div>
    );
};

export default PromptScreen;
