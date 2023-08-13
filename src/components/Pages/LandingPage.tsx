import { useContext } from "react";
import { TokenContext } from "../../App";
import getAccessToken from "../../utils/getAccessToken";
import hero from "../../imgs/hero.jpg";

const LandingPage = () => {
    const { setToken } = useContext(TokenContext);

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
        <div className="p-5 w-[80vw] h-[80vh] md:h-[60vh] gap-5 items-center flex flex-col md:flex-row justify-center">
            <div className="flex md:flex-col gap-3 items-end md:items-center">
                <div className="flex flex-col">
                    <h2 className="grad text-3xl ">Find</h2>
                    <h2 className="grad text-3xl">Something</h2>
                    <h2 className="grad text-3xl">New</h2>
                    <p className="grad">Created with Spotify WebAPI</p>
                </div>
                <button className="button1" onClick={setAccessToken}>
                    <span className="button1-content">Get Started</span>
                </button>
            </div>
            <div>
                <img src={hero} className="h-[50vh]" />
            </div>
        </div>
    );
};

export default LandingPage;
