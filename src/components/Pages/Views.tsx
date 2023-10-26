import React, { createContext, useEffect, useState } from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import NavBar from "./NavBar";
import Footer from "./Footer";

export type page = "home" | "about";
export type PromptPage = "user" | "songs" | "artists" | "genres" | "results";

export const PromptPageContext = createContext<{
    promptPage: PromptPage;
    setPromptPage: React.Dispatch<React.SetStateAction<PromptPage>>;
}>({ promptPage: "songs", setPromptPage: () => {} });

export const AudioContext = createContext<{
    audio: HTMLAudioElement | null;
    setAudio: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
    audioIsPlaying: boolean;
    setAudioIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    currentPlayingId: string | null;
    setCurrentPlayingId: React.Dispatch<React.SetStateAction<string | null>>;
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
}>({
    audio: null,
    setAudio: () => {},
    audioIsPlaying: false,
    setAudioIsPlaying: () => {},
    currentPlayingId: null,
    setCurrentPlayingId: () => {},
    volume: 0.2,
    setVolume: () => {},
});

const Views = () => {
    const [currentPage, setCurrentPage] = useState<page>("home");
    const [promptPage, setPromptPage] = useState<PromptPage>("songs");
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [audioIsPlaying, setAudioIsPlaying] = useState<boolean>(false);
    const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(
        null
    );
    const [volume, setVolume] = useState<number>(0.2);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 32) {
                if (audioIsPlaying) {
                    audio?.pause();
                } else {
                    audio?.play();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (audio !== null) {
            audio.play();
            setAudioIsPlaying(true);
        }
    }, [audio]);

    useEffect(() => {
        const handleVolumeChange = () => {
            if (audio) {
                audio.volume = volume;
            }
        };

        handleVolumeChange();
    }, [audio, volume]);

    useEffect(() => {
        if (currentPage !== "home") {
            if (audio !== null) {
                audio.pause();
                setAudioIsPlaying(false);
            }
        }
    }, [currentPage]);

    useEffect(() => {
        if (audio !== null) {
            audio.pause();
            setAudio(null);
            setAudioIsPlaying(false);
        }
    }, [promptPage]);

    const toHome = () => {
        setCurrentPage("home");
    };

    const toAbout = () => {
        setCurrentPage("about");
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
                    volume,
                    setVolume,
                }}
            >
                <div className="flex gap-2 flex-col justify-between min-h-screen items-center h-fit w-[100%] text-xs md:text-sm lg:text-md ">
                    <NavBar
                        currentPage={currentPage}
                        toHome={toHome}
                        toAbout={toAbout}
                    />
                    {currentPage === "home" && <HomePage />}
                    {currentPage === "about" && <AboutPage />}
                    <Footer />
                </div>
            </AudioContext.Provider>
        </PromptPageContext.Provider>
    );
};

export default Views;
