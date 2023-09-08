import { useEffect } from "react";
import useSpotify from "../../utils/useSpotify";

const SavedRecommendations = () => {
    const { getSavedRecommendations } = useSpotify();

    useEffect(() => {
        getSavedRecommendations();
    }, []);

    return <div>SavedRecommendations</div>;
};

export default SavedRecommendations;
