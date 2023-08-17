import React, { useEffect, useState } from "react";
import useSpotify from "../../utils/useSpotify";
import { ArtistInfo } from "../../interfaces/artistInfo";
import { SongInfo } from "../../interfaces/songInfo";
import Pagination from "../Misc/Pagination";
import SongDisplay from "../Displays/SongDisplay";
import ArtistDisplay from "../Displays/ArtistDisplay";
import VolumeSlider from "../Misc/VolumeSlider";

const UserTopItemsPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showSongs, setShowSongs] = useState<boolean>(true);
    const [currentTerm, setCurrentTerm] = useState<
        "short_term" | "medium_term" | "long_term"
    >("short_term");
    const [topArtists, setTopArtists] = useState<ArtistInfo[]>([]);
    const [topSongs, setTopSongs] = useState<SongInfo[]>([]);
    const [error, setError] = useState<boolean>(false);

    const { getTopItems } = useSpotify();

    useEffect(() => {
        setCurrentPage(1);
    }, [showSongs, currentTerm]);

    useEffect(() => {
        const getAllItems = async () => {
            const songs = await getTopItems(currentTerm, "track");
            const artists = await getTopItems(currentTerm, "artist");
            if (songs === null || artists === null) {
                setError(true);
                return;
            }
            setTopSongs(songs);
            setTopArtists(artists);
        };
        getAllItems();
    }, [currentTerm]);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    const displaysPerPage = showSongs ? 8 : 8;
    const indexOfLastItem = currentPage * displaysPerPage;
    const indexOfFirstItem = indexOfLastItem - displaysPerPage;
    const currentTracks = topSongs.slice(indexOfFirstItem, indexOfLastItem);
    const currentArtists = topArtists.slice(indexOfFirstItem, indexOfLastItem);

    const tracks = currentTracks.map((song) => (
        <SongDisplay key={song.external_ids.isrc} songInfo={song} />
    ));

    const artists = currentArtists.map((artist) => (
        <ArtistDisplay
            key={artist.id}
            artist={artist}
            fromSearch={true}
            type={"search"}
        />
    ));
    const handleTermChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTerm = event.target.value as
            | "short_term"
            | "medium_term"
            | "long_term";
        setCurrentTerm(selectedTerm);
    };

    const time =
        currentTerm === "short_term"
            ? "Past 4 weeks"
            : currentTerm === "medium_term"
            ? "Past 6 months"
            : "All Time";

    return (
        <div className="flex gap-2 items-center justify-center flex-col w-[90vw] p-3">
            <div className="flex gap-1 items-center">
                <button
                    className="button3 w-fit"
                    onClick={() => setShowSongs(!showSongs)}
                >
                    <span>{showSongs ? "Show Artists" : "Show Songs"}</span>
                </button>
                <div>
                    <select
                        className="border-[2px] p-1 border-purple-400 rounded-[8px]"
                        value={currentTerm}
                        onChange={handleTermChange}
                    >
                        <option value="short_term">Past 4 weeks</option>
                        <option value="medium_term">Past 6 months</option>
                        <option value="long_term">All time</option>
                    </select>
                </div>
            </div>
            <VolumeSlider />
            {error && <p className="grad">Error fetching data :(</p>}
            {showSongs ? (
                <div className="flex flex-col text-center w-full gap-1">
                    <p className="grad">Your Top Songs ({time})</p>
                    <div className="p-5 flex flex-col gap-3 w-full text-start">
                        {tracks}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col text-center w-full gap-1">
                    <p className="grad">Your Top Artists ({time})</p>
                    <div className="flex flex-wrap gap-3 w-full text-center justify-center items-center text-start">
                        {artists}
                    </div>
                </div>
            )}

            <Pagination
                totalDisplay={showSongs ? topSongs.length : topArtists.length}
                displaysPerPage={displaysPerPage}
                paginate={changePage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default UserTopItemsPage;
