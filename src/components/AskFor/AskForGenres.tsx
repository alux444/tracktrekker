import React, { useContext, useEffect, useState } from "react";
import { GenreContext } from "../../App";
import useSpotify from "../../utils/useSpotify";
import { Select, SelectOption } from "../Multiselect/Select";

interface AskForGenresProps {
    submit: () => void;
}
const AskForGenres: React.FC<AskForGenresProps> = ({ submit }) => {
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
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5 mb-10">
            <h2 className="text-lg grad">Select Genres</h2>
            <Select
                multiple
                optionsRaw={allGenres}
                value={genres}
                onChange={(option) => setGenres(option)}
            />
            <div className="flex gap-2 mt-3">
                <button
                    className="button3 border-purple-500 border-[1px] "
                    onClick={submit}
                >
                    <span className="">Hide</span>
                </button>
            </div>
        </div>
    );
};

export default AskForGenres;
