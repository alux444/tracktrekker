import axios from "axios";
import { RecommendForm } from "../interfaces/recommendForm";
import { useContext } from "react";
import { DevContext, TokenContext } from "../App";
import { ExtraInfo } from "../interfaces/extrasInfo";
import { SongInfo } from "../interfaces/songInfo";
import { ArtistInfo } from "../interfaces/artistInfo";

const useSpotify = () => {
    const { token } = useContext(TokenContext);
    const { savedSongs } = useContext(DevContext);

    const getGenres = async () => {
        const url =
            "https://api.spotify.com/v1/recommendations/available-genre-seeds";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, { headers });
            // You can access the artist data from the response here:
            return response.data.genres;
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    };

    const getFeatures = async (songIds: string) => {
        const url = `https://api.spotify.com/v1/audio-features`;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const query = {
            ids: songIds,
        };

        try {
            const response = await axios.get(url, { headers, params: query });
            const res = response.data;
            res.happiness = res.valence;
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const getRecommended = async (songForm: RecommendForm, limit: number) => {
        const extraParams: { [key: string]: number } = {};

        for (const key in songForm.extras) {
            if (key in songForm.extras) {
                const value = songForm.extras[key as keyof ExtraInfo];
                if (value) {
                    extraParams[`min_${key}`] = value.min;
                    extraParams[`max_${key}`] = value.max;
                    if (value.target !== -1) {
                        extraParams[`target_${key}`] = value.target;
                    }
                }
            }
        }

        const url = "https://api.spotify.com/v1/recommendations";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const arrayToString = (array: string[]) => {
                return array.join(",");
            };

            const query = Object.assign(
                {
                    seed_tracks: arrayToString(songForm.seed_tracks),
                    seed_artists: arrayToString(songForm.seed_artists),
                    seed_genres: arrayToString(songForm.seed_genres),
                    limit: limit,
                },
                extraParams
            );

            const response = await axios.get(url, {
                headers,
                params: query,
            });
            if (response.data.tracks) {
                return response.data;
            } else {
                return 2;
            }
        } catch (error) {
            console.error("Error:", error);
            return 2;
        }
    };

    const getSearch = async (query: string) => {
        const url = "https://api.spotify.com/v1/search";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, {
                headers,
                params: {
                    q: query,
                    type: "track,artist",
                    limit: 32,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getArtists = async (query: string) => {
        const url = "https://api.spotify.com/v1/search";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, {
                headers,
                params: {
                    q: query,
                    type: "artist",
                    limit: 30,
                },
            });

            const sortedArtists = sortResultsByPopularity(
                response.data.artists.items.filter(
                    (artist) => artist.images.length > 0
                )
            );
            return sortedArtists;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getTracks = async (query: string) => {
        const url = "https://api.spotify.com/v1/search";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, {
                headers,
                params: {
                    q: query,
                    type: "track",
                    limit: 32,
                },
            });

            const sortedTracks = sortResultsByPopularity(
                response.data.tracks.items
            );
            return sortedTracks;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const sortResultsByPopularity = (data: (SongInfo | ArtistInfo)[]) => {
        const sortedItems = data.sort((a, b) => {
            const popularityA = a.popularity || 0;
            const popularityB = b.popularity || 0;
            return popularityB - popularityA;
        });

        return sortedItems;
    };

    const getTopItems = async (
        term: "short_term" | "medium_term" | "long_term",
        type: "track" | "artist"
    ) => {
        const endpoint = type === "track" ? "tracks" : "artists";
        const url = `https://api.spotify.com/v1/me/top/${endpoint}`;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, {
                headers,
                params: {
                    time_range: term,
                    limit: 48,
                },
            });
            return response.data.items;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getArtistTracks = async (id: string) => {
        const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=NZ`;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, { headers });
            return response.data.tracks;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    const getSavedRecommendations = async () => {
        if (savedSongs.length == 0) {
            return;
        }

        const search: string[] = [];

        const randomIndex = Math.floor(Math.random() * savedSongs.length);
        search.push(savedSongs[randomIndex].id);

        const query: RecommendForm = {
            seed_artists: [],
            seed_genres: [],
            seed_tracks: search,
            extras: {},
        };

        const res = await getRecommended(query, 10);

        if (res !== 2) {
            return {
                res: res.tracks,
                songName: savedSongs[randomIndex].name,
                artist: savedSongs[randomIndex].artists[0].name,
            };
        } else {
            return -1;
        }
    };

    return {
        getGenres,
        getRecommended,
        getSearch,
        getArtists,
        getTracks,
        getFeatures,
        getTopItems,
        getArtistTracks,
        getSavedRecommendations,
    };
};

export default useSpotify;
