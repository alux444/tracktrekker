import { useContext, useEffect, useState } from "react";
import { DevContext, TokenContext } from "../../App";
import hero from "../../imgs/hero.jpg";
import useUser from "../../utils/useUser";
import getAccessToken from "../../utils/noAuthAccessToken";

const LandingPage = () => {
    const { setToken } = useContext(TokenContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { devMode, setDevMode } = useContext(DevContext);

    const { promptUserLogin, initialiseCookies } = useUser();

    useEffect(() => {
        const checkForCookies = async () => {
            const cookiesExist = await initialiseCookies();

            if (cookiesExist) {
                setLoading(false);
                setDevMode(true);
                return;
            }
        };
        checkForCookies();
    }, []);

    const setAccessToken = async () => {
        setLoading(true);

        if (devMode) {
            const res: number = await promptUserLogin();
            if (res == null) {
                const token = await getAccessToken();
                setToken(token);
                setDevMode(false);
            }
        } else {
            const token = await getAccessToken();
            setToken(token);
        }

        setLoading(false);
    };

    return (
        <div
            id="landing"
            className="p-3 w-[80vw] gap-5 items-center flex flex-col md:flex-row justify-center"
        >
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
