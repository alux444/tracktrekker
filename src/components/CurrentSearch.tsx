import { useContext } from "react";
import { ArtistInfoContext, SongsInfoContext } from "../App";
import SongDisplay from "./Displays/SongDisplay";
import ArtistDisplay from "./Displays/ArtistDisplay";

const CurrentSearch = () => {
    const { songs } = useContext(SongsInfoContext);
    const { artists } = useContext(ArtistInfoContext);

    const allSongs = songs.map((song) => (
        <SongDisplay songInfo={song} fromSearch={false} />
    ));

    const allArtists = artists.map((artist) => (
        <ArtistDisplay artist={artist} fromSearch={false} />
    ));

    return (
        <div className="flex flex-col text-xs h-full overflow-auto items-center">
            <p>Im looking for...</p>
            {songs.length > 0 && (
                <div>
                    <small>Songs like:</small>
                    {allSongs}
                </div>
            )}
            {artists.length > 0 && (
                <div>
                    <small>Artists like:</small>
                    {allArtists}
                </div>
            )}
        </div>
    );
};

export default CurrentSearch;
