import { useContext } from "react";
import { LoginContext } from "../App";

const useLocalStorage = () => {
    const { savedSongs, setSavedSongs } = useContext(LoginContext);

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
