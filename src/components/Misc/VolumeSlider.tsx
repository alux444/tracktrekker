import { useContext } from "react";
import { AudioContext } from "../Pages/Views";

const VolumeSlider = () => {
    const { volume, setVolume } = useContext(AudioContext);

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
    };

    return (
        <div className=" p-2 rounded-[10px] flex flex-col items-center justify-center text-center">
            <div className="flex gap-1 items-center p-1">
                <p>Volume: {volume}</p>
            </div>
            <input
                className="border-[1px]"
                min={0}
                max={1}
                step={0.05}
                type="range"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
};

export default VolumeSlider;
