import SearchForm from "../SearchForm";

interface AskForSongsProps {
    submit: () => void;
}

const AskForSongs = ({ submit }: AskForSongsProps) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center p-5">
            <h2>Select Songs (Minimum 1)</h2>
            <SearchForm type="track" />
            <button className="button1" onClick={submit}>
                <span className="button1-content">Submit</span>
            </button>
        </div>
    );
};

export default AskForSongs;
