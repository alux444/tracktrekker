import { useContext } from "react";
import { DevContext } from "../App";

const useLocalStorage = () => {
    const { savedSongs, setSavedSongs } = useContext(DevContext);

    const updateSaved = () => {
        console.log("updating saved");
        localStorage.setItem("saved", JSON.stringify(savedSongs));
    };

    const getSaved = () => {
        const storedObject = localStorage.getItem("saved");
        if (storedObject == null) {
            console.log("No saved songs");
            return;
        }
        const res = JSON.parse(storedObject);
        setSavedSongs(res);
        console.log(res);
    };

    return { updateSaved, getSaved };
};

export default useLocalStorage;
