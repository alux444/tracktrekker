import React from "react";

interface AskForGenresProps {
    submit: () => void;
    goBack: () => void;
}
const AskForGenres: React.FC<AskForGenresProps> = ({ submit, goBack }) => {
    return (
        <div>
            <button onClick={goBack}>Back</button>
            <h2>Select Genres (Minimum 1)</h2>
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default AskForGenres;
