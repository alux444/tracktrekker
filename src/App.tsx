import { createContext, useState } from "react";
import HomePage from "./components/HomePage";

export const TokenContext = createContext();
export const SongSeedContext = createContext();
export const ArtistSeedContext = createContext();

function App() {
    const [token, setToken] = useState<string | null>(null);
    const [songSeeds, setSongSeeds] = useState<string[]>([]);
    const [artistSeeds, setArtistSeeds] = useState<string[]>([]);

    return (
        <>
            <TokenContext.Provider value={{ token, setToken }}>
                <SongSeedContext.Provider value={{ songSeeds, setSongSeeds }}>
                    <ArtistSeedContext.Provider
                        value={{ artistSeeds, setArtistSeeds }}
                    >
                        <p className="text-[red]">Hello</p>
                        <button onClick={() => console.log(songSeeds)}>
                            aaa
                        </button>
                        <HomePage />
                    </ArtistSeedContext.Provider>
                </SongSeedContext.Provider>
            </TokenContext.Provider>
        </>
    );
}

export default App;
