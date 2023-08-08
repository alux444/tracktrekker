import axios from "axios";
import { recommendForm } from "../interfaces/recommendForm";
const useSpotify = () => {
    const getAccessToken = async () => {
        const url = "https://accounts.spotify.com/api/token";
        const clientId = import.meta.env.VITE_ID;
        const clientSecret = import.meta.env.VITE_SECRET;

        const headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        };

        const data = new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
        }).toString();

        try {
            const response = await axios.post(url, data, { headers });
            console.log(response.data);
            return response.data.access_token;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getArtistData = async (accessToken: string) => {
        const url = "https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb";

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        try {
            const response = await axios.get(url, { headers });
            console.log(response.data);
            // You can access the artist data from the response here:
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getRecommended = async (
        accessToken: string,
        songForm: recommendForm
    ) => {
        const url = "https://api.spotify.com/v1/recommendations";

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        try {
            const response = await axios.get(url, {
                headers,
                params: songForm,
            });
            console.log(response.data);
            return response.data;
            // You can access the artist data from the response here:
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    return { getAccessToken, getArtistData, getRecommended };
};

export default useSpotify;
