import { useState } from "react";
import { ArtistInfo } from "../../interfaces/artistInfo";
import useManageQuery from "../../utils/useManageQuery";

const ArtistDisplay = ({
    artist,
    fromSearch,
}: {
    artist: ArtistInfo;
    fromSearch: boolean;
}) => {
    const [selected, setSelected] = useState(false);
    const { addArtist, removeArtist } = useManageQuery();

    const imageSrc =
        artist.images && artist.images.length >= 3 ? artist.images[2].url : "";

    return (
        <div className="flex flex-col gap-2 items-center border-[1px] p-2 w-[15vw] w-[30vvw]">
            <h2>{artist.name}</h2>
            <a href={artist.external_urls.spotify}>
                <img
                    className="lg:w-[15vw] w-[25vw]"
                    src={imageSrc}
                    alt={artist.name}
                />
            </a>
            <div className="flex items-center flex-wrap gap-2 justify-center">
                {fromSearch && !selected && (
                    <button
                        className="buttonselect"
                        onClick={() => {
                            addArtist(artist);
                            setSelected(true);
                        }}
                    >
                        <span>+</span>
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
                        <span>&times;</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ArtistDisplay;
