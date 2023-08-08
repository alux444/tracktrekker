import { ChangeEvent, FormEvent, useContext, useState } from "react";
import useSpotify from "../utils/useSpotify";
import { ArtistInfo } from "../interfaces/artistInfo";
import { SongInfo } from "../interfaces/songInfo";
import ArtistDisplay from "./ArtistDisplay";
import SongDisplay from "./SongDisplay";
import { TokenContext } from "../App";

const SearchForm = ({ type }: { type: string }) => {
    const { token } = useContext(TokenContext);

    const [query, setQuery] = useState<string>("");
    const [trackResults, setTrackResults] = useState<SongInfo[]>();
    const [artistReults, setArtistResults] = useState<ArtistInfo[]>();

    const { getSearch } = useSpotify();

    const searchQuery = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await getSearch(token, query);
        setTrackResults(res.tracks.items);
        setArtistResults(res.artists.items);
    };

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const uniqueTracks = trackResults
        ? trackResults.filter(
              (song, index, self) =>
                  index ===
                  self.findIndex(
                      (s) => s.external_ids.isrc === song.external_ids.isrc
                  )
          )
        : [];

    const tracks = uniqueTracks.map((song) => (
        <SongDisplay key={song.external_ids.isrc} songInfo={song} />
    ));

    const artists = artistReults?.map((artist) => (
        <ArtistDisplay key={artist.id} artist={artist} />
    ));

    return (
        <div className="border-2 flex flex-col">
            <form onSubmit={searchQuery}>
                <input type="text" value={query} onChange={handleQueryChange} />
                <button type="submit">Search</button>
            </form>
            <div className="flex gap-4 flex-wrap justify-center p-5">
                {type === "track" ? tracks : artists}
            </div>
        </div>
    );
};

export default SearchForm;
