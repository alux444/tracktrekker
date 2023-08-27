import { useContext, useEffect, useState } from "react";
import { GenreContext } from "../../App";
import useSpotify from "../../utils/useSpotify";
import { Select, SelectOption } from "../Multiselect/Select";

const AskForGenres = () => {
    const [allGenres, setAllGenres] = useState<SelectOption[]>([]);
    const { genres, setGenres } = useContext(GenreContext);

    const { getGenres } = useSpotify();

    useEffect(() => {
        const setGenres = async () => {
            const genres = await getGenres();
            const filteredGenres = genres.map((genre: string) => ({
                value: genre,
                label: genre.replace(/-/g, ""),
            }));
            setAllGenres(filteredGenres);
        };
        setGenres();
    }, []);

    return (
        <div
            id="askForGenres"
            className="flex flex-col gap-2 justify-center items-center align-center w-full p-5 mb-10"
        >
            <h2 className="text-lg grad">Select Genres</h2>
            <Select
                multiple
                optionsRaw={allGenres}
                value={genres}
                onChange={(option) => setGenres(option)}
            />
        </div>
    );
};

export default AskForGenres;
