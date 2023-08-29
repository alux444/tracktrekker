import { useContext, useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import useSpotify from "../../utils/useSpotify";
import { AudioFeatures } from "../../interfaces/audioFeatures";
import FeaturesDisplay from "./FeaturesDisplay";
import { StatsContext } from "../Pages/HomePage";
import { AudioContext } from "../Pages/Views";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { SongsInfoContext } from "../../App";

const SongDisplay = ({
    songInfo,
    statsButton,
}: {
    songInfo: SongInfo;
    statsButton: boolean;
}) => {
    const { showStats } = useContext(StatsContext);
    const {
        audio,
        setAudio,
        audioIsPlaying,
        setAudioIsPlaying,
        currentPlayingId,
        setCurrentPlayingId,
    } = useContext(AudioContext);
    const { songs } = useContext(SongsInfoContext);

    const [thisShowStats, setThisShowStats] = useState<boolean>(false);
    const [selected, setSelected] = useState(false);
    const [features, setFeatures] = useState<AudioFeatures | undefined>();
    const { addSong, removeSong } = useManageQuery();

    const { getFeatures } = useSpotify();

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
        const fetchFeaturesForThisSong = async () => {
            const res: AudioFeatures | undefined = await getFeatures(
                songInfo.id
            );
            if (res !== undefined) {
                setFeatures(res);
            }
        };
        fetchFeaturesForThisSong();
    }, [songInfo]);

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
            className={`songDisplay md:flex flex-col flex-wrap justify-center w-full items-center text-[rgba(0,0,0,0.8)] h-fit`}
        >
            <div
                className={`hover h-full flex justify-between flex xs:flex-row items-center p-2 w-full border-[1px]
                 rounded-[10px] backdrop-blur-3xl ${
                     selected &&
                     "border-purple-400 border-[2px] bg-[rgba(186,138,207,0.05)]"
                 }`}
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
                                className="float-left md:max-w-[80px] md:max-h-[80px] max-h-[70px] max-w-[70px]"
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

                        <div className="text-slate-400">
                            {duration && <span>{duration}</span>}{" "}
                            {features?.tempo && (
                                <span> · {features.tempo.toFixed(0)} BPM</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="buttonsArea flex flex-col align-center flex-wrap gap-1 justify-end items-end w-[15%] xs:w-[20%]">
                    {!selected && (
                        <button
                            id="songAddButton"
                            className="buttonselect w-full"
                            onClick={() => {
                                addSong(songInfo);
                            }}
                        >
                            <span className="flex justify-center xs:justify-start items-center w-full">
                                <AddIcon style={{ fontSize: "0.9rem" }} />
                                <span className="hidden xs:flex">ADD</span>
                            </span>
                        </button>
                    )}{" "}
                    {selected && (
                        <button
                            id="songRemoveButton"
                            className="buttoncancel w-full"
                            onClick={() => {
                                removeSong(songInfo);
                            }}
                        >
                            <span className="flex justify-center xs:justify-start items-center w-full">
                                <ClearIcon style={{ fontSize: "0.9rem" }} />
                                <span className="hidden xs:flex">REMOVE</span>
                            </span>
                        </button>
                    )}
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
                                        <span className="hidden xs:flex">
                                            PAUSE
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex justify-center xs:justify-start items-center w-full">
                                        <PlayArrowIcon
                                            style={{ fontSize: "0.9rem" }}
                                        />
                                        <span className="hidden xs:flex">
                                            PLAY
                                        </span>
                                    </div>
                                )}
                            </span>
                        </button>
                    )}
                    {statsButton && !showStats && (
                        <button
                            className="buttonprev w-full"
                            type="button"
                            onClick={() => setThisShowStats(!thisShowStats)}
                        >
                            <span className="flex justify-center xs:justify-start items-center w-full">
                                {thisShowStats ? (
                                    <span>
                                        <VisibilityOffIcon
                                            style={{ fontSize: "1rem" }}
                                        />
                                    </span>
                                ) : (
                                    <BarChartIcon
                                        style={{ fontSize: "1rem" }}
                                    />
                                )}
                                <span className="hidden xs:flex">STATS</span>
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {features && (showStats || thisShowStats) && (
                <FeaturesDisplay
                    features={features}
                    onClose={() => setThisShowStats(false)}
                    songInfo={songInfo}
                />
            )}
        </div>
    );
};

export default SongDisplay;
