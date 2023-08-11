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
        <div className="lg:flex justify-center border-[1px]">
            <div className="flex justify-between items-center border-[1px] p-5 w-[90vw] lg:w-[30vw]">
                <div className="flex p-1 gap-5 items-center">
                    <img src={songInfo.album.images[2].url} />
                    <div className="block">
                        <a href={songInfo.external_urls.spotify}>
                            <h2 className="text-xl">
                                {songInfo.name.length < 30
                                    ? songInfo.name
                                    : songInfo.name.substring(0, 29) + "..."}
                            </h2>
                        </a>
                        <div className="flex flex-col gap-1s">{artists}</div>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    {type === 1 && !selected && (
                        <button
                            className="buttonselect"
                            onClick={() => {
                                addSong(songInfo);
                                setSelected(true);
                            }}
                        >
                            <span>+</span>
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
                </div>
            </div>
            <div className="border-2 w-[90vw] lg:w-[20vw] p-2">
                {features && type === 1 && (
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
