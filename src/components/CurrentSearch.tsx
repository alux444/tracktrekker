import { useContext } from "react";
import { ArtistInfoContext, GenreContext, SongsInfoContext } from "../App";
import SongDisplay from "./Displays/SongDisplay";
import ArtistDisplay from "./Displays/ArtistDisplay";
import useManageQuery from "../utils/useManageQuery";

const CurrentSearch = () => {
    const { songs } = useContext(SongsInfoContext);
    const { artists } = useContext(ArtistInfoContext);
    const { genres } = useContext(GenreContext);
    const { removeGenre } = useManageQuery();

    const allSongs = songs.map((song) => (
        <SongDisplay songInfo={song} type={2} />
    ));

    const allArtists = artists.map((artist) => (
        <ArtistDisplay artist={artist} fromSearch={false} />
    ));

    const allGenres = genres.map((genre) => (
        <div className="flex gap-2 items-center rounded-lg p-2 border-[1px]">
            {genre.label}
            <button onClick={() => removeGenre(genre)} className="buttoncancel">
                <span>&times;</span>
            </button>
        </div>
    ));

    return (
        <div className="flex flex-col overflow-auto h-[60vh] w-[90vw] gap-2 p-3">
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

export default CurrentSearch;
