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
        <SongDisplay
            key={song.external_ids.isrc}
            songInfo={song}
            fromSearch={true}
        />
    ));

    const artists = artistReults?.map((artist) => (
        <ArtistDisplay key={artist.id} artist={artist} />
    ));

    return (
        <div className="flex flex-col p-2">
            <form
                className="flex flex-col gap-2 items-center"
                onSubmit={searchQuery}
            >
                <input
                    className="border-2 w-[40vw]"
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                />
                <button className="button1 w-[20vw]" type="submit">
                    <span className="button1-content">Search</span>
                </button>
            </form>
            <div className="p-5 block h-[50vh] overflow-auto">
                {type === "track" ? tracks : artists}
            </div>
        </div>
    );
};

export default SearchForm;
