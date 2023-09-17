import { useContext } from "react";
import { DevContext } from "../App";

const useLocalStorage = () => {
    const { savedSongs, setSavedSongs } = useContext(DevContext);

    const updateSaved = () => {
        localStorage.setItem("saved", JSON.stringify(savedSongs));
    };

    const getSaved = () => {
        const storedObject = localStorage.getItem("saved");
        if (storedObject == null) {
            return;
        }
        const res = JSON.parse(storedObject);
        setSavedSongs(res);
    };

    return { updateSaved, getSaved };
};

export default useLocalStorage;
