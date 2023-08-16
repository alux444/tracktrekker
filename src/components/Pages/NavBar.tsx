import React, { useContext } from "react";
import { PromptPageContext, page } from "./Views";

type NavBarProps = {
    currentPage: page;
    toHome: () => void;
    toAbout: () => void;
    toTutorial: () => void;
};

const NavBar: React.FC<NavBarProps> = ({
    currentPage,
    toHome,
    toAbout,
    toTutorial,
}) => {
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
                <button onClick={toTutorial}>
                    <span
                        className={`${
                            currentPage === "tutorial" && "grad underline"
                        }`}
                    >
                        Tutorial
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
