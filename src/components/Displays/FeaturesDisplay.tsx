import { useContext, useEffect, useRef, useState } from "react";
import { AudioFeatures } from "../../interfaces/audioFeatures";
import useOutsideClick from "../../utils/useOutsideClose";
import { SongInfo } from "../../interfaces/songInfo";
import SongDisplay from "./SongDisplay";
import StatsBar from "./StatsBar";
import { ExtrasContext } from "../../App";
import { ExtraInfo } from "../../interfaces/extrasInfo";

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
        console.log(extras);
    }, []);

    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div
                ref={modalRef}
                className="bg-white flex flex-col p-2 rounded-lg shadow-md flex items-center w-[90vw] lg:w-[60vw] xl:w-[45vw] z-10 max-h-[90vh] overflow-auto"
            >
                <div className="flex flex-col gap-1 items-center w-full">
                    <SongDisplay songInfo={songInfo} />
                </div>
                <div className="flex justify-between p-4 h-[300px] w-full border-2">
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
                        value={features.valence}
                        filters={filters}
                        type={"valence"}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeaturesDisplay;
