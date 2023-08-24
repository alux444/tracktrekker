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

const SongDisplay = ({ songInfo }: { songInfo: SongInfo }) => {
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
                    setCurrentPlayingId(null);
                }
                thisAudio.play();
                setAudioIsPlaying(true);
                setAudio(thisAudio);
                setCurrentPlayingId(songInfo.id);
            }
        }
    };

    const artists = songInfo.artists.map((artist) => artist.name).join(", ");

    const totalSeconds = Math.floor(songInfo.duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const duration: string = `${minutes}:${seconds}`;

    return (
        <div
            className={`songDisplay md:flex flex-col justify-center w-full items-center text-[rgba(0,0,0,0.8)] h-fit`}
        >
            <div
                className={`hover h-full flex justify-between flex xs:flex-row items-center p-2 w-full lg:w-[50%] md:w-[70%] w-full border-[1px]
                 rounded-[10px] backdrop-blur-3xl ${
                     selected && "border-purple-400 border-[2px]"
                 }`}
            >
                <div className="h-full flex p-1 gap-5 xs:flex-row items-center w-[90%]">
                    <div className="flex-shrink-0 flex flex-col gap-1">
                        <img
                            src={songInfo.album.images[1].url}
                            className="float-left max-w-[64px] max-h-[64px]"
                        />
                    </div>
                    <div className="flex justify-between gap-3 flex-col h-full w-[65%]">
                        <div className="flex flex-col w-full">
                            <a
                                href={songInfo.external_urls.spotify}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <h2 className="text-md flex gap-2 w-full overflow-hidden">
                                    {songInfo.explicit && (
                                        <div className="border-[1px] rounded-lg text-gray-400 px-[7px]">
                                            E
                                        </div>
                                    )}
                                    <span className="truncate max-w-full">
                                        {songInfo.name}
                                    </span>
                                </h2>
                            </a>
                            <div className="text-xs text-slate-400 flex gap-2 w-full overflow-hidden">
                                <span className="truncate max-w-full">
                                    {artists}
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
                <div className="w-[10%] flex flex-col align-center flex-wrap gap-1 items-center justify-center xs:justify-end xs:items-end">
                    {!selected && (
                        <button
                            id="songAddButton"
                            className="buttonselect"
                            onClick={() => {
                                addSong(songInfo);
                            }}
                        >
                            <span>
                                <AddIcon style={{ fontSize: "1rem" }} />
                            </span>
                        </button>
                    )}{" "}
                    {selected && (
                        <button
                            id="songRemoveButton"
                            className="buttoncancel"
                            onClick={() => {
                                removeSong(songInfo);
                            }}
                        >
                            <span>
                                <ClearIcon style={{ fontSize: "1rem" }} />
                            </span>
                        </button>
                    )}
                    {songInfo.preview_url && (
                        <button
                            className="buttonprev"
                            type="button"
                            onClick={playPreview}
                        >
                            <span>
                                {currentPlayingId === songInfo.id ? (
                                    <PauseIcon style={{ fontSize: "1rem" }} />
                                ) : (
                                    <PlayArrowIcon
                                        style={{ fontSize: "1rem" }}
                                    />
                                )}
                            </span>
                        </button>
                    )}
                    {!showStats && (
                        <button
                            className="buttonprev"
                            type="button"
                            onClick={() => setThisShowStats(!thisShowStats)}
                        >
                            <span>
                                {thisShowStats ? (
                                    <VisibilityOffIcon
                                        style={{ fontSize: "1rem" }}
                                    />
                                ) : (
                                    <BarChartIcon
                                        style={{ fontSize: "1rem" }}
                                    />
                                )}
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
