import { SongInfo } from "../interfaces/songInfo";
import useAddSeed from "../utils/useAddSeed";

const SongDisplay = ({ songInfo }: { songInfo: SongInfo }) => {
    const { addSongSeed } = useAddSeed();

    const artists = songInfo.artists.map((artist) => (
        <a key={artist.id} href={artist.external_urls.spotify}>
            <span>{artist.name}</span>
        </a>
    ));

    return (
        <div className="flex justify-between items-center border-[1px] p-5">
            <div className="flex p-1 gap-5 items-center">
                <img src={songInfo.album.images[2].url} />
                <div className="block">
                    <a href={songInfo.external_urls.spotify}>
                        <h2>{songInfo.name}</h2>
                    </a>
                    <div className="flex gap-2">{artists}</div>
                </div>
            </div>
            <div>
                <button
                    className="button1"
                    onClick={() => addSongSeed(songInfo.id)}
                >
                    <span className="button1-content">Add</span>
                </button>
            </div>
        </div>
    );
};

export default SongDisplay;
