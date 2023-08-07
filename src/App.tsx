import { useState } from "react";
import useSpotify from "./utils/useSpotify";
import { recommendForm } from "./interfaces/recommendForm";

function App() {
    const [token, setToken] = useState<string | undefined>();
    const [songForm, setSongForm] = useState<recommendForm>({
        seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
        seed_genres: "hardstyle",
        seed_tracks: "0c6xIDDpzE81m2q797ordA",
    });

    const { getAccessToken, getArtistData, getRecommended } = useSpotify();

    const setAccessToken = async () => {
        const token: string | null = await getAccessToken();
        if (token !== null) {
            console.log(token);
            setToken(token);
        } else {
            console.log("error getting token");
        }
    };

    return (
        <>
            <p className="text-[red]">Hello</p>
            <button onClick={setAccessToken}>Get Token</button>
            <button onClick={() => getArtistData(token)}>abssds</button>
            <button onClick={() => getRecommended(token, songForm)}>
                anasjid
            </button>
        </>
    );
}

export default App;
