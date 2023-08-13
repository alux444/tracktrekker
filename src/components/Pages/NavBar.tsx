import React, { useContext } from "react";
import { PromptPageContext, page } from "./Views";

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
    return (
        <div className="flex flex-col gap-1 justify-center items-center text-center mt-3">
            <h2 className="grad text-3xl">TrackTrekker</h2>
            <div className="flex gap-8 flex-wrap justify-center">
                <button
                    className={`${currentPage === "home" && "underline"}`}
                    onClick={() => {
                        toHome();
                        setPromptPage("home");
                    }}
                >
                    Home
                </button>
                <button
                    className={`${currentPage === "viewSearch" && "underline"}`}
                    onClick={toSearch}
                >
                    Current Search
                </button>
                <button
                    className={`${currentPage === "about" && "underline"}`}
                    onClick={toAbout}
                >
                    About
                </button>
            </div>
        </div>
    );
};

export default NavBar;
