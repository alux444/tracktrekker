import { useContext, useEffect, useState } from "react";
import { ArtistInfo } from "../../interfaces/artistInfo";
import useManageQuery from "../../utils/useManageQuery";
import FeatureLevel from "./FeatureLevel";
import { StatsContext } from "../Pages/HomePage";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { ArtistInfoContext } from "../../App";

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
    const [selected, setSelected] = useState(false);
    const { addArtist, removeArtist } = useManageQuery();

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

    return (
        <div
            className={`hover flex flex-col gap-2 items-center border-[1px] p-2 text-center ${
                fromSearch
                    ? "xl:w-[15vw] lg:w-[20vw] sm:w-[30vw] w-[40vw]"
                    : "xl:w-[11vw] lg:w-[13vw] sm:w-[20vw] w-[30vw]"
            } justify-between rounded-[30px]`}
        >
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
                        className={`${
                            fromSearch
                                ? "buttoncancel"
                                : "hover:border-red-500 hover:text-red-500 border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
                        }`}
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
                <img
                    className={`${
                        fromSearch
                            ? "lg:w-[15vw] w-[25vw]"
                            : "lg:max-w-[8vw] max-w-[15vw] h-[10vh]"
                    } rounded-[20px]`}
                    src={imageSrc}
                    alt={artist.name}
                />
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
                            <AddIcon />
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
                        <ClearIcon />
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
                                <VisibilityOffIcon />
                            ) : (
                                <BarChartIcon />
                            )}
                        </span>
                    </button>
                )}
            </div>
            {(type === 1 || type === 3) && (showStats || thisShowStats) && (
                <>
                    <div>
                        <small>Followers: {artist.followers.total}</small>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between">
                            <small>Popularity: {artist.popularity}</small>
                        </div>
                        <FeatureLevel inputVal={artist.popularity} gap={10} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ArtistDisplay;
