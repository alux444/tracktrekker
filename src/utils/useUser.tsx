import axios from "axios";
import { useContext } from "react";
import { DevContext, TokenContext } from "../App";
import useCookieManager from "./useCookieManager";

const useUser = () => {
    const { setUserId } = useContext(DevContext);
    const { setToken } = useContext(TokenContext);
    const { getAuth, getTokenFromUrl, findTokenFromCookie, checkCookie } =
        useCookieManager();

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
            getAuth();
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
            setToken(token);
            await getUserId(token);
            return true;
        }
        return false;
    };

    return { promptUserLogin, getUserId, initialiseCookies };
};

export default useUser;
