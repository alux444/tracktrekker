import React, { createContext, useState } from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import CurrentSearchPage from "./CurrentSearchPage";
import NavBar from "./NavBar";
import Footer from "./Footer";

export type page = "home" | "viewSearch" | "about";
export type PromptPage =
    | "home"
    | "songs"
    | "artists"
    | "genres"
    | "extras"
    | "results";

export const PromptPageContext = createContext<{
    promptPage: PromptPage;
    setPromptPage: React.Dispatch<React.SetStateAction<PromptPage>>;
}>({ promptPage: "home", setPromptPage: () => {} });

export const AudioContext = createContext<{
    audio: HTMLAudioElement | null;
    setAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
    audioIsPlaying: boolean;
    setAudioIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    currentPlayingId: string | null;
    setCurrentPlayingId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    audio: null,
    setAudio: () => {},
    audioIsPlaying: false,
    setAudioIsPlaying: () => {},
    currentPlayingId: null,
    setCurrentPlayingId: () => {},
});

const Views = () => {
    const [currentPage, setCurrentPage] = useState<page>("home");
    const [promptPage, setPromptPage] = useState<PromptPage>("home");
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [audioIsPlaying, setAudioIsPlaying] = useState<boolean>(false);
    const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(
        null
    );

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
        <PromptPageContext.Provider value={{ promptPage, setPromptPage }}>
            <AudioContext.Provider
                value={{
                    audio,
                    setAudio,
                    audioIsPlaying,
                    setAudioIsPlaying,
                    currentPlayingId,
                    setCurrentPlayingId,
                }}
            >
                <div className="flex gap-2 flex-col justify-center align-center items-center h-fit w-screen text-xs md:text-sm lg:text-md">
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
            </AudioContext.Provider>
        </PromptPageContext.Provider>
    );
};

export default Views;
