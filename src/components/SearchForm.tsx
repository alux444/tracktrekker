import { ChangeEvent, FormEvent, createContext, useState } from "react";
import useSpotify from "../utils/useSpotify";
import { ArtistInfo } from "../interfaces/artistInfo";
import { SongInfo } from "../interfaces/songInfo";
import ArtistDisplay from "./Displays/ArtistDisplay";
import SongDisplay from "./Displays/SongDisplay";

export const StatsContext = createContext<{ showStats: boolean }>({
    showStats: false,
});

const SearchForm = ({ type }: { type: string }) => {
    const [query, setQuery] = useState<string>("");
    const [trackResults, setTrackResults] = useState<SongInfo[]>([]);
    const [artistReults, setArtistResults] = useState<ArtistInfo[]>([]);
    const [showStats, setShowStats] = useState<boolean>(false);

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
        <ArtistDisplay key={artist.id} artist={artist} fromSearch={true} />
    ));

    return (
        <div className="flex flex-col p-2 w-[90vw]">
            <form
                className="flex flex-col gap-4 items-center"
                onSubmit={searchQuery}
            >
                <input
                    className="border-2 w-[280px]"
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                />
                <div className="flex gap-2 justify-center">
                    <button className="button1 w-[150pxs] mb-4" type="submit">
                        <span className="button1-content">Search</span>
                    </button>
                    <button
                        className="button1 w-[150pxs] mb-4"
                        type="button"
                        onClick={() => setShowStats(!showStats)}
                    >
                        <span className="button1-content">
                            {showStats ? "Hide Stats" : "Show Stats"}
                        </span>
                    </button>
                </div>
            </form>

            <StatsContext.Provider value={{ showStats }}>
                {type === "track" && uniqueTracks.length > 0 && (
                    <div className="p-5 flex flex-col h-[50vh] overflow-auto gap-3">
                        {tracks}
                    </div>
                )}
            </StatsContext.Provider>
            {type !== "track" && artistReults.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center h-[50vh] overflow-auto">
                    {artists}
                </div>
            )}
        </div>
    );
};

export default SearchForm;
