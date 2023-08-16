import axios from "axios";

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
        redirect_uri: "https://alux444.github.io/tracktrekker/",
        scope: "user-top-read",
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

export default getAccessToken;
