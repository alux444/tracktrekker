import { useContext, useEffect, useState } from "react";
import { LoginContext, TokenContext } from "../../App";
import hero from "../../imgs/hero.jpg";
import useUser from "../../utils/useUser";
import getAccessToken from "../../utils/noAuthAccessToken";

const LandingPage = () => {
    const { setToken } = useContext(TokenContext);
    const [loading, setLoading] = useState<boolean>(false);
    const { loginMode, setLoginMode } = useContext(LoginContext);

    const { promptUserLogin, initialiseCookies } = useUser();

    useEffect(() => {
        const checkForCookies = async () => {
            const cookiesExist = await initialiseCookies();

            if (cookiesExist) {
                setLoading(false);
                setLoginMode(true);
                return;
            }
        };
        checkForCookies();
    }, []);

    const loginWithSpotify = async () => {
        setLoading(true);

        if (loginMode) {
            const res: number = await promptUserLogin();
            if (res == null) {
                const token = await getAccessToken();
                setToken(token);
                setLoginMode(false);
            }
        } else {
            const token = await getAccessToken();
            setToken(token);
        }

        setLoading(false);
    };

    const loginAsGuest = async () => {
        setLoading(true);

        const token = await getAccessToken();
        setToken(token);

        setLoading(false);
    };

    return (
        <div
            id="landing"
            className="p-3 w-[80vw] gap-5 items-center flex flex-col md:flex-row justify-center"
        >
            <div className="flex flex-col gap-3 items-center">
                <div className="flex flex-col">
                    <h2 className="grad text-4xl ">Find</h2>
                    <h2 className="grad text-4xl">Something</h2>
                    <h2 className="grad text-4xl">New</h2>
                    <p className="grad">Created with Spotify WebAPI</p>
                </div>
                <div className="flex flex-col gap-1">
                    <button
                        className="button1"
                        disabled={loading}
                        onClick={loginWithSpotify}
                    >
                        <span className="button1-content">
                            {loading ? "Loading..." : "Login with Spotify"}
                        </span>
                    </button>
                    <button
                        className="button2 grad"
                        onClick={loginAsGuest}
                        disabled={loading}
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
            <div>
                <img
                    src={hero}
                    className="max-h-[35vh] max-w-[90vw] lg:max-h-[55vh] lg:max-w-[40vw]"
                />
            </div>
        </div>
    );
};

export default LandingPage;
