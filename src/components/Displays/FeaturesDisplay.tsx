import { useContext, useEffect, useRef, useState } from "react";
import { AudioFeatures } from "../../interfaces/audioFeatures";
import useOutsideClick from "../../utils/useOutsideClose";
import { SongInfo } from "../../interfaces/songInfo";
import SongDisplay from "./SongDisplay";
import StatsBar from "./StatsBar";
import { ExtrasContext } from "../../App";
import { ExtraInfo } from "../../interfaces/extrasInfo";
import logo from "../../imgs/logoGreen.png";

const FeaturesDisplay = ({
    features,
    onClose,
    songInfo,
}: {
    features: AudioFeatures;
    onClose: () => void;
    songInfo: SongInfo;
}) => {
    const { extras } = useContext(ExtrasContext);
    const [filters, setFilters] = useState<ExtraInfo>({});

    useEffect(() => {
        setFilters(extras);
    }, []);

    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div
                ref={modalRef}
                className="bg-dark4 border-[1px] border-dark2 flex flex-col px-5 pb-3 rounded-lg shadow-md flex items-center w-[90vw] lg:w-[60vw] xl:w-[45vw] z-20 max-h-[90vh] overflow-auto"
            >
                <div className="flex flex-col gap-1 items-center w-full">
                    <SongDisplay
                        songInfo={songInfo}
                        statsButton={false}
                        features={null}
                    />
                </div>
                <div className="flex gap-1 flex-col justify-center p-4 w-full">
                    <StatsBar
                        scale={100}
                        value={songInfo.popularity}
                        filters={filters}
                        type={"popularity"}
                    />
                    <StatsBar
                        scale={1}
                        value={features.energy}
                        filters={filters}
                        type={"energy"}
                    />
                    <StatsBar
                        scale={1}
                        value={features.acousticness}
                        filters={filters}
                        type={"acousticness"}
                    />
                    <StatsBar
                        scale={1}
                        value={features.danceability}
                        filters={filters}
                        type={"danceability"}
                    />
                    <StatsBar
                        scale={1}
                        value={features.happiness}
                        filters={filters}
                        type={"happiness"}
                    />
                </div>
                <div className="grad flex gap-1 flex-wrap items-center">
                    <a
                        href="http://spotify.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={logo} className="h-[1.45rem]" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FeaturesDisplay;
