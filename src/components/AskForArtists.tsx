import React from "react";
import SearchForm from "./SearchForm";

interface AskForArtistsProps {
    submit: () => void;
    goBack: () => void;
}

const AskForArtists: React.FC<AskForArtistsProps> = ({ submit, goBack }) => {
    return (
        <div>
            <button onClick={goBack}>Back</button>
            <h2>Select Artists (Minimum 1)</h2>
            <SearchForm type="artist" />
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default AskForArtists;
