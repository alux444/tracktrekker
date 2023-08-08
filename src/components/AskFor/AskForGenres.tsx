import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../App";
import useSpotify from "../../utils/useSpotify";
import { Select, SelectOption } from "../Multiselect/Select";

interface AskForGenresProps {
    submit: () => void;
    goBack: () => void;
}
const AskForGenres: React.FC<AskForGenresProps> = ({ submit, goBack }) => {
    const [allGenres, setAllGenres] = useState<SelectOption[]>([]);
    const [value, setValue] = useState<SelectOption>({
        label: "hardstyle",
        value: "hardstyle",
    });
    const { token } = useContext(TokenContext);

    const { getGenres } = useSpotify();

    useEffect(() => {
        const setGenres = async () => {
            const genres = await getGenres(token);
            const filteredGenres = genres.map((genre) => ({
                value: genre,
                label: genre.replace(/-/g, " "),
            }));
            setAllGenres(filteredGenres);
        };
        setGenres();
    }, []);

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-5">
            <h2>Select Genres (Minimum 1)</h2>
            <Select options={allGenres} value={value} />
            <div className="flex gap-2">
                <button className="button1" onClick={goBack}>
                    <span className="button1-content">Back</span>
                </button>
                <button className="button1" onClick={submit}>
                    <span className="button1-content">Submit</span>
                </button>
            </div>
        </div>
    );
};

export default AskForGenres;
