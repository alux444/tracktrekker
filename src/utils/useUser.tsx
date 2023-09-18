import axios from "axios";
import { useContext } from "react";
import { DevContext, TokenContext } from "../App";
import useCookieManager from "./useCookieManager";

const useUser = () => {
    const { setUserId } = useContext(DevContext);
    const { setToken } = useContext(TokenContext);
    const { getAuth, getTokenFromUrl } = useCookieManager();

    async function generateCodeChallenge(codeVerifier) {
        function base64encode(uint8Array) {
            const array: number[] = Array.from(uint8Array);
            const string: string = String.fromCharCode.apply(null, array);

            return btoa(string)
                .replace(/\+/g, "-")
                .replace(/\//g, "_")
                .replace(/=+$/, "");
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest("SHA-256", data);

        return base64encode(digest);
    }

    const pkceTest = async () => {
        const clientId = import.meta.env.VITE_ID;
        // const redirectUri = "https://alux444.github.io/tracktrekker/";
        const redirectUri = "http://localhost:5173/tracktrekker/";

        const codeVerifier = generateRandomString(128);

        generateCodeChallenge(codeVerifier).then((codeChallenge) => {
            const state = generateRandomString(16);
            const scope =
                "user-top-read,playlist-modify-public,playlist-modify-private,user-read-private,user-read-email";

            localStorage.setItem("code_verifier", codeVerifier);

            const args = new URLSearchParams({
                response_type: "code",
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: "S256",
                code_challenge: codeChallenge,
            });

            window.location.href =
                "https://accounts.spotify.com/authorize?" + args;
        });
    };

    // Old implicit grant (not recommended)
    // const redirectToSpotifyLogin = async () => {
    //     const clientId = import.meta.env.VITE_ID;
    //     const redirectUri = encodeURIComponent(
    //         "https://alux444.github.io/tracktrekker/"
    //     );
    //     // const redirectUri = encodeURIComponent(
    //     //     "http://localhost:5173/tracktrekker/"
    //     // );
    //     const scopes = encodeURIComponent(
    //         "user-top-read,playlist-modify-public,playlist-modify-private,user-read-private,user-read-email"
    //     );
    //     const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes}&show_dialog=true`;
    //     window.location.href = authUrl;
    // };

    const extractAccessTokenFromURL = async () => {
        console.log("getting token from url");
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const codeVerifier = localStorage.getItem("code_verifier");
        const redirectUri = "http://localhost:5173/tracktrekker/";
        removeAccessTokenFromURL();

        if (codeVerifier && code) {
            const body = new URLSearchParams();
            body.append("grant_type", "authorization_code");
            body.append("code", code);
            body.append("redirect_uri", redirectUri);
            body.append("client_id", import.meta.env.VITE_ID);
            body.append("code_verifier", codeVerifier);

            try {
                const response = await axios.post(
                    "https://accounts.spotify.com/api/token",
                    body.toString(),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                const data = response.data;
                console.log(data);
                getUserId(data.access_token);
                setToken(data.access_token);
                return 1;
            } catch (error) {
                console.error("Error:", error);
            }
        }
        return -1;
    };

    const removeAccessTokenFromURL = () => {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );
    };

    const promptUserLogin = async () => {
        // const urlParams = new URLSearchParams(window.location.search);
        // const code = urlParams.get("code");
        // if (code === null) {
        //     pkceTest();
        //     return null;
        // } else {
        //     const res = await extractAccessTokenFromURL();
        //     return res;
        // }
        const res = await getTokenFromUrl();
        console.log(res);
        if (res == -1) {
            getAuth();
        } else {
            removeAccessTokenFromURL();
        }
        return 1;
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
