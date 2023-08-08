import { ArtistInfo } from "../../interfaces/artistInfo";
import useManageQuery from "../../utils/useManageQuery";

const ArtistDisplay = ({
    artist,
    fromSearch,
}: {
    artist: ArtistInfo;
    fromSearch: boolean;
}) => {
    const { addArtist, removeArtist } = useManageQuery();

    return (
        <div className="flex flex-col gap-2 items-center border-[1px]">
            <img
                className="w-[20vw] "
                src={artist.images[2].url}
                alt={artist.name}
            />
            <h2>{artist.name}</h2>
            {fromSearch ? (
                <button className="button1" onClick={() => addArtist(artist)}>
                    <span className="button1-content">+</span>
                </button>
            ) : (
                <button
                    className="button1"
                    onClick={() => removeArtist(artist)}
                >
                    <span className="button1-content">&times;</span>
                </button>
            )}
        </div>
    );
};

export default ArtistDisplay;
