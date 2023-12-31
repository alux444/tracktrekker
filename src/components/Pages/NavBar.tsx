import React, { useContext, useEffect, useState } from "react";
import logo from "../../imgs/logoGreen.png";
import { PromptPageContext, page } from "./Views";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SavedSongsModal from "./SavedSongsModal";
import { LoginContext } from "../../App";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useLocalStorage from "../../utils/useLocalStorage";
import useCookieManager from "../../utils/useCookieManager";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

type NavBarProps = {
    currentPage: page;
    toHome: () => void;
    toAbout: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ currentPage, toHome, toAbout }) => {
    const { setPromptPage } = useContext(PromptPageContext);
    const { userId, savedSongs } = useContext(LoginContext);

    const [openCart, setOpenCart] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { deleteCookies } = useCookieManager();
    const { updateSaved } = useLocalStorage();

    useEffect(() => {
        if (!loading) {
            updateSaved();
        }
    }, [savedSongs]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            id="navbar"
            className="flex gap-4 flex-wrap justify-center p-3 items-center"
        >
            <button
                onClick={() => {
                    toHome();
                    setPromptPage("songs");
                }}
                className="grad text-3xl"
            >
                TrackTrekker
                <img src={logo} className="h-[1.5rem]" />
            </button>
            <div className="flex flex-col gap-[3px] items-start">
                <button
                    className="flex gap-1 items-center"
                    onClick={() => {
                        toHome();
                        setPromptPage("songs");
                    }}
                >
                    {" "}
                    <span
                        className={`${
                            currentPage === "home" && "grad underline"
                        }`}
                    >
                        Home
                    </span>
                    <HomeIcon />
                </button>
                <button onClick={toAbout} className="flex gap-1 items-center">
                    {" "}
                    <span
                        className={`${
                            currentPage === "about" && "grad underline"
                        }`}
                    >
                        About
                    </span>
                    <InfoIcon />
                </button>
                {loading ? (
                    <p>Loading Saved...</p>
                ) : (
                    <button
                        className="flex gap-1 items-center"
                        onClick={() => setOpenCart(true)}
                    >
                        <p>{savedSongs.length} Saved</p>
                        <FavoriteIcon />
                    </button>
                )}
                {userId !== "" && (
                    <button
                        className="flex gap-1 items-center"
                        onClick={deleteCookies}
                    >
                        <p>Log out</p> <ExitToAppIcon />
                    </button>
                )}
            </div>
            {openCart && <SavedSongsModal onClose={() => setOpenCart(false)} />}
        </div>
    );
};

export default NavBar;
