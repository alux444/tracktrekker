import axios from "axios";
import { useContext } from "react";
import { DevContext } from "../App";

type HashParams = {
    access_token?: string;
};

const useUser = () => {
    const { setUserId } = useContext(DevContext);

    const redirectToSpotifyLogin = async () => {
        const clientId = import.meta.env.VITE_ID;
        const redirectUri = encodeURIComponent(
            "https://alux444.github.io/tracktrekker/"
        );
        // const redirectUri = encodeURIComponent(
        //     "http://localhost:5173/tracktrekker/"
        // );
        const scopes = encodeURIComponent(
            "user-top-read,playlist-modify-public,playlist-modify-private,user-read-private,user-read-email"
        );
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}&show_dialog=true`;
        window.location.href = authUrl;
    };

    const extractAccessTokenFromURL = (): string | null => {
        const hashParams: HashParams = window.location.hash
            .substr(1)
            .split("&")
            .reduce((result, item) => {
                const parts = item.split("=");
                result[parts[0]] = parts[1];
                return result;
            }, {});

        removeAccessTokenFromURL();
        return hashParams.access_token || null;
    };

    const removeAccessTokenFromURL = () => {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );
    };

    const promptUserLogin = async () => {
        const code = extractAccessTokenFromURL();
        if (code === null) {
            redirectToSpotifyLogin();
            return null;
        } else {
            return code;
        }
    };

    const getUserId = async (token: string) => {
        const url = "https://api.spotify.com/v1/me";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, { headers });
            setUserId(response.data.id);
            return response.data;
        } catch (error) {
            return -1;
        }
    };

    return { promptUserLogin, getUserId };
};

export default useUser;
