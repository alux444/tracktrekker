import React, { useState } from "react";
import useSpotify from "../../utils/useSpotify";

const UserTopItemsPage = () => {
    const [showSongs, setShowSongs] = useState<boolean>(false);
    const [showArtists, setShowArtists] = useState<boolean>(false);

    const { getTopItems } = useSpotify();

    return (
        <div className="flex gap-2">
            <div className="w-[40%] border-[1px] border-purple-500">
                <div className="flex gap-2">
                    <p className="grad">Your Top Songs</p>
                    <button onClick={() => getTopItems("short_term", "track")}>
                        hello
                    </button>
                </div>
            </div>

            <div className="w-[40%] border-[1px] border-purple-500">
                <div className="flex gap-2">
                    <p className="grad">Your Top Artists</p>
                </div>
            </div>
        </div>
    );
};

export default UserTopItemsPage;
