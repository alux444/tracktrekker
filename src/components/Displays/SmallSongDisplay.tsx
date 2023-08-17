import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import { SongsInfoContext } from "../../App";

const SmallSongDisplay = ({ song }: { song: SongInfo }) => {
    const [selected, setSelected] = useState(false);

    const { songs } = useContext(SongsInfoContext);
    const { addSong, removeSong } = useManageQuery();

    useEffect(() => {
        const checkSongStatus = () => {
            const isSongSelected = songs.some(
                (thisSong) => thisSong.id === song.id
            );
            setSelected(isSongSelected);
        };
        checkSongStatus();
    }, [songs, song]);

    return (
        <div className="w-fit flex gap-1 border-[1px] p-2 rounded-[10px] justify-center items-center hover">
            <img src={song.album.images[1].url} className="h-[2rem]" />
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

            {!selected ? (
                <button
                    className="border-green-500 hover:text-green-500 border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
                    onClick={() => {
                        addSong(song);
                    }}
                >
                    <span>+</span>
                </button>
            ) : (
                <button
                    onClick={() => removeSong(song)}
                    className="border-red-500 hover:text-red-500 border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
                >
                    <span>&times;</span>
                </button>
            )}
        </div>
    );
};

export default SmallSongDisplay;
