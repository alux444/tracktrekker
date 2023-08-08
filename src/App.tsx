import { createContext, useState } from "react";
import HomePage from "./components/HomePage";
import { SongInfo } from "./interfaces/songInfo";
import { ArtistInfo } from "./interfaces/artistInfo";

export const TokenContext = createContext();
export const SongSeedContext = createContext();
export const ArtistSeedContext = createContext();
export const SongsInfoContext = createContext();
export const ArtistInfoContext = createContext();

function App() {
    const [token, setToken] = useState<string | null>(null);
    const [songSeeds, setSongSeeds] = useState<string[]>([]);
    const [artistSeeds, setArtistSeeds] = useState<string[]>([]);
    const [songs, setSongs] = useState<SongInfo[]>([]);
    const [artists, setArtists] = useState<ArtistInfo[]>([]);

    return (
        <div className="flex gap-2 flex-col justify-center align-center items-center h-screen w-screen">
            <TokenContext.Provider value={{ token, setToken }}>
                <SongSeedContext.Provider value={{ songSeeds, setSongSeeds }}>
                    <ArtistSeedContext.Provider
                        value={{ artistSeeds, setArtistSeeds }}
                    >
                        <SongsInfoContext.Provider value={{ songs, setSongs }}>
                            <ArtistInfoContext.Provider
                                value={{ artists, setArtists }}
                            >
                                <p className="text-[red]">Recommendify</p>
                                <button onClick={() => console.log(songSeeds)}>
                                    test
                                </button>
                                <HomePage />
                            </ArtistInfoContext.Provider>
                        </SongsInfoContext.Provider>
                    </ArtistSeedContext.Provider>
                </SongSeedContext.Provider>
            </TokenContext.Provider>
        </div>
    );
}

export default App;
