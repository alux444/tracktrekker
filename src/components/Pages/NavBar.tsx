import React, { useContext } from "react";
import { PromptPageContext, page } from "./Views";

type NavBarProps = {
    currentPage: page;
    toHome: () => void;
    toAbout: () => void;
};

const NavBar: React.FC<NavBarProps> = ({ currentPage, toHome, toAbout }) => {
    const { setPromptPage } = useContext(PromptPageContext);
    return (
        <div className="flex gap-8 flex-wrap justify-center p-3 items-center">
            <button
                onClick={() => {
                    toHome();
                    setPromptPage("home");
                }}
                className="grad text-3xl"
            >
                TrackTrekker
            </button>
            <div className="flex flex-col gap-[3px]">
                <button
                    className={`${
                        currentPage === "home" &&
                        "grad border-purple-500 border-[1px] p-1 rounded-[10px]"
                    }`}
                    onClick={() => {
                        toHome();
                        setPromptPage("home");
                    }}
                >
                    Home
                </button>
                <button
                    className={`${
                        currentPage === "about" &&
                        "grad border-purple-500 border-[1px] p-1 rounded-[10px]"
                    }`}
                    onClick={toAbout}
                >
                    About
                </button>
            </div>
        </div>
    );
};

export default NavBar;
