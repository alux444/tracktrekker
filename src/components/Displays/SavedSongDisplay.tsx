import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import { AudioContext } from "../Pages/Views";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { LoginContext } from "../../App";
import { FavoriteOutlined } from "@mui/icons-material";

const SavedSongDisplay = ({ songInfo }: { songInfo: SongInfo }) => {
    const {
        audio,
        setAudio,
        audioIsPlaying,
        setAudioIsPlaying,
        currentPlayingId,
        setCurrentPlayingId,
    } = useContext(AudioContext);
    const { savedSongs } = useContext(LoginContext);

    const [inCart, setInCart] = useState(false);
    const { removeFromCart } = useManageQuery();

    useEffect(() => {
        const checksavedSongsStatus = () => {
            const isSongSelected = savedSongs.some(
                (song) => song.id === songInfo.id
            );
            setInCart(isSongSelected);
        };
        checksavedSongsStatus();
    }, [savedSongs, songInfo]);

    const playPreview = () => {
        if (songInfo.preview_url) {
            const thisAudio = new Audio(songInfo.preview_url);

            if (audio && audio.src === thisAudio.src) {
                if (audioIsPlaying) {
                    audio.pause();
                    setAudioIsPlaying(false);
                    setCurrentPlayingId(null);
                } else {
                    audio.play();
                    setAudioIsPlaying(true);
                    setCurrentPlayingId(songInfo.id);
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
                setCurrentPlayingId(songInfo.id);
            }
        }
    };

    return (
        <div className="w-full flex gap-1 border-slate-400 border-[1px] p-2 rounded-[10px] justify-between items-center hover bg-dark3">
            <div className="flex gap-1 w-[80%]">
                <a
                    href={songInfo.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={songInfo.album.images[1].url}
                        className="w-[2.2rem] lg:w-[3rem]"
                    />
                </a>
                <div className="flex flex-col w-[80%] align-center">
                    <div className="flex gap-2 w-full overflow-hidden">
                        <span className="truncate max-w-full">
                            {songInfo.name}
                        </span>
                    </div>
                    <small className="text-slate-400 ">
                        {songInfo.artists.length > 1
                            ? songInfo.artists[0].name +
                              " +" +
                              (songInfo.artists.length - 1)
                            : songInfo.artists[0].name}
                    </small>
                </div>
            </div>

            <div className="w-[20%] buttons flex gap-1 flex-col justify-end items-end">
                {songInfo.preview_url && (
                    <button
                        className="buttonprev w-full"
                        type="button"
                        onClick={playPreview}
                    >
                        <span className="w-full">
                            {audioIsPlaying &&
                            currentPlayingId === songInfo.id ? (
                                <div className="flex justify-center sm:justify-start items-center w-full">
                                    <PauseIcon style={{ fontSize: "0.9rem" }} />
                                    <span className="hidden sm:flex">
                                        PAUSE
                                    </span>
                                </div>
                            ) : (
                                <div className="flex justify-center sm:justify-start items-center w-full">
                                    <PlayArrowIcon
                                        style={{ fontSize: "0.9rem" }}
                                    />
                                    <span className="hidden sm:flex">PLAY</span>
                                </div>
                            )}
                        </span>
                    </button>
                )}

                <button
                    className={`${
                        inCart ? "buttoncancel" : "buttonselect"
                    } w-full`}
                    type="button"
                    onClick={() => removeFromCart(songInfo)}
                >
                    <span className="flex justify-center sm:justify-start items-center w-full">
                        <>
                            <FavoriteOutlined style={{ fontSize: "0.8rem" }} />
                            <span className="hidden sm:flex">CANCEL</span>
                        </>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SavedSongDisplay;
