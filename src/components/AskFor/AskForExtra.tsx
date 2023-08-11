import React, { useState } from "react";
import ExtraInputPattern from "./ExtraInputPattern";

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
    minPopularity?: number;
    maxPopularity?: number;
    targPopularity?: number;
    minSpeech?: number;
    maxSpeech?: number;
    targSpeech?: number;
    maxValence?: number;
    minValence?: number;
    targValence?: number;
};

const descriptions = {
    acousticness:
        "A measure of how acoustic a track is, where 1 is most acoustic.",
    danceability:
        "A measure of how well a track is suited for dancing, where 1 is most dancable.",
    energy: "A measure of intensity and activity of the track, where 1 is most intense",
    instrumentalness:
        "A measure of the instrumentalness of the track. Values above 0.5 likely contain no vocals.",
    liveness:
        "A measure of the probability of the track being performed live. Values above 0.8 are likely live recordings.",
    loudness:
        "A measure of the overall loudness of a track in dB. Values typically range from -60 to 0 dB.",
    popularity:
        "A measure of the popularity of a track, where 100 is most popular",
    speechiness:
        "A measure of presence of spoken word in the track. Values above 0.66 are likely all spoken words, and values under 0.33 likely have no speech.",
    tempo: "Estimated Beats per Minute of a track.",
    valence:
        "A measure of the positiveness of a track, where 1 is most cheerful or euphoric sounding.",
};

const AskForExtra: React.FC<AskForExtrasProps> = ({ submit }) => {
    const [form, setForm] = useState<ExtraCriteria>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentDescription, setCurrentDescription] = useState("");

    const handleChangeZeroToOne = (
        criteria: keyof ExtraCriteria,
        value: number | undefined
    ) => {
        setForm((prevForm) => ({
            ...prevForm,
            [criteria]: value,
        }));
    };

    const handleDialogOpen = (description: string) => {
        setCurrentDescription(description);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5">
            <form className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <ExtraInputPattern
                        label="Acoustic"
                        value={form.minAcoustic}
                        changeFunction={(val) =>
                            handleChangeZeroToOne("minAcoustic", val)
                        }
                        type="Min"
                    />
                    <ExtraInputPattern
                        label="Acoustic"
                        value={form.maxAcoustic}
                        changeFunction={(val) =>
                            handleChangeZeroToOne("maxAcoustic", val)
                        }
                        type="Max"
                    />
                    <ExtraInputPattern
                        label="Acoustic"
                        value={form.targAcoustic}
                        changeFunction={(val) =>
                            handleChangeZeroToOne("targAcoustic", val)
                        }
                        type="Target"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            handleDialogOpen(descriptions.acousticness)
                        }
                    >
                        ?
                    </button>
                </div>
            </form>
            <button className="button1" onClick={submit}>
                <span className="button1-content">Submit</span>
            </button>
            <dialog
                className="border-[1px] p-2"
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <div className="dialog-content flex gap-2 items-center align-center justify-center">
                    <p>{currentDescription}</p>
                    <button onClick={handleDialogClose}>&times;</button>
                </div>
            </dialog>
        </div>
    );
};

export default AskForExtra;
