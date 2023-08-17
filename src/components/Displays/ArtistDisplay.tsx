import { useContext, useEffect, useState } from "react";
import { ArtistInfo } from "../../interfaces/artistInfo";
import useManageQuery from "../../utils/useManageQuery";
import { StatsContext } from "../Pages/HomePage";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { ArtistInfoContext } from "../../App";
import useSpotify from "../../utils/useSpotify";
import { SongInfo } from "../../interfaces/songInfo";
import SmallSongDisplay from "./SmallSongDisplay";

const ArtistDisplay = ({
    artist,
    fromSearch,
    type,
}: {
    artist: ArtistInfo;
    fromSearch: boolean;
    type: number;
}) => {
    const { artists } = useContext(ArtistInfoContext);
    const { showStats } = useContext(StatsContext);

    const [thisShowStats, setThisShowStats] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);
    const [topSongs, setTopSongs] = useState<SongInfo[]>([]);

    const { addArtist, removeArtist } = useManageQuery();
    const { getArtistTracks } = useSpotify();

    useEffect(() => {
        const getSongs = async () => {
            const res = await getArtistTracks(artist.id);
            if (res === null) {
                return;
            }
            setTopSongs(res.slice(0, 5));
        };
        getSongs();
    }, [artist]);

    useEffect(() => {
        const checkArtistStatus = () => {
            const isArtistSelected = artists.some(
                (thisArtist) => thisArtist.id === artist.id
            );
            setSelected(isArtistSelected);
        };
        checkArtistStatus();
    }, [artists, artist]);

    const imageSrc =
        artist.images && artist.images.length >= 3 ? artist.images[0].url : "";

    const allSongs = topSongs.map((song) => <SmallSongDisplay song={song} />);

    return (
        <div
            className={`hover flex gap-2 items-center border-[1px] p-2 w-fit rounded-[20px]`}
        >
            <div className="flex flex-col gap-1 text-center items-center">
                <div className="flex gap-1">
                    <h2>
                        {fromSearch
                            ? artist.name.length > 25
                                ? artist.name.slice(0, 22) + "..."
                                : artist.name
                            : artist.name.length > 13
                            ? artist.name.slice(0, 10) + "..."
                            : artist.name}
                    </h2>
                    {!fromSearch && selected && (
                        <button
                            className="hover:border-red-500 hover:text-red-500 border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
                            onClick={() => {
                                removeArtist(artist);
                            }}
                        >
                            <span>&times;</span>
                        </button>
                    )}
                </div>
                <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                >
                    {imageSrc !== "" ? (
                        <img
                            className={`${
                                fromSearch
                                    ? "lg:w-[15vw] w-[25vw]"
                                    : "lg:max-w-[8vw] max-w-[15vw] h-[10vh]"
                            } rounded-[20px]
                    `}
                            src={imageSrc}
                            alt={artist.name}
                        />
                    ) : (
                        <div
                            className={`${
                                fromSearch
                                    ? "lg:w-[15vw] w-[25vw]"
                                    : "lg:max-w-[8vw] max-w-[15vw] h-[10vh]"
                            } rounded-[20px] flex justify-center items-center text-center
                `}
                        >
                            <p>No image avaliable :(</p>
                        </div>
                    )}
                </a>
                <div className="flex items-center flex-wrap gap-2 justify-center align-center">
                    {fromSearch && !selected && (
                        <button
                            className="buttonselect"
                            onClick={() => {
                                addArtist(artist);
                            }}
                        >
                            <span>
                                <AddIcon style={{ fontSize: "1rem" }} />
                            </span>
                        </button>
                    )}
                    {selected && fromSearch && (
                        <button
                            className="buttoncancel"
                            onClick={() => {
                                removeArtist(artist);
                            }}
                        >
                            <span>
                                <ClearIcon style={{ fontSize: "1rem" }} />
                            </span>
                        </button>
                    )}
                    {!showStats && type === 1 && (
                        <button
                            className="buttonprev"
                            type="button"
                            onClick={() => setThisShowStats(!thisShowStats)}
                        >
                            <span className="button1-content">
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
            {(type === 1 || type === 3) && (showStats || thisShowStats) && (
                <div className="flex flex-col w-fit gap-1">{allSongs}</div>
            )}
        </div>
    );
};

export default ArtistDisplay;
