import { useContext } from "react";
import { DevContext, TokenContext } from "../App";
import axios from "axios";
import { SongInfo } from "../interfaces/songInfo";

const usePlaylist = () => {
    const { token } = useContext(TokenContext);
    const { userId } = useContext(DevContext);

    const createPlaylist = async (songs: SongInfo[]) => {
        const num: number = Math.floor(Math.random() * 1000);
        console.log(userId);

        const url = `https://api.spotify.com/v1/users/${userId}/playlists`;

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        const body = {
            name: `TrackTrekker Playlist ${num}`,
            description:
                "Made with TrackTrekker at https://alux444.github.io/tracktrekker/",
        };

        let playlistId: string = "";

        try {
            const response = await axios.post(url, body, {
                headers,
            });
            console.log(response.data);
            playlistId = response.data.id;
        } catch (error) {
            console.log(error);
            return null;
        }

        songs.map((song) => {
            console.log(song.id);
        });
    };

    return { createPlaylist };
};

export default usePlaylist;
