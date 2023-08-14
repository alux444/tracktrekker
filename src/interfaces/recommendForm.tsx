import { ExtraInfo } from "./extrasInfo";

export interface RecommendForm {
    seed_artists: string[];
    seed_genres: string[];
    seed_tracks: string[];
    extras: ExtraInfo;
}
