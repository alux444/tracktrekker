import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import FeaturesDisplay from "./FeaturesDisplay";
import { AudioContext } from "../Pages/Views";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {
    ArtistSeedContext,
    LoginContext,
    GenreContext,
    SongsInfoContext,
} from "../../App";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SongDisplay = ({
    songInfo,
    statsButton,
}: {
    songInfo: SongInfo;
    statsButton: boolean;
}) => {
    const {
        audio,
        setAudio,
        audioIsPlaying,
        setAudioIsPlaying,
        currentPlayingId,
        setCurrentPlayingId,
    } = useContext(AudioContext);
    const { songs } = useContext(SongsInfoContext);
    const { savedSongs } = useContext(LoginContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);

    const [thisShowStats, setThisShowStats] = useState<boolean>(false);
    const [selected, setSelected] = useState(false);
    const [inCart, setInCart] = useState(false);
    const { addSong, removeSong, addToCart, removeFromCart } = useManageQuery();

    useEffect(() => {
        const checkSongStatus = () => {
            const isSongSelected = songs.some(
                (song) => song.id === songInfo.id
            );
            setSelected(isSongSelected);
        };
        checkSongStatus();
    }, [songs, songInfo]);

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

    const artists = songInfo.artists
        .slice(0, 3)
        .map((artist) => artist.name)
        .join(", ");

    const totalSeconds = Math.floor(songInfo.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const duration: string = `${minutes}:${seconds}`;

    return (
        <div
            className={`songDisplay md:flex flex-col flex-wrap justify-center w-full items-center h-fit`}
        >
            <div className="flex flex-col w-full">
                <div className="flex justify-between w-full h-fit">
                    <button
                        className={`absolute w-fit right-2 top-3 py-[3px] z-10 ${
                            inCart ? "buttoncancel" : "buttonselect"
                        }`}
                        type="button"
                        onClick={() => {
                            if (inCart) {
                                removeFromCart(songInfo);
                            } else {
                                addToCart(songInfo);
                            }
                        }}
                    >
                        <span className="flex justify-center items-center w-full">
                            {inCart ? (
                                <FavoriteIcon style={{ fontSize: "1rem" }} />
                            ) : (
                                <FavoriteBorderOutlined
                                    style={{ fontSize: "1rem" }}
                                />
                            )}
                        </span>
                    </button>
                    {!selected && (
                        <button
                            id="songAddButton"
                            className="buttonselect w-fit absolute left-2 top-3 py-[3px] z-10"
                            onClick={() => {
                                addSong(songInfo);
                            }}
                        >
                            <span className="flex justify-center xs:justify-start items-center w-fit">
                                <AddIcon style={{ fontSize: "0.9rem" }} />
                            </span>
                        </button>
                    )}
                    {selected && (
                        <button
                            id="songRemoveButton"
                            className="buttoncancel absolute w-fit left-2 top-3 py-[3px] z-10"
                            onClick={() => {
                                removeSong(songInfo);
                            }}
                        >
                            <span className="flex justify-center xs:justify-start items-center w-full">
                                <ClearIcon style={{ fontSize: "0.9rem" }} />
                            </span>
                        </button>
                    )}
                </div>
                <div
                    className={`bg-dark3 hover h-full flex justify-between flex xs:flex-row items-center p-2 w-full border-[1px]
                 rounded-[10px] border-dark2 backdrop-blur-3xl ${
                     selected &&
                     "border-lightgreen border-[2px] bg-[rgba(248,191,255,0.1)]"
                 } ${
                        selected &&
                        songs.length + artistSeeds.length + genres.length > 5 &&
                        "border-lightred"
                    }`}
                >
                    <div className="namesAndImage flex gap-1 w-full h-full items-center">
                        <a
                            href={songInfo.external_urls.spotify}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {songInfo.album.images?.[1] && songInfo.album.images[1].url && <img
                                src={songInfo.album.images?.[1].url}
                                className="float-left md:max-w-[80px] md:max-h-[80px] max-h-[70px] max-w-[70px]"
                            />}
                        </a>

                        <div
                            className="namesDiv flex justify-between p-1 gap-2 flex-col h-full"
                            style={{ width: `calc(100% - 70px)` }}
                        >
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

                            <div className="flex justify-between ">
                                <div className="text-slate-400 mt-auto">
                                    {duration && (
                                        <>
                                            <span>{duration}</span>{" "}
                                            <span>
                                                {" "}
                                                ·{" "}
                                                {songInfo.album.release_date.slice(
                                                    0,
                                                    4
                                                )}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="buttonsArea flex justify-end gap-1">
                                    {songInfo.preview_url && (
                                        <button
                                            className="w-full"
                                            type="button"
                                            onClick={playPreview}
                                        >
                                            <span className="w-full">
                                                {audioIsPlaying &&
                                                currentPlayingId ===
                                                    songInfo.id ? (
                                                    <div className="flex justify-center xs:justify-start items-center w-full">
                                                        <PauseIcon
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center xs:justify-start items-center w-full">
                                                        <PlayArrowIcon
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </span>
                                        </button>
                                    )}
                                    {statsButton && songInfo.features && (
                                        <button
                                            className="w-full"
                                            type="button"
                                            onClick={() =>
                                                setThisShowStats(!thisShowStats)
                                            }
                                        >
                                            <span className="flex justify-center xs:justify-start items-center w-full">
                                                {thisShowStats ? (
                                                    <span>
                                                        <VisibilityOffIcon
                                                            style={{
                                                                fontSize:
                                                                    "1.5rem",
                                                            }}
                                                        />
                                                    </span>
                                                ) : (
                                                    <BarChartIcon
                                                        style={{
                                                            fontSize: "1.5rem",
                                                        }}
                                                    />
                                                )}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {songInfo.features && thisShowStats && (
                    <FeaturesDisplay
                        features={songInfo.features}
                        onClose={() => setThisShowStats(false)}
                        songInfo={songInfo}
                    />
                )}
            </div>
        </div>
    );
};

export default SongDisplay;
