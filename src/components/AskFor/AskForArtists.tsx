import { useContext, useRef } from "react";
import SearchForm from "../Misc/SearchForm";
import VolumeSlider from "../Misc/VolumeSlider";
import { PromptPageContext } from "../Pages/Views";

const AskForArtists = () => {
    const { setPromptPage } = useContext(PromptPageContext);

    const topRef = useRef(null);

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <div
            id="askForArtists"
            className="flex flex-col gap-2 justify-center items-center align-center w-full p-5"
            ref={topRef}
        >
            <h2 className="text-lg grad">Select Artists</h2>
            <div className="flex gap-1 flex-wrap justify-center">
                <button
                    className="button4"
                    onClick={() => setPromptPage("songs")}
                >
                    <span>Songs</span>
                </button>
                <button
                    className="button4"
                    onClick={() => setPromptPage("genres")}
                >
                    <span>Genres</span>
                </button>
            </div>
            <VolumeSlider />
            <SearchForm type="artist" scrollToTop={scrollToTop} />
        </div>
    );
};

export default AskForArtists;
