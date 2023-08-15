import { useContext, useState } from "react";
import { TokenContext } from "../../App";
import getAccessToken from "../../utils/getAccessToken";
import hero from "../../imgs/hero.jpg";

const LandingPage = () => {
    const { setToken } = useContext(TokenContext);
    const [loading, setLoading] = useState<boolean>(false);

    const setAccessToken = async () => {
        setLoading(true);
        const token: string | null = await getAccessToken();
        if (token !== null) {
            console.log(token);
            setToken(token);
            setLoading(false);
        } else {
            console.log("error getting token");
        }
    };

    return (
        <div className="p-3 w-[80vw] gap-5 items-center flex flex-col md:flex-row justify-center">
            <div className="flex flex-col gap-3 items-center md:items-center">
                <div className="flex flex-col">
                    <h2 className="grad text-3xl ">Find</h2>
                    <h2 className="grad text-3xl">Something</h2>
                    <h2 className="grad text-3xl">New</h2>
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
                <img src={hero} className="h-[35vh] lg:h-[50vh]" />
            </div>
        </div>
    );
};

export default LandingPage;
