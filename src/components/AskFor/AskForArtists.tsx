import React from "react";
import SearchForm from "../SearchForm";

interface AskForArtistsProps {
    submit: () => void;
}

const AskForArtists: React.FC<AskForArtistsProps> = ({ submit }) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5 h-[50vh] ">
            <h2 className="text-lg grad">Select Artists</h2>
            <SearchForm type="artist" />
            <div className="flex gap-2">
                <button className="button1" onClick={submit}>
                    <span className="button1-content">Submit</span>
                </button>
            </div>
        </div>
    );
};

export default AskForArtists;
