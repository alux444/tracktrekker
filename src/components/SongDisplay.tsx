import { SongInfo } from "../interfaces/songInfo";

const SongDisplay = ({ songInfo }: { songInfo: SongInfo }) => {
    const artists = songInfo.artists.map((artist) => (
        <a key={artist.id} href={artist.external_urls.spotify}>
            <span>{artist.name}</span>
        </a>
    ));

    return (
        <div>
            <img src={songInfo.album.images[1].url} />
            <a href={songInfo.external_urls.spotify}>
                <h2>{songInfo.name}</h2>
            </a>
            <div className="flex gap-2">{artists}</div>
        </div>
    );
};

export default SongDisplay;
