import React, { useContext } from "react";
import logo from "../../imgs/logoGreen.png";
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
                <img src={logo} className="h-[1.5rem]" />
            </button>
            <div className="flex flex-col gap-[3px]">
                <button
                    onClick={() => {
                        toHome();
                        setPromptPage("home");
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
                </button>
                <button onClick={toAbout}>
                    {" "}
                    <span
                        className={`${
                            currentPage === "about" && "grad underline"
                        }`}
                    >
                        About
                    </span>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
