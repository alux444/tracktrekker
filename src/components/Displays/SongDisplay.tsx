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
    }, [songs]);

    useEffect(() => {
        const fetchFeaturesForThisSong = async () => {
            const res: AudioFeatures | undefined = await getFeatures(
                songInfo.id
            );
            setFeatures(res);
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

    const artists = songInfo.artists.slice(0, 3).map((artist, index) => (
        <a
            key={artist.id}
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
        >
            <small>
                <span>{artist.name}</span>
                {index === 2 && songInfo.artists.length > 3 && (
                    <span className="">
                        {" "}
                        ...+{songInfo.artists.length - 3} more
                    </span>
                )}
            </small>
        </a>
    ));

    return (
        <div className={`md:flex justify-center w-full text-[rgba(0,0,0,0.8)]`}>
            <div
                className={`hover flex justify-between flex-col xs:flex-row items-center p-3 w-full lg:w-[50%] md:w-[70%] border-[1px]
                 rounded-[30px] backdrop-blur-3xl`}
            >
                <div className="flex p-1 gap-5 items-center flex-col xs:flex-row">
                    <img
                        src={songInfo.album.images[2].url}
                        className="rounded-[10px]"
                    />
                    <div className="block">
                        <a
                            href={songInfo.external_urls.spotify}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h2 className="text-lg flex gap-2 items-center flex-wrap break-all">
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
                            <div className="flex flex-col gap-1s">
                                {artists}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex xs:flex-col xl:flex-row align-center flex-wrap gap-2 items-center justify-center xs:justify-end xs:items-end">
                    {(type === 1 || type === 3) && !selected && (
                        <button
                            className="buttonselect"
                            onClick={() => {
                                addSong(songInfo);
                            }}
                        >
                            <span>
                                <AddIcon />
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
                                <ClearIcon />
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
                                    <PauseIcon />
                                ) : (
                                    <PlayArrowIcon />
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
                                    <VisibilityOffIcon />
                                ) : (
                                    <BarChartIcon />
                                )}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {features &&
                (type === 1 || type === 3) &&
                (showStats || thisShowStats) && (
                    <div className="w-full lg:w-[20vw] md:w-[30vw] p-2">
                        <FeaturesDisplay
                            features={features}
                            popularity={songInfo.popularity}
                        />
                    </div>
                )}
        </div>
    );
};

export default SongDisplay;
