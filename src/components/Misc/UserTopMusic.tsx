import React, { useState } from "react";

const UserTopMusic = () => {
    const [showSongs, setShowSongs] = useState<boolean>(false);
    const [showArtists, setShowArtists] = useState<boolean>(false);

    return (
        <div className="flex gap-2">
            <div className="w-[40%] border-[1px] border-purple-500">
                <div className="flex gap-2">
                    <p className="grad">Your Top Songs</p>
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

export default UserTopMusic;
