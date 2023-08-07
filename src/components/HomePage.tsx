import React, { useState } from "react";
import { recommendForm } from "../interfaces/recommendForm";
import useSpotify from "../utils/useSpotify";

const HomePage = () => {
    const [songForm, setSongForm] = useState<recommendForm>({
        seed_artists: "test",
        seed_genres: "hardstyle",
        seed_tracks: "test",
    });

    const { getRecommended } = useSpotify();

    return <div>HomePage</div>;
};

export default HomePage;
