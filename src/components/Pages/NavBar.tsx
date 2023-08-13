import React, { useContext } from "react";
import { PromptPageContext, page } from "./Views";
import { TokenContext } from "../../App";

type NavBarProps = {
    currentPage: page;
    toHome: () => void;
    toAbout: () => void;
    toSearch: () => void;
};

const NavBar: React.FC<NavBarProps> = ({
    currentPage,
    toHome,
    toAbout,
    toSearch,
}) => {
    const { setPromptPage } = useContext(PromptPageContext);
    const { token } = useContext(TokenContext);
    return (
        <div className="flex gap-8 flex-wrap justify-center mt-3 items-center">
            <h2 className="grad text-3xl">TrackTrekker</h2>
            <div className="flex flex-col gap-[2px]">
                <button
                    className={`${currentPage === "home" && "grad"}`}
                    onClick={() => {
                        toHome();
                        setPromptPage("home");
                    }}
                >
                    Home
                </button>
                <button
                    className={`${currentPage === "about" && "underline grad"}`}
                    onClick={toAbout}
                >
                    About
                </button>
                {token !== null && (
                    <button
                        className={`${
                            currentPage === "viewSearch" && "underline grad"
                        }`}
                        onClick={toSearch}
                    >
                        Current Search
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavBar;
