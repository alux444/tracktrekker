import { useState } from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CurrentSearchPage from "./CurrentSearchPage";
import NavBar from "./NavBar";
import Footer from "./Footer";

export type page = "home" | "viewSearch" | "about";

const Views = () => {
    const [currentPage, setCurrentPage] = useState<page>("home");

    const toHome = () => {
        setCurrentPage("home");
    };

    const toAbout = () => {
        setCurrentPage("about");
    };

    const toSearch = () => {
        setCurrentPage("viewSearch");
    };

    return (
        <div className="flex gap-2 flex-col justify-center align-center items-center h-screen w-screen text-xs md:text-sm lg:text-md">
            <NavBar
                currentPage={currentPage}
                toHome={toHome}
                toAbout={toAbout}
                toSearch={toSearch}
            />
            {currentPage === "home" && <HomePage />}
            {currentPage === "about" && <AboutPage />}
            {currentPage === "viewSearch" && <CurrentSearchPage />}
            <Footer />
        </div>
    );
};

export default Views;
