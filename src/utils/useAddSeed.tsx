import { useContext } from "react";
import { ArtistSeedContext, SongSeedContext } from "../App";

const useAddSeed = () => {
    const { songSeeds, setSongSeeds } = useContext(SongSeedContext);
    const { artistSeeds, setArtistSeeds } = useContext(ArtistSeedContext);

    const addSongSeed = (seed: string) => {
        const updatedSongSeeds = [...songSeeds, seed];
        setSongSeeds(updatedSongSeeds);
    };

    const removeSongSeed = (seedToRemove: string) => {
        const updatedSongSeeds = songSeeds.filter(
            (seed) => seed !== seedToRemove
        );
        setSongSeeds(updatedSongSeeds);
    };

    const addArtistSeed = (seed: string) => {
        const updatedArtistSeeds = [...artistSeeds, seed];
        setArtistSeeds(updatedArtistSeeds);
    };

    const removeArtistSeed = (seedToRemove: string) => {
        const updatedArtistSeeds = songSeeds.filter(
            (seed) => seed !== seedToRemove
        );
        setArtistSeeds(updatedArtistSeeds);
    };

    return { addSongSeed, removeSongSeed, addArtistSeed, removeArtistSeed };
};

export default useAddSeed;
