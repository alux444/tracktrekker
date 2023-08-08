import { ArtistInfo } from "../interfaces/artistInfo";

const ArtistDisplay = ({ artist }: { artist: ArtistInfo }) => {
    if (
        !artist ||
        !artist.images ||
        !artist.images[0] ||
        !artist.images[0].url
    ) {
        return null;
    }

    return (
        <div>
            <img src={artist.images[1].url} alt={artist.name} />
            <h2>{artist.name}</h2>
        </div>
    );
};

export default ArtistDisplay;
