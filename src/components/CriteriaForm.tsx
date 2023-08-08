import { ChangeEvent, useState } from "react";

const CriteriaForm = () => {
    const [url, setUrl] = useState<string>("");

    const getIDFromSpotifyURL = (url: string) => {
        const artistRegex = /\/artist\/(\w+)\b/;
        const trackRegex = /\/track\/(\w+)\b/;

        const artistMatch = url.match(artistRegex);
        if (artistMatch && artistMatch.length > 1) {
            console.log(artistMatch[1]);
            return artistMatch[1];
        }

        const trackMatch = url.match(trackRegex);
        if (trackMatch && trackMatch.length > 1) {
            console.log(trackMatch[1]);
            return trackMatch[1];
        }

        return null; // If the URL doesn't match the expected pattern
    };

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    return (
        <div className="border-2 flex flex-col justify-center">
            <label>Or Paste Spotify Link to Artist/Track</label>
            <input
                type="text"
                placeholder="URL"
                value={url}
                onChange={handleUrlChange}
            />
            <button onClick={() => getIDFromSpotifyURL(url)}>Test</button>
        </div>
    );
};

export default CriteriaForm;
