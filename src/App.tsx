import { createContext, useState } from "react";
import HomePage from "./components/HomePage";
import { SongInfo } from "./interfaces/songInfo";
import { ArtistInfo } from "./interfaces/artistInfo";
import { SelectOption } from "./components/Multiselect/Select";
import CurrentSearch from "./components/CurrentSearch";

export const TokenContext = createContext<{
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}>({
    token: null,
    setToken: () => {},
});

export const SongSeedContext = createContext<{
    songSeeds: string[];
    setSongSeeds: React.Dispatch<React.SetStateAction<string[]>>;
}>({
    songSeeds: [],
    setSongSeeds: () => {},
});

export const ArtistSeedContext = createContext<{
    artistSeeds: string[];
    setArtistSeeds: React.Dispatch<React.SetStateAction<string[]>>;
}>({
    artistSeeds: [],
    setArtistSeeds: () => {},
});

export const SongsInfoContext = createContext<{
    songs: SongInfo[];
    setSongs: React.Dispatch<React.SetStateAction<SongInfo[]>>;
}>({
    songs: [],
    setSongs: () => {},
});

export const ArtistInfoContext = createContext<{
    artists: ArtistInfo[];
    setArtists: React.Dispatch<React.SetStateAction<ArtistInfo[]>>;
}>({
    artists: [],
    setArtists: () => {},
});

export const GenreContext = createContext<{
    genres: SelectOption[];
    setGenres: React.Dispatch<React.SetStateAction<SelectOption[]>>;
}>({
    genres: [],
    setGenres: () => {},
});

function App() {
    const [token, setToken] = useState<string | null>(null);
    const [songSeeds, setSongSeeds] = useState<string[]>([]);
    const [artistSeeds, setArtistSeeds] = useState<string[]>([]);
    const [songs, setSongs] = useState<SongInfo[]>([]);
    const [artists, setArtists] = useState<ArtistInfo[]>([]);
    const [genres, setGenres] = useState<SelectOption[]>([]);

    const [viewSearch, setViewSearch] = useState<boolean>(false);

    return (
        <div className="flex gap-2 flex-col justify-center align-center items-center h-screen w-screen text-xs md:text-sm lg:text-md">
            <TokenContext.Provider value={{ token, setToken }}>
                <SongSeedContext.Provider value={{ songSeeds, setSongSeeds }}>
                    <ArtistSeedContext.Provider
                        value={{ artistSeeds, setArtistSeeds }}
                    >
                        <SongsInfoContext.Provider value={{ songs, setSongs }}>
                            <ArtistInfoContext.Provider
                                value={{ artists, setArtists }}
                            >
                                <GenreContext.Provider
                                    value={{ genres, setGenres }}
                                >
                                    <p className="title"></p>
                                    {token && (
                                        <button
                                            className="button1"
                                            onClick={() =>
                                                setViewSearch(!viewSearch)
                                            }
                                        >
                                            <span className="button1-content">
                                                {viewSearch
                                                    ? "Return"
                                                    : "View Search"}
                                            </span>
                                        </button>
                                    )}
                                    {viewSearch ? (
                                        <CurrentSearch />
                                    ) : (
                                        <HomePage />
                                    )}
                                </GenreContext.Provider>
                            </ArtistInfoContext.Provider>
                        </SongsInfoContext.Provider>
                    </ArtistSeedContext.Provider>
                </SongSeedContext.Provider>
            </TokenContext.Provider>
        </div>
    );
}

export default App;
