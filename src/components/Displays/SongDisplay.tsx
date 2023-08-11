import { useEffect, useState } from "react";
import { SongInfo } from "../../interfaces/songInfo";
import useManageQuery from "../../utils/useManageQuery";
import useSpotify from "../../utils/useSpotify";
import { AudioFeatures } from "../../interfaces/audioFeatures";
import FeaturesDisplay from "./FeaturesDisplay";

const SongDisplay = ({
    songInfo,
    type,
}: {
    songInfo: SongInfo;
    type: number;
}) => {
    const [selected, setSelected] = useState(false);
    const [features, setFeatures] = useState<AudioFeatures | undefined>();
    const { addSong, removeSong } = useManageQuery();

    const { getFeatures } = useSpotify();

    useEffect(() => {
        const fetchFeaturesForThisSong = async () => {
            const res: AudioFeatures | undefined = await getFeatures(
                songInfo.id
            );
            setFeatures(res);
        };
        fetchFeaturesForThisSong();
    }, []);

    const artists = songInfo.artists.map((artist) => (
        <a key={artist.id} href={artist.external_urls.spotify}>
            <small>
                <span>{artist.name}</span>
            </small>
        </a>
    ));

    return (
        <div className="flex justify-between items-center border-[1px] p-5 max-w-[90vw]">
            <div className="flex p-1 gap-5 items-center">
                <img src={songInfo.album.images[2].url} />
                <div className="block">
                    <a href={songInfo.external_urls.spotify}>
                        <h2 className="text-xl">
                            {songInfo.name.length < 30
                                ? songInfo.name
                                : songInfo.name.substring(0, 30) + "..."}
                        </h2>
                    </a>
                    <div className="flex flex-col gap-1s">{artists}</div>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                {type === 1 && !selected && (
                    <button
                        className="button1"
                        onClick={() => {
                            addSong(songInfo);
                            setSelected(true);
                        }}
                    >
                        <span className="button1-content">+</span>
                    </button>
                )}{" "}
                {(type === 2 || selected) && (
                    <button
                        className="buttoncancel"
                        onClick={() => {
                            removeSong(songInfo);
                            setSelected(false);
                        }}
                    >
                        <span>&times;</span>
                    </button>
                )}
                {features && (
                    <FeaturesDisplay
                        features={features}
                        popularity={songInfo.popularity}
                    />
                )}
            </div>
        </div>
    );
};

export default SongDisplay;
