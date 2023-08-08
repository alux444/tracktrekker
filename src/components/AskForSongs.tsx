import SearchForm from "./SearchForm";

interface AskForSongsProps {
    submit: () => void;
}

const AskForSongs = ({ submit }: AskForSongsProps) => {
    return (
        <div>
            <h2>Select Songs (Minimum 1)</h2>
            <SearchForm type="track" />
            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default AskForSongs;
