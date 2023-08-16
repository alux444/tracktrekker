type HashParams = {
    access_token?: string;
};

const useUser = () => {
    const redirectToSpotifyLogin = async () => {
        const clientId = import.meta.env.VITE_ID;
        const redirectUri = encodeURIComponent(
            "http://localhost:5173/tracktrekker/"
        );
        const scopes = encodeURIComponent("user-top-read");
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

        return hashParams.access_token || null;
    };

    const promptUserLogin = async () => {
        const code = extractAccessTokenFromURL();
        console.log(code);
        if (code === null) {
            redirectToSpotifyLogin();
            return null;
        } else {
            return code;
        }
    };

    return { promptUserLogin };
};

export default useUser;
