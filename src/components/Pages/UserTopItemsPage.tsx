import React, { useEffect, useState } from "react";
import useSpotify from "../../utils/useSpotify";
import { ArtistInfo } from "../../interfaces/artistInfo";
import { SongInfo } from "../../interfaces/songInfo";

const UserTopItemsPage = () => {
    const [showSongs, setShowSongs] = useState<boolean>(false);
    const [currentTerm, setCurrentTerm] = useState<
        "short_term" | "medium_term" | "long_term"
    >("short_term");
    const [topArtists, setTopArtists] = useState<ArtistInfo>([]);
    const [topSongs, setTopSongs] = useState<SongInfo>([]);

    const { getTopItems } = useSpotify();

    useEffect(() => {
        const getAllItems = async () => {
            const songs = await getTopItems(currentTerm, "track");
            const artists = await getTopItems(currentTerm, "artist");
            console.log(songs);
        };
        getAllItems();
    }, [currentTerm]);

    return (
        <div className="flex gap-2 justify-center">
            <div className="w-[40%] border-[1px] border-purple-500 text-center">
                <div className="flex gap-2">
                    <p className="grad">Your Top Songs</p>
                </div>
            </div>

            <div className="w-[40%] border-[1px] border-purple-500 text-center">
                <div className="flex gap-2">
                    <p className="grad">Your Top Artists</p>
                </div>
            </div>
        </div>
    );
};

export default UserTopItemsPage;
