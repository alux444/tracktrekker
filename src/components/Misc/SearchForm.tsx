import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import useSpotify from "../../utils/useSpotify";
import { ArtistInfo } from "../../interfaces/artistInfo";
import { SongInfo } from "../../interfaces/songInfo";
import ArtistDisplay from "../Displays/ArtistDisplay";
import SongDisplay from "../Displays/SongDisplay";
import { StatsContext } from "../Pages/HomePage";
import { AudioContext } from "../Pages/Views";

const SearchForm = ({
    type,
    scrollToTop,
    submit,
}: {
    type: string;
    scrollToTop: () => void;
    submit: () => void;
}) => {
    const { showStats, setShowStats } = useContext(StatsContext);
    const { audio, setAudio } = useContext(AudioContext);

    const [query, setQuery] = useState<string>("");
    const [trackResults, setTrackResults] = useState<SongInfo[]>([]);
    const [artistReults, setArtistResults] = useState<ArtistInfo[]>([]);

    const { getSearch } = useSpotify();

    useEffect(() => {
        if (audio !== null) {
            audio.pause();
            setAudio(null);
        }
    }, [trackResults, artistReults]);

    const searchQuery = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await getSearch(query);
        setTrackResults(res.tracks.items);
        setArtistResults(res.artists.items);
    };

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const resetSearch = () => {
        setQuery("");
        setTrackResults([]);
        setArtistResults([]);
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
        <div className="flex flex-col p-2 w-[90vw] items-center gap-1">
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
                    <button
                        className="button3 border-purple-500 border-[1px]"
                        type="button"
                        onClick={resetSearch}
                    >
                        <span>Reset</span>
                    </button>
                </div>
            </form>

            {type === "track" && uniqueTracks.length > 0 && (
                <div className="p-5 flex flex-col gap-3 w-full">{tracks}</div>
            )}

            {type !== "track" && artistReults.length > 0 && (
                <div className="flex flex-wrap gap-3 w-full justify-center overflow-auto">
                    {artists}
                </div>
            )}

            {artistReults.length > 0 && trackResults.length > 0 && (
                <div className="flex gap-2">
                    <button
                        className="button2 border-purple-500 border-[1px] "
                        onClick={scrollToTop}
                    >
                        <span className="grad">Top</span>
                    </button>
                    <button className="button3" onClick={submit}>
                        <span>Hide</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchForm;
