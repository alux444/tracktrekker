import { useRef } from "react";
import SearchForm from "../SearchForm";

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
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5">
            <h2 className="text-lg grad">Select Songs</h2>
            <SearchForm type="track" />
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

export default AskForSongs;
