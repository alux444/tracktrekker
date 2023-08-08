import { ChangeEvent, useState } from "react";
import useSpotify from "../utils/useSpotify";

const SearchForm = ({ token }: { token: string }) => {
    const [query, setQuery] = useState<string>("");
    const [type, setType] = useState<string>("track");

    const { getSearch } = useSpotify();

    const searchQuery = () => {
        getSearch(token, query, type);
    };

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const switchTypes = () => {
        if (type === "track") {
            setType("artist");
        } else {
            setType("track");
        }
    };

    return (
        <div className="border-2 flex flex-col">
            <input type="text" value={query} onChange={handleQueryChange} />
            <div className="flex gap-2">
                <small>
                    You are searching for:{" "}
                    {type === "track" ? "Songs" : "Artists"}
                </small>
                <button onClick={switchTypes}>
                    Change to {type === "track" ? "Artists" : "Songs"}
                </button>
            </div>
            <button onClick={searchQuery}>aa</button>
        </div>
    );
};

export default SearchForm;
