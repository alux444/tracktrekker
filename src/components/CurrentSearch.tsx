import { useContext } from "react";
import { ArtistInfoContext, GenreContext, SongsInfoContext } from "../App";
import SongDisplay from "./Displays/SongDisplay";
import ArtistDisplay from "./Displays/ArtistDisplay";

const CurrentSearch = () => {
    const { songs } = useContext(SongsInfoContext);
    const { artists } = useContext(ArtistInfoContext);
    const { genres } = useContext(GenreContext);

    const allSongs = songs.map((song) => (
        <SongDisplay songInfo={song} fromSearch={false} />
    ));

    const allArtists = artists.map((artist) => (
        <ArtistDisplay artist={artist} fromSearch={false} />
    ));

    const allGenres = genres.map((genre) => <h2>{genre}</h2>);

    return (
        <div className="flex flex-col flex-wrap max-h-[60vh] w-[80vw] overflow-auto items-center">
            {songs.length > 0 && (
                <div className="flex flex-wrap w-full items-center justify-center">
                    {allSongs}
                </div>
            )}
            {artists.length > 0 && (
                <div className="flex flex-wrap w-full items-center justify-center">
                    {allArtists}
                </div>
            )}
            {genres.length > 0 && (
                <div className="flex flex-wrap w-full items-center justify-center">
                    {allGenres}
                </div>
            )}
        </div>
    );
};

export default CurrentSearch;
