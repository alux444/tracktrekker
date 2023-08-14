import { useContext, useState } from "react";
import { ArtistInfo } from "../../interfaces/artistInfo";
import useManageQuery from "../../utils/useManageQuery";
import FeatureLevel from "./FeatureLevel";
import { StatsContext } from "../Pages/HomePage";
import BarChartIcon from "@mui/icons-material/BarChart";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const ArtistDisplay = ({
    artist,
    fromSearch,
    type,
}: {
    artist: ArtistInfo;
    fromSearch: boolean;
    type: number;
}) => {
    const { showStats } = useContext(StatsContext);
    const [thisShowStats, setThisShowStats] = useState<boolean>(false);
    const [selected, setSelected] = useState(false);
    const { addArtist, removeArtist } = useManageQuery();

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
            <h2>{artist.name}</h2>
            <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className={`${
                        fromSearch
                            ? "lg:w-[15vw] w-[25vw]"
                            : "lg:w-[8vw] w-[15vw]"
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
                            setSelected(true);
                        }}
                    >
                        <span>
                            <AddIcon />
                        </span>
                    </button>
                )}
                {(!fromSearch || selected) && (
                    <button
                        className="buttoncancel"
                        onClick={() => {
                            removeArtist(artist);
                            setSelected(false);
                        }}
                    >
                        <span>
                            <ClearIcon />
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
