import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import useSpotify from "../../utils/useSpotify";
import { ArtistInfo } from "../../interfaces/artistInfo";
import { SongInfo } from "../../interfaces/songInfo";
import ArtistDisplay from "../Displays/ArtistDisplay";
import SongDisplay from "../Displays/SongDisplay";
import { StatsContext } from "../Pages/HomePage";
import { AudioContext } from "../Pages/Views";
import Pagination from "./Pagination";

const SearchForm = ({
    type,
    scrollToTop,
    submit,
}: {
    type: "track" | "artist";
    scrollToTop: () => void;
    submit: () => void;
}) => {
    const { showStats, setShowStats } = useContext(StatsContext);
    const { audio, setAudio } = useContext(AudioContext);

    const [query, setQuery] = useState<string>("");
    const [trackResults, setTrackResults] = useState<SongInfo[]>([]);
    const [artistReults, setArtistResults] = useState<ArtistInfo[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<boolean>(false);

    const { getSearch } = useSpotify();

    useEffect(() => {
        if (audio !== null) {
            audio.pause();
            setAudio(null);
        }
    }, [trackResults, artistReults]);

    useEffect(() => {
        setCurrentPage(1);
    }, [trackResults, artistReults, type]);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    const searchQuery = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        const res = await getSearch(query);
        if (res === null) {
            setError(true);
            return;
        }

        if (
            (type === "track" && res.tracks.items.length === 0) ||
            (type === "artist" && res.artists.items.length === 0)
        ) {
            setError(true);
        }

        setTrackResults(res.tracks.items);
        setArtistResults(res.artists.items.slice(0, 30));
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

    const displaysPerPage = type === "track" ? 8 : 10;
    const indexOfLastItem = currentPage * displaysPerPage;
    const indexOfFirstItem = indexOfLastItem - displaysPerPage;
    const currentTracks = uniqueTracks.slice(indexOfFirstItem, indexOfLastItem);
    const currentArtists = artistReults.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const tracks = currentTracks.map((song) => (
        <SongDisplay key={song.external_ids.isrc} songInfo={song} type={1} />
    ));

    const artists = currentArtists.map((artist) => (
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
                            {type === "track" && showStats && "Hide Stats"}
                            {type === "track" && !showStats && "Show Stats"}
                            {type === "artist" && showStats && "Hide Top Songs"}
                            {type === "artist" &&
                                !showStats &&
                                "Show Top Songs"}
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
            {error && <p className="grad">Your search had no results :(</p>}
            {type === "track" && uniqueTracks.length > 0 && (
                <div className="p-5 flex flex-col gap-3 w-full">{tracks}</div>
            )}

            {type !== "track" && artistReults.length > 0 && (
                <div className="flex flex-wrap gap-3 w-full justify-center overflow-auto">
                    {artists}
                </div>
            )}

            {(artistReults.length > 0 || trackResults.length > 0) && (
                <div className="flex flex-col gap-1 justify-center items-center">
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
                    <Pagination
                        totalDisplay={
                            type === "track"
                                ? uniqueTracks.length
                                : artistReults.length
                        }
                        displaysPerPage={displaysPerPage}
                        paginate={changePage}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchForm;
