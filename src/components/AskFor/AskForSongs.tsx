import { useContext, useRef } from "react";
import SearchForm from "../Misc/SearchForm";
import VolumeSlider from "../Misc/VolumeSlider";
import { PromptPageContext } from "../Pages/Views";

const AskForSongs = () => {
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
            className="flex flex-col gap-2 justify-center items-center align-center w-full p-5"
            ref={topRef}
            id="askForSongs"
        >
            <h2 className="text-lg grad">Select Songs</h2>
            <div className="flex gap-1 flex-wrap justify-center">
                <button
                    className="button4"
                    onClick={() => setPromptPage("artists")}
                >
                    <span>Artists</span>
                </button>
                <button
                    className="button4"
                    onClick={() => setPromptPage("genres")}
                >
                    <span>Genres</span>
                </button>
            </div>
            <VolumeSlider />
            <SearchForm type="track" scrollToTop={scrollToTop} />
        </div>
    );
};

export default AskForSongs;
