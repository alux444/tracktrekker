import { useContext } from "react";
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

const CurrentSearchPage = () => {
    const { songs, setSongs } = useContext(SongsInfoContext);
    const { setSongSeeds } = useContext(SongSeedContext);
    const { artists, setArtists } = useContext(ArtistInfoContext);
    const { setArtistSeeds } = useContext(ArtistSeedContext);
    const { genres, setGenres } = useContext(GenreContext);
    const { removeGenre } = useManageQuery();

    const clearSearch = () => {
        setSongSeeds([]);
        setSongs([]);
        setArtistSeeds([]);
        setArtists([]);
        setGenres([]);
    };

    const allSongs = songs.map((song) => <SmallSongDisplay song={song} />);

    const allArtists = artists.map((artist) => (
        <ArtistDisplay artist={artist} fromSearch={false} type={2} />
    ));

    const allGenres = genres.map((genre) => (
        <div className="flex gap-2 items-center rounded-lg p-2 border-[1px]">
            {genre.label.charAt(0).toUpperCase()}
            {genre.label.slice(1)}
            <button
                onClick={() => removeGenre(genre)}
                className="hover:border-red-500 hover:text-red-500 border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
            >
                <span>&times;</span>
            </button>
        </div>
    ));

    return (
        <div className="flex flex-col w-[90vw]  gap-2 p-3 rounded-[30px] z-300">
            {songs.length === 0 &&
            genres.length === 0 &&
            artists.length === 0 ? (
                <div className="justify-center align-center items-center flex h-full">
                    <p>Your search is empty.</p>
                </div>
            ) : (
                <div className="justify-center align-center items-center flex h-full gap-2">
                    <p className="grad text-lg">Current Search</p>
                    <button onClick={clearSearch} className="button3">
                        Clear Search
                    </button>
                </div>
            )}
            {songs.length > 0 && (
                <div className="flex flex-wrap w-full items-center justify-center gap-2 flex-col">
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
    );
};

export default CurrentSearchPage;
