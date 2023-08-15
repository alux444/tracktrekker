import React, { useRef } from "react";
import SearchForm from "../Misc/SearchForm";

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
            <SearchForm
                type="artist"
                scrollToTop={scrollToTop}
                submit={submit}
            />
        </div>
    );
};

export default AskForArtists;
