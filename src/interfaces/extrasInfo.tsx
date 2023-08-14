export type ExtraInfo = {
    acousticness?: {
        min: number;
        max: number;
        target: number | undefined;
    };

    danceability?: {
        min: number;
        max: number;
        target: number | undefined;
    };

    energy?: {
        min: number;
        max: number;
        target: number | undefined;
    };

    instrumentalness?: {
        min: number;
        max: number;
        target: number | undefined;
    };

    liveness?: {
        min: number;
        max: number;
        target: number | undefined;
    };

    popularity?: {
        min: number;
        max: number;
        target: number | undefined;
    };

    speechiness?: {
        min: number;
        max: number;
        target: number | undefined;
    };

    valence?: {
        min: number;
        max: number;
        target: number | undefined;
    };
};
