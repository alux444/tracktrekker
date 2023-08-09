import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";

const SongDisplay = ({
    songInfo,
    type,
}: {
    songInfo: SongInfo;
    type: number;
}) => {
    const { addSong, removeSong } = useManageQuery();

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
                        <h2 className="text-xl">{songInfo.name}</h2>
                    </a>
                    <div className="flex gap-2">{artists}</div>
                </div>
            </div>
            <div>
                {type === 1 && (
                    <button
                        className="button1"
                        onClick={() => addSong(songInfo)}
                    >
                        <span className="button1-content">Add</span>
                    </button>
                )}{" "}
                {type === 2 && (
                    <button
                        className="button1"
                        onClick={() => removeSong(songInfo)}
                    >
                        <span className="button1-content">&times;</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SongDisplay;
