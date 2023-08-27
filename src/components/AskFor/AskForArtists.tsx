import { useRef } from "react";
import SearchForm from "../Misc/SearchForm";
import VolumeSlider from "../Misc/VolumeSlider";

const AskForArtists = () => {
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
            <VolumeSlider />
            <SearchForm type="artist" scrollToTop={scrollToTop} />
        </div>
    );
};

export default AskForArtists;
