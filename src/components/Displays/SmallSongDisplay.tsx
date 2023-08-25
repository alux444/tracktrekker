import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import { SongsInfoContext } from "../../App";
import { AudioContext } from "../Pages/Views";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

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
        <div className="w-full flex gap-1 border-[1px] p-2 rounded-[10px] justify-between items-center hover bg-[rgba(255,255,255,0.5)]">
            <div className="flex gap-1 w-[80%]">
                <img
                    src={song.album.images[1].url}
                    className="w-[2rem] lg:w-[3rem]"
                />
                <div className="flex flex-col w-[80%] align-center">
                    <a
                        className="w-full"
                        href={song.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="flex gap-2 w-full overflow-hidden">
                            <span className="truncate max-w-full">
                                {song.name}
                            </span>
                        </div>
                    </a>
                    <small className="text-slate-400 ">
                        {song.artists.length > 1
                            ? song.artists[0].name +
                              " +" +
                              (song.artists.length - 1)
                            : song.artists[0].name}
                    </small>
                </div>
            </div>

            <div className="w-[20%] buttons flex gap-1 flex-col justify-end items-end">
                {song.preview_url && (
                    <button className="buttonprev" onClick={playPreview}>
                        <span>
                            {currentPlayingId === song.id ? (
                                <PauseIcon style={{ fontSize: "1rem" }} />
                            ) : (
                                <PlayArrowIcon style={{ fontSize: "1rem" }} />
                            )}
                        </span>
                    </button>
                )}
                {!selected ? (
                    <button
                        className="buttonselect"
                        onClick={() => {
                            addSong(song);
                        }}
                    >
                        <span>
                            <AddIcon style={{ fontSize: "1rem" }} />
                        </span>
                    </button>
                ) : (
                    <button
                        onClick={() => removeSong(song)}
                        className="buttoncancel"
                    >
                        <span>
                            <ClearIcon style={{ fontSize: "1rem" }} />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SmallSongDisplay;
