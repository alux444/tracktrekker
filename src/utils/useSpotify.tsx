import axios from "axios";
import { RecommendForm } from "../interfaces/recommendForm";
import { useContext } from "react";
import { TokenContext } from "../App";
import { ExtraInfo } from "../interfaces/extrasInfo";
const useSpotify = () => {
    const { token } = useContext(TokenContext);

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

    const getFeatures = async (songId: string) => {
        const url = `https://api.spotify.com/v1/audio-features/${songId}`;

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const response = await axios.get(url, { headers });
            return response.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    };

    const getRecommended = async (songForm: RecommendForm) => {
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
                    limit: 48,
                },
                extraParams
            );
            console.log("query" + query);

            const response = await axios.get(url, {
                headers,
                params: query,
            });
            console.log(response.data);
            if (response.data.tracks) {
                return response.data;
            } else {
                return 2;
            }
            // You can access the artist data from the response here:
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
            console.log(response.data);
            return response.data;
            // You can access the artist data from the response here:
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
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
            console.log(response);
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
            console.log(response.data);
            return response.data.tracks;
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    };

    return {
        getGenres,
        getRecommended,
        getSearch,
        getFeatures,
        getTopItems,
        getArtistTracks,
    };
};

export default useSpotify;
