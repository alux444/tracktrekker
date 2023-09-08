import { useContext } from "react";
import { DevContext } from "../App";

const useLocalStorage = () => {
    const { songCart, setSongCart } = useContext(DevContext);

    const updateSaved = () => {
        console.log("updating saved");
        localStorage.setItem("saved", JSON.stringify(songCart));
    };

    const getSaved = () => {
        const storedObject = localStorage.getItem("saved");
        if (storedObject == null) {
            console.log("No saved songs");
            return;
        }
        const res = JSON.parse(storedObject);
        setSongCart(res);
        console.log(res);
    };

    return { updateSaved, getSaved };
};

export default useLocalStorage;
