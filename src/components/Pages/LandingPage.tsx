import { useContext, useState } from "react";
import { DevContext, TokenContext } from "../../App";
import hero from "../../imgs/hero.jpg";
import useUser from "../../utils/useUser";
import getAccessToken from "../../utils/noAuthAccessToken";
import useLocalStorage from "../../utils/useLocalStorage";

const LandingPage = () => {
    const { setToken } = useContext(TokenContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { devMode, setDevMode } = useContext(DevContext);

    const { promptUserLogin, getUserId } = useUser();
    const { getSaved } = useLocalStorage();

    const setAccessToken = async () => {
        setLoading(true);
        let token: string | null;
        if (devMode) {
            token = await promptUserLogin();
            if (token != null) {
                getUserId(token);
            }
        } else {
            token = await getAccessToken();
        }
        if (token !== null) {
            console.log(token);
            setToken(token);
            setLoading(false);
        } else {
            console.log("error getting token");
        }

        getSaved();
    };

    return (
        <div className="p-3 w-[80vw] gap-5 items-center flex flex-col md:flex-row justify-center">
            <div className="flex flex-col gap-3 items-center md:items-center">
                <div className="flex flex-col">
                    <h2 className="grad text-4xl ">Find</h2>
                    <h2 className="grad text-4xl">Something</h2>
                    <h2 className="grad text-4xl">New</h2>
                    <p className="grad">Created with Spotify WebAPI</p>
                </div>
                <button
                    className="button1"
                    disabled={loading}
                    onClick={setAccessToken}
                >
                    <span className="button1-content">
                        {loading ? "Loading..." : "Get Started"}
                    </span>
                </button>
            </div>
            <div>
                <img
                    src={hero}
                    className="max-h-[35vh] max-w-[90vw] lg:max-h-[55vh] lg:max-w-[40vw]"
                />
                <button onClick={() => setDevMode(!devMode)}>
                    <span className="grad">
                        {devMode ? "Developer Mode" : "TrackTrekker"}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
