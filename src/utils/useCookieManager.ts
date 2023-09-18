import { useContext } from "react";
import { TokenContext } from "../App";

const useCookieManager = () => {
    const { setToken } = useContext(TokenContext);

    const scope =
        "user-top-read,playlist-modify-public,playlist-modify-private,user-read-private,user-read-email";

    const redirectUri = "https://alux444.github.io/tracktrekker/";
    // const redirectUri = "http://localhost:5173/tracktrekker/";

    const generateRandomString = (length: number) => {
        let text = "";
        const possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }
        return text;
    };

    const getAuth = () => {
        const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
            import.meta.env.VITE_ID
        )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&state=${encodeURIComponent(generateRandomString(16))}`;
        window.location.href = url;
    };

    const getTokenFromUrl = () => {
        const hashParams = new URLSearchParams(
            window.location.hash.replace("#", "?")
        );
        const queryParams = new URLSearchParams(
            window.location.search.replace("#", "?")
        );

        const token = hashParams.get("access_token");
        const error = queryParams.get("error");
        if (token) {
            document.cookie = `token=${token};max-age=3600;samesite=lax;Secure`;
            setToken(token);
            return token;
        } else if (error) {
            console.log(error);
            return null;
        } else {
            return null;
        }
    };

    const findTokenFromCookie = () => {
        if (document.cookie) {
            return (
                document.cookie
                    .split(";")
                    .find((row) => row.startsWith("token="))
                    ?.split("=")[1] || null
            );
        } else {
            return null;
        }
    };

    const checkCookie = () => {
        if (
            document.cookie
                .split(";")
                .some((item) => item.trim().startsWith("token="))
        ) {
            document.cookie = "selection=;max-age=0;samesite=lax;Secure";
        } else {
            document.cookie = "selection=;max-age=0;samesite=lax;Secure";
            localStorage.removeItem("token");
            return null;
        }
    };

    const deleteCookies = () => {
        document.cookie = "token=;max-age=0;samesite=lax;Secure";
        localStorage.removeItem("token");
        window.location.reload();
    };

    return {
        getAuth,
        getTokenFromUrl,
        deleteCookies,
        checkCookie,
        findTokenFromCookie,
    };
};

export default useCookieManager;
