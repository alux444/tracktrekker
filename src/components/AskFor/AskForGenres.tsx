import React, { useContext, useEffect, useState } from "react";
import { GenreContext, TokenContext } from "../../App";
import useSpotify from "../../utils/useSpotify";
import { Select, SelectOption } from "../Multiselect/Select";

interface AskForGenresProps {
    submit: () => void;
}
const AskForGenres: React.FC<AskForGenresProps> = ({ submit }) => {
    const [allGenres, setAllGenres] = useState<SelectOption[]>([]);
    const { token } = useContext(TokenContext);
    const { genres, setGenres } = useContext(GenreContext);

    const { getGenres } = useSpotify();

    useEffect(() => {
        const setGenres = async () => {
            const genres = await getGenres(token);
            const filteredGenres = genres.map((genre) => ({
                value: genre,
                label: genre.replace(/-/g, ""),
            }));
            setAllGenres(filteredGenres);
        };
        setGenres();
    }, []);

    return (
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5">
            <h2>Select Genres</h2>
            <Select
                multiple
                optionsRaw={allGenres}
                value={genres}
                onChange={(option) => setGenres(option)}
            />
            <div className="flex gap-2 mt-3">
                <button className="button1" onClick={submit}>
                    <span className="button1-content">Submit</span>
                </button>
            </div>
        </div>
    );
};

export default AskForGenres;
