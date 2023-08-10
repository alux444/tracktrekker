import React, { useState } from "react";

interface AskForExtrasProps {
    submit: () => void;
}

type ExtraCriteria = {
    minAcoustic?: number;
    maxAcoustic?: number;
    targAcoustic?: number;
    minDance?: number;
    maxDance?: number;
    targDance?: number;
    minDuration?: number;
    maxDuration?: number;
    targDuration?: number;
    minEnergy?: number;
    maxEnergy?: number;
    targEnergy?: number;
    minInstrum?: number;
    maxInstrum?: number;
    targInstrum?: number;
    minLively?: number;
    maxLively?: number;
    targLively?: number;
    minLoudness?: number;
    maxLoudness?: number;
    targLoudness?: number;
    minMode?: number;
    maxMode?: number;
    targMode?: number;
    minPopularity?: number;
    maxPopularity?: number;
    targPopularity?: number;
    minSpeech?: number;
    maxSpeech?: number;
    targSpeech?: number;
    minTimeSig?: number;
    maxTimeSig?: number;
    targTimeSig?: number;
    maxValence?: number;
    minValence?: number;
    targValence?: number;
};

const AskForExtra: React.FC<AskForExtrasProps> = ({ submit }) => {
    const [form, setForm] = useState<ExtraCriteria>({});

    const handleChange = (
        criteria: keyof ExtraCriteria,
        value: number | undefined
    ) => {
        if (value === undefined) {
            setForm((prevForm) => ({
                ...prevForm,
                [criteria]: value,
            }));
            return;
        }

        let finalValue: number = value;

        if (value > 1) {
            finalValue = 1;
        }

        if (value < 0) {
            finalValue = 0;
        }

        setForm((prevForm) => ({
            ...prevForm,
            [criteria]: finalValue,
        }));
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5">
            <form className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <input
                        className="border-[1px]"
                        type="number"
                        placeholder="Min Acoustic"
                        value={form.minAcoustic}
                        onChange={(e) =>
                            handleChange(
                                "minAcoustic",
                                parseInt(e.target.value) || undefined
                            )
                        }
                    />
                    <input
                        className="border-[1px]"
                        type="number"
                        placeholder="Max Acoustic"
                        value={form.maxAcoustic}
                        onChange={(e) =>
                            handleChange(
                                "maxAcoustic",
                                parseInt(e.target.value) || undefined
                            )
                        }
                    />
                    <input
                        className="border-[1px]"
                        type="number"
                        placeholder="Target Acoustic"
                        value={form.targAcoustic}
                        onChange={(e) =>
                            handleChange(
                                "targAcoustic",
                                parseInt(e.target.value) || undefined
                            )
                        }
                    />
                </div>
            </form>
            <button className="button1" onClick={submit}>
                <span className="button1-content">Submit</span>
            </button>
        </div>
    );
};

export default AskForExtra;
