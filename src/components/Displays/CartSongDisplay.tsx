import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import { AudioContext } from "../Pages/Views";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { DevContext } from "../../App";

const CartSongDisplay = ({ songInfo }: { songInfo: SongInfo }) => {
    const {
        audio,
        setAudio,
        audioIsPlaying,
        setAudioIsPlaying,
        currentPlayingId,
        setCurrentPlayingId,
    } = useContext(AudioContext);
    const { devMode, songCart } = useContext(DevContext);

    const [inCart, setInCart] = useState(false);
    const { removeFromCart } = useManageQuery();

    useEffect(() => {
        const checkSongCartStatus = () => {
            const isSongSelected = songCart.some(
                (song) => song.id === songInfo.id
            );
            setInCart(isSongSelected);
        };
        if (devMode) {
            checkSongCartStatus();
        }
    }, [songCart, songInfo]);

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

    const artists = songInfo.artists
        .slice(0, 3)
        .map((artist) => artist.name)
        .join(", ");

    return (
        <div
            className={`songDisplay md:flex flex-col flex-wrap justify-center w-full items-center text-[rgba(0,0,0,0.8)] h-fit`}
        >
            <div
                className={`hover h-full flex justify-between flex xs:flex-row items-center p-2 w-full border-[1px] text-xs
                 rounded-[10px] backdrop-blur-3xl`}
            >
                <div className="namesAndImage flex gap-1 w-[80%] h-full items-center">
                    <div className="imageDiv flex flex-col gap-1 w-fit">
                        <a
                            href={songInfo.external_urls.spotify}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src={songInfo.album.images[1].url}
                                className="float-left max-w-[2.6rem] max-h-[2.6rem]"
                            />
                        </a>
                    </div>

                    <div className="namesDiv flex justify-between gap-1 p-1 flex-col h-full flex-grow max-w-[70%] sm:max-w-[70%] lg:max-w-[80%]">
                        <div className="flex flex-col w-full">
                            <h2 className="text-md flex gap-2 w-full overflow-hidden min-w-0 mb-1">
                                <span className="truncate max-w-full">
                                    {songInfo.name}
                                </span>
                            </h2>
                            <div className="text-xs text-slate-400 flex gap-2 flex-wrap w-full overflow-hidden">
                                <span className="truncate max-w-full">
                                    {songInfo.artists.length > 3
                                        ? artists +
                                          " +" +
                                          (songInfo.artists.length - 3)
                                        : artists}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="buttonsArea flex flex-col align-center flex-wrap gap-1 justify-end items-end w-[15%] xs:w-[20%]">
                    {songInfo.preview_url && (
                        <button
                            className="buttonprev w-full"
                            type="button"
                            onClick={playPreview}
                        >
                            <span className="w-full">
                                {audioIsPlaying &&
                                currentPlayingId === songInfo.id ? (
                                    <div className="flex justify-center xs:justify-start items-center w-full">
                                        <PauseIcon
                                            style={{ fontSize: "0.9rem" }}
                                        />
                                        <span className="hidden sm:flex">
                                            PAUSE
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex justify-center xs:justify-start items-center w-full">
                                        <PlayArrowIcon
                                            style={{ fontSize: "0.9rem" }}
                                        />
                                        <span className="hidden sm:flex">
                                            PLAY
                                        </span>
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
                        <span className="flex justify-start items-center w-full">
                            <>
                                <RemoveShoppingCartIcon
                                    style={{ fontSize: "0.9rem" }}
                                />
                                <span className="hidden sm:flex">CANCEL</span>
                            </>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSongDisplay;
