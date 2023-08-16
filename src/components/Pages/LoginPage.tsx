import useSpotify from "../../utils/useSpotify";

const LoginPage = () => {
    const { getTopItems } = useSpotify();

    return (
        <div>
            <button onClick={() => getTopItems("medium_term", "track")}>
                AAa
            </button>
        </div>
    );
};

export default LoginPage;
