import { useRef } from "react";
import SearchForm from "../Misc/SearchForm";
import VolumeSlider from "../Misc/VolumeSlider";

interface AskForSongsProps {
    submit: () => void;
}

const AskForSongs = ({ submit }: AskForSongsProps) => {
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
            <VolumeSlider />
            <SearchForm
                type="track"
                scrollToTop={scrollToTop}
                submit={submit}
            />
        </div>
    );
};

export default AskForSongs;
