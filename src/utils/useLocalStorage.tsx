import { useContext } from "react";
import { DevContext } from "../App";

const useLocalStorage = () => {
    const { songCart } = useContext(DevContext);

    const updateSaved = () => {
        localStorage.setItem("saved", JSON.stringify(songCart));
    };

    const getSaved = () => {
        const storedObject = localStorage.getItem("saved");
        if (storedObject == null) {
            console.log("No saved songs");
            return;
        }
        const res = JSON.parse(storedObject);
        console.log(res);
    };

    return { updateSaved, getSaved };
};

export default useLocalStorage;
