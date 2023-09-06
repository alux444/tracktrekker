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
                    setAudioIsPlaying(false);
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
        <div className="flex flex-col p-1 w-full">
            <div className="flex justify-end h-[10px]">
                {!selected ? (
                    <button
                        className="buttonselect absolute bottom-0 left-2 h-fit"
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
                        className="buttoncancel absolute bottom-0 left-2 h-fit"
                    >
                        <span>
                            <ClearIcon style={{ fontSize: "1rem" }} />
                        </span>
                    </button>
                )}
            </div>
            <div
                className={`w-full flex gap-1 border-dark2 border-[1px] p-2 rounded-[10px] justify-between items-center hover bg-dark3 ${
                    selected &&
                    "border-lightgreen border-[2px] bg-[rgba(248,191,255,0.1)]"
                }`}
            >
                <div className="flex gap-1 w-[80%]">
                    <a
                        href={song.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={song.album.images[1].url}
                            className="w-[2.2rem] h-[2.2rem] lg:w-[3rem] lg:h-[3rem]"
                        />
                    </a>
                    <div className="flex flex-col w-[80%] align-center">
                        <div className="flex gap-2 w-full overflow-hidden">
                            <span className="truncate max-w-full">
                                {song.name}
                            </span>
                        </div>
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
                    {song.preview_url ? (
                        <button onClick={playPreview}>
                            <span>
                                {audioIsPlaying &&
                                currentPlayingId === song.id ? (
                                    <PauseIcon style={{ fontSize: "1.5rem" }} />
                                ) : (
                                    <PlayArrowIcon
                                        style={{ fontSize: "1.5rem" }}
                                    />
                                )}
                            </span>
                        </button>
                    ) : (
                        <button
                            className="invisible"
                            disabled={true}
                            onClick={playPreview}
                        >
                            <span>
                                <PlayArrowIcon style={{ fontSize: "1rem" }} />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmallSongDisplay;
