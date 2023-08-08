import React from "react";
import SearchForm from "./SearchForm";

interface AskForArtistsProps {
    submit: () => void;
    goBack: () => void;
}

const AskForArtists: React.FC<AskForArtistsProps> = ({ submit, goBack }) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center p-5">
            <button onClick={goBack}>Back</button>
            <h2>Select Artists (Minimum 1)</h2>
            <SearchForm type="artist" />
            <button className="button1" onClick={submit}>
                <span className="button1-content">Submit</span>
            </button>
        </div>
    );
};

export default AskForArtists;
