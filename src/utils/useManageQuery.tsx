import { useContext } from "react";
import {
    ArtistInfoContext,
    ArtistSeedContext,
    SongSeedContext,
    SongsInfoContext,
} from "../App";
import { SongInfo } from "../interfaces/songInfo";
import { ArtistInfo } from "../interfaces/artistInfo";

const useManageQuery = () => {
    const { songSeeds, setSongSeeds } = useContext(SongSeedContext);
    const { artistSeeds, setArtistSeeds } = useContext(ArtistSeedContext);
    const { songs, setSongs } = useContext(SongsInfoContext);
    const { artists, setArtists } = useContext(ArtistInfoContext);

    const addSong = (song: SongInfo) => {
        if (!songSeeds.includes(song.id)) {
            const updatedSongSeeds = [...songSeeds, song.id];
            setSongSeeds(updatedSongSeeds);
            const updatedSongs = [...songs, song];
            setSongs(updatedSongs);
        }
    };

    const removeSong = (song: SongInfo) => {
        const updatedSongSeeds = songSeeds.filter((seed) => seed !== song.id);
        const updatedSongs = songs.filter(
            (thisSong) => thisSong.id !== song.id
        );
        setSongSeeds(updatedSongSeeds);
        setSongs(updatedSongs);
    };

    const addArtist = (artist: ArtistInfo) => {
        if (!artistSeeds.includes(artist.id)) {
            const updatedArtistSeeds = [...artistSeeds, artist.id];
            setArtistSeeds(updatedArtistSeeds);
            const updatedArtists = [...artists, artist];
            setArtists(updatedArtists);
        }
    };

    const removeArtist = (artist: ArtistInfo) => {
        const updatedArtistSeeds = artistSeeds.filter(
            (seed) => seed !== artist.id
        );
        const updatedArtists = artists.filter(
            (thisArtist) => thisArtist.id !== artist.id
        );
        setArtistSeeds(updatedArtistSeeds);
        setArtists(updatedArtists);
    };

    return { addSong, removeSong, addArtist, removeArtist };
};

export default useManageQuery;
