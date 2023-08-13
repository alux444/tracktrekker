import React, { useRef } from "react";
import SearchForm from "../SearchForm";

interface AskForArtistsProps {
    submit: () => void;
}

const AskForArtists: React.FC<AskForArtistsProps> = ({ submit }) => {
    const topRef = useRef(null);

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <div
            className="flex flex-col gap-2 justify-center items-center align-center w-full p-5"
            ref={topRef}
        >
            <h2 className="text-lg grad">Select Artists</h2>
            <SearchForm type="artist" />
            <div className="flex gap-2">
                <button
                    className="button2 border-purple-500 border-[1px] "
                    onClick={scrollToTop}
                    ref={topRef}
                >
                    <span className="grad">Top</span>
                </button>
                <button
                    className="button2 border-purple-500 border-[1px] "
                    onClick={submit}
                >
                    <span className="grad">Hide</span>
                </button>
            </div>
        </div>
    );
};

export default AskForArtists;
