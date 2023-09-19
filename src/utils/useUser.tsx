import axios from "axios";
import { useContext } from "react";
import { DevContext, TokenContext } from "../App";
import useCookieManager from "./useCookieManager";

const useUser = () => {
    const { setUserId } = useContext(DevContext);
    const { setToken } = useContext(TokenContext);
    const {
        getAuth,
        getTokenFromUrl,
        findTokenFromCookie,
        checkCookie,
        deleteCookies,
    } = useCookieManager();

    const removeAccessTokenFromURL = () => {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );
    };

    const promptUserLogin = async () => {
        const res = await getTokenFromUrl();
        if (res == null) {
            await getAuth();
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get("code");
            if (code) {
                window.location.reload();
            }
        } else {
            removeAccessTokenFromURL();
            await getUserId(res);
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

    const initialiseCookies = async () => {
        checkCookie();
        const hashCode = getTokenFromUrl();
        let token = findTokenFromCookie();

        if (!token && hashCode) {
            token = getTokenFromUrl();
        } else if (token && hashCode) {
            token = getTokenFromUrl();
        }

        window.location.hash = "";

        if (token) {
            const isTokenValid = await checkTokenIsValid(token);
            console.log(isTokenValid);

            if (!isTokenValid) {
                deleteCookies();
                return false;
            }

            await getUserId(token);
            setToken(token);
            return true;
        }
        return false;
    };

    const checkTokenIsValid = async (token: string) => {
        const url =
            "https://api.spotify.com/v1/recommendations/available-genre-seeds";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, { headers });
            return response;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    return { promptUserLogin, getUserId, initialiseCookies };
};

export default useUser;
