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
    type,
}: {
    songInfo: SongInfo;
    type: number;
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
    }, []);

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

    let artists = songInfo.artists
        .slice(0, 3)
        .map((artist) => {
            if (artist.name.length > 20) {
                return artist.name.slice(0, 16) + "...";
            } else {
                return artist.name;
            }
        })
        .join(", ");
    if (songInfo.artists.length > 3) {
        artists += ` ...+${songInfo.artists.length - 3}`;
    }

    return (
        <div
            className={`md:flex flex-col justify-center w-full items-center text-[rgba(0,0,0,0.8)]`}
        >
            <div
                className={`hover flex justify-between flex xs:flex-row items-center p-2 w-full lg:w-[50%] md:w-[70%] w-full border-[1px]
                 rounded-[10px] backdrop-blur-3xl`}
            >
                <div className="flex p-1 gap-5 xs:flex-row items-center">
                    <div className="flex-shrink-0 flex flex-col gap-1">
                        <img
                            src={songInfo.album.images[1].url}
                            className="float-left max-w-[64px] max-h-[64px]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <a
                            href={songInfo.external_urls.spotify}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h2 className="text-md flex gap-2 items-center flex-wrap break-all">
                                {songInfo.explicit && (
                                    <div className="border-[1px] rounded-lg text-gray-400 px-[7px]">
                                        E
                                    </div>
                                )}
                                {songInfo.name.length < 30
                                    ? songInfo.name
                                    : songInfo.name.substring(0, 29) + "..."}
                            </h2>
                        </a>
                        <div>
                            <small>{artists}</small>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col xs:flex-row align-center flex-wrap gap-1 items-center justify-center xs:justify-end xs:items-end">
                    {(type === 1 || type === 3) && !selected && (
                        <button
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
                    {songInfo.preview_url && (type === 1 || type === 3) && (
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
                    {!showStats && (type === 1 || type === 3) && (
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

            {features &&
                (type === 1 || type === 3) &&
                (showStats || thisShowStats) && (
                    <div className="w-full md:w-[70%] lg:w-[50%] p-2">
                        <FeaturesDisplay
                            features={features}
                            popularity={songInfo.popularity}
                        />
                    </div>
                )}
            {!features &&
                (type === 1 || type === 3) &&
                (showStats || thisShowStats) && (
                    <div className="w-full md:w-[70%] lg:w-[50%]  p-2">
                        <p className="grad">
                            No Stats Avalaible for this song.
                        </p>
                    </div>
                )}
        </div>
    );
};

export default SongDisplay;
