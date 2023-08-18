import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import { SongsInfoContext } from "../../App";
import { AudioContext } from "../Pages/Views";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const SmallSongDisplay = ({ song }: { song: SongInfo }) => {
    const [selected, setSelected] = useState(false);

    const { songs } = useContext(SongsInfoContext);
    const { addSong, removeSong } = useManageQuery();
    const {
        audio,
        setAudio,
        audioIsPlaying,
        setAudioIsPlaying,
        currentPlayingId,
        setCurrentPlayingId,
    } = useContext(AudioContext);

    useEffect(() => {
        const checkSongStatus = () => {
            const isSongSelected = songs.some(
                (thisSong) => thisSong.id === song.id
            );
            setSelected(isSongSelected);
        };
        checkSongStatus();
    }, [songs, song]);

    const playPreview = () => {
        if (song.preview_url) {
            const thisAudio = new Audio(song.preview_url);

            if (audio && audio.src === thisAudio.src) {
                if (audioIsPlaying) {
                    audio.pause();
                    setAudioIsPlaying(false);
                    setCurrentPlayingId(null);
                } else {
                    audio.play();
                    setAudioIsPlaying(true);
                    setCurrentPlayingId(song.id);
                }
            } else {
                if (audio) {
                    audio.pause();
                    setCurrentPlayingId(null);
                }
                thisAudio.play();
                setAudioIsPlaying(true);
                setAudio(thisAudio);
                setCurrentPlayingId(song.id);
            }
        }
    };

    return (
        <div className="w-full flex gap-1 border-[1px] p-2 rounded-[10px] justify-between items-center hover">
            <div className="flex gap-1">
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
            </div>

            <div className="buttons flex gap-1">
                {song.preview_url && (
                    <button
                        className="border-blue-500 hover:text-blue-500 border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
                        onClick={playPreview}
                    >
                        <span>
                            {currentPlayingId === song.id ? (
                                <PauseIcon style={{ fontSize: "0.5rem" }} />
                            ) : (
                                <PlayArrowIcon style={{ fontSize: "0.5rem" }} />
                            )}
                        </span>
                    </button>
                )}
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
        </div>
    );
};

export default SmallSongDisplay;
