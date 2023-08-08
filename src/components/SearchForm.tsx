import { ChangeEvent, useState } from "react";
import useSpotify from "../utils/useSpotify";
import { ArtistInfo } from "../interfaces/artistInfo";
import { SongInfo } from "../interfaces/songInfo";
import ArtistDisplay from "./ArtistDisplay";
import SongDisplay from "./SongDisplay";

const SearchForm = ({ token }: { token: string }) => {
    const [query, setQuery] = useState<string>("");
    const [type, setType] = useState<string>("track");
    const [trackResults, setTrackResults] = useState<SongInfo[]>();
    const [artistReults, setArtistResults] = useState<ArtistInfo[]>();

    const { getSearch } = useSpotify();

    const searchQuery = async () => {
        const res = await getSearch(token, query);
        setTrackResults(res.tracks.items);
        setArtistResults(res.artists.items);
    };

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const switchTypes = () => {
        const newType = type === "track" ? "artist" : "track";
        setType(newType);
    };

    const tracks = trackResults?.map((song) => (
        <SongDisplay key={song.external_ids.isrc} songInfo={song} />
    ));

    const artists = artistReults?.map((artist) => (
        <ArtistDisplay key={artist.id} artist={artist} />
    ));

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
            <div className="flex gap-4 flex-wrap justify-between p-5">
                {type === "track" ? tracks : artists}
            </div>
        </div>
    );
};

export default SearchForm;
