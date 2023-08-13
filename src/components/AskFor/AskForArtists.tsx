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
                <button className="button1" onClick={submit}>
                    <span className="button1-content">Submit</span>
                </button>
                <button className="button1" onClick={scrollToTop} ref={topRef}>
                    <span className="button1-content">Top</span>
                </button>
            </div>
        </div>
    );
};

export default AskForArtists;
