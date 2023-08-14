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
                    if (typeof value.target === "number") {
                        extraParams[`target_${key}`] = value.target;
                    }
                }
            }
        }

        console.log(extraParams);

        const url = "https://api.spotify.com/v1/recommendations";

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try {
            const arrayToString = (array: string[]) => {
                return array.join(",");
            };

            if (
                songForm.seed_tracks.length === 0 &&
                songForm.seed_artists.length === 0 &&
                songForm.seed_genres.length === 0
            ) {
                return 1;
            }

            const query = Object.assign(
                {
                    seed_tracks: arrayToString(songForm.seed_tracks),
                    seed_artists: arrayToString(songForm.seed_artists),
                    seed_genres: arrayToString(songForm.seed_genres),
                },
                extraParams
            );
            console.log(query);

            const response = await axios.get(url, {
                headers,
                params: query,
            });
            console.log(response.data);
            return response.data;
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
                    limit: 20,
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

    return { getGenres, getRecommended, getSearch, getFeatures };
};

export default useSpotify;
