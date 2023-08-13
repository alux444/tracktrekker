import { ChangeEvent, FormEvent, useContext, useState } from "react";
import useSpotify from "../utils/useSpotify";
import { ArtistInfo } from "../interfaces/artistInfo";
import { SongInfo } from "../interfaces/songInfo";
import ArtistDisplay from "./Displays/ArtistDisplay";
import SongDisplay from "./Displays/SongDisplay";
import { StatsContext } from "./Pages/HomePage";

const SearchForm = ({ type }: { type: string }) => {
    const { showStats, setShowStats } = useContext(StatsContext);

    const [query, setQuery] = useState<string>("");
    const [trackResults, setTrackResults] = useState<SongInfo[]>([]);
    const [artistReults, setArtistResults] = useState<ArtistInfo[]>([]);

    const { getSearch } = useSpotify();

    const searchQuery = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await getSearch(query);
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
        <SongDisplay key={song.external_ids.isrc} songInfo={song} type={1} />
    ));

    const artists = artistReults.map((artist) => (
        <ArtistDisplay
            key={artist.id}
            artist={artist}
            fromSearch={true}
            type={1}
        />
    ));

    return (
        <div className="flex flex-col p-2 w-[90vw]">
            <form
                className="flex flex-col gap-2 items-center"
                onSubmit={searchQuery}
            >
                <input
                    placeholder={
                        type === "track"
                            ? "Search for Song"
                            : "Search for Artist"
                    }
                    className="input w-[280px]"
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                ></input>
                <div className="flex gap-2 justify-center mb-2">
                    <button
                        className="button2 border-purple-500 border-[1px]"
                        type="submit"
                    >
                        <span className="grad">Search</span>
                    </button>
                    <button
                        className="button2 border-purple-500 border-[1px]"
                        type="button"
                        onClick={() => setShowStats(!showStats)}
                    >
                        <span className="grad">
                            {showStats ? "Hide Stats" : "Show Stats"}
                        </span>
                    </button>
                </div>
            </form>

            {type === "track" && uniqueTracks.length > 0 && (
                <div className="p-5 flex flex-col h-[35vh] overflow-auto gap-3">
                    {tracks}
                </div>
            )}

            {type !== "track" && artistReults.length > 0 && (
                <div className="flex flex-wrap gap-3 h-[35vh] justify-center overflow-auto">
                    {artists}
                </div>
            )}
        </div>
    );
};

export default SearchForm;
