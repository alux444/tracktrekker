import { ArtistInfo } from "../interfaces/artistInfo";

const ArtistDisplay = ({ artist }: { artist: ArtistInfo }) => {
    return (
        <div>
            <img src={artist.images[1].url} />
            <h2>{artist.name}</h2>
        </div>
    );
};

export default ArtistDisplay;
