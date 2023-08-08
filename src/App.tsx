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
        <div className="flex gap-2 flex-col justify-center align-center items-center min-h-screen w-screen">
            <TokenContext.Provider value={{ token, setToken }}>
                <SongSeedContext.Provider value={{ songSeeds, setSongSeeds }}>
                    <ArtistSeedContext.Provider
                        value={{ artistSeeds, setArtistSeeds }}
                    >
                        <p className="text-[red]">Recommendify</p>
                        <button onClick={() => console.log(songSeeds)}>
                            test
                        </button>
                        <HomePage />
                    </ArtistSeedContext.Provider>
                </SongSeedContext.Provider>
            </TokenContext.Provider>
        </div>
    );
}

export default App;
