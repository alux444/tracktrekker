import { useContext } from "react";
import { SongsInfoContext } from "../App";
import SongDisplay from "./SongDisplay";

const CurrentSearch = () => {
    const { songs, setSongs } = useContext(SongsInfoContext);

    const allSongs = songs.map((song) => (
        <SongDisplay songInfo={song} fromSearch={false} />
    ));

    return (
        <div className="flex flex-col text-xs h-full overflow-auto">
            {allSongs}
        </div>
    );
};

export default CurrentSearch;
