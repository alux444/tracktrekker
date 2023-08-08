import { useContext } from "react";
import { RecommendForm } from "../../interfaces/recommendForm";
import { ArtistSeedContext, GenreContext, SongSeedContext } from "../../App";

const AskForExtra = ({ submit, goBack }) => {
    const { songSeeds } = useContext(SongSeedContext);
    const { artistSeeds } = useContext(ArtistSeedContext);
    const { genres } = useContext(GenreContext);

    const generateForm = () => {
        const genreValues: string[] = [];
        genres.filter((genre) => {
            genreValues.push(genre.value);
        });

        const form: RecommendForm = {
            seed_tracks: songSeeds,
            seed_artists: artistSeeds,
            seed_genres: genreValues,
        };

        console.log(form);
    };

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-5">
            Extra Criteria (Optional)
            <button onClick={generateForm}>aaa</button>
            <button className="button1" onClick={goBack}>
                <span className="button1-content">Back</span>
            </button>
            <button className="button1" onClick={submit}>
                <span className="button1-content">Submit</span>
            </button>
        </div>
    );
};

export default AskForExtra;
