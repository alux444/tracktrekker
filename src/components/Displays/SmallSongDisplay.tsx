import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";

const SmallSongDisplay = ({ song }: { song: SongInfo }) => {
    const { removeSong } = useManageQuery();

    return (
        <div className="w-fit flex gap-1 border-[1px] p-2 rounded-[15px] justify-center items-center">
            <img src={song.album.images[0].url} className="h-[2rem]" />
            <div className="flex flex-col">
                <a
                    href={song.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                >
                    <p>
                        {song.name.length > 20
                            ? song.name.slice(0, 18) + "..."
                            : song.name}
                    </p>
                </a>
                <small>
                    {song.artists.length > 1
                        ? song.artists[0].name +
                          " +" +
                          (song.artists.length - 1)
                        : song.artists[0].name}
                </small>
            </div>
            <button
                onClick={() => removeSong(song)}
                className="hover:border-red-500 hover:text-red-500 border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
            >
                <span>&times;</span>
            </button>
        </div>
    );
};

export default SmallSongDisplay;
