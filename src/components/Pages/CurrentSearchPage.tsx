import { useContext, useRef } from "react";
import {
    ArtistInfoContext,
    ArtistSeedContext,
    GenreContext,
    SongSeedContext,
    SongsInfoContext,
} from "../../App";
import ArtistDisplay from "../Displays/ArtistDisplay";
import useManageQuery from "../../utils/useManageQuery";
import SmallSongDisplay from "../Displays/SmallSongDisplay";
import useOutsideClick from "../../utils/useOutsideClose";
import { AudioContext } from "./Views";

const CurrentSearchPage = ({ onClose }: { onClose: () => void }) => {
    const modalRef = useRef(null);

    const { audio, setAudioIsPlaying } = useContext(AudioContext);
    const { songs, setSongs } = useContext(SongsInfoContext);
    const { setSongSeeds } = useContext(SongSeedContext);
    const { artists, setArtists } = useContext(ArtistInfoContext);
    const { setArtistSeeds } = useContext(ArtistSeedContext);
    const { genres, setGenres } = useContext(GenreContext);
    const { removeGenre } = useManageQuery();

    const closeModal = () => {
        if (audio !== null) {
            audio.pause();
            setAudioIsPlaying(false);
        }
        onClose();
    };

    useOutsideClick(modalRef, closeModal);

    const clearSearch = () => {
        setSongSeeds([]);
        setSongs([]);
        setArtistSeeds([]);
        setArtists([]);
        setGenres([]);
        closeModal();
    };

    const allSongs = songs.map((song) => (
        <SmallSongDisplay song={song} key={song.id} />
    ));

    const allArtists = artists.map((artist) => (
        <ArtistDisplay artist={artist} type={"currentsearch"} key={artist.id} />
    ));

    const allGenres = genres.map((genre) => (
        <div className="flex gap-2 items-center rounded-lg p-2 border-[1px] hover">
            {genre.label.charAt(0).toUpperCase()}
            {genre.label.slice(1)}
            <button
                onClick={() => removeGenre(genre)}
                className="hover:border-lightred hover:text-lightred border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
            >
                <span>&times;</span>
            </button>
        </div>
    ));

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                ref={modalRef}
                className={`flex flex-col w-[95vw] lg:w-[40vw] max-h-[90vh] overflow-auto gap-2 p-2 rounded-[10px] z-10 items-center bg-dark3 relative ${
                    songs.length + artists.length + genres.length > 5 &&
                    "border-lightred border-2"
                }`}
            >
                <button
                    className="absolute top-2 right-3 cursor-pointer"
                    onClick={onClose}
                >
                    <span>&times;</span>
                </button>
                {songs.length === 0 &&
                genres.length === 0 &&
                artists.length === 0 ? (
                    <div className="justify-center align-center items-center flex h-full">
                        <p>Your search is empty.</p>
                    </div>
                ) : (
                    <div className="justify-center align-center items-center flex h-full gap-2">
                        <p className="grad text-lg">Current Search</p>
                        <button
                            onClick={clearSearch}
                            className="button3"
                            id="clearSearchBtn"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
                {songs.length + artists.length + genres.length > 5 && (
                    <p className="px-3 text-center text-lightred">
                        Your search is above the recommended 5 combined total of
                        songs, artists and genres.
                    </p>
                )}
                {songs.length > 0 && (
                    <div className="flex flex-wrap w-full items-center justify-center flex-col">
                        {allSongs}
                    </div>
                )}
                {artists.length > 0 && (
                    <div className="flex flex-wrap w-full items-center justify-center gap-1">
                        {allArtists}
                    </div>
                )}
                {genres.length > 0 && (
                    <div className="flex flex-wrap w-full items-center justify-center gap-1">
                        {allGenres}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrentSearchPage;
