import { useState } from "react";

const AboutPage = () => {
    const [expandHistory, setExpandHistory] = useState(false);
    return (
        <div className="flex justify-center text-center flex-wrap flex-col items-center p-2">
            <h2 className="text-lg grad">About TrackTrekker</h2>
            <br />
            <hr></hr>
            <br />
            <p>
                TrackTrekker is a project made for discovering new music, based
                off personal selected criteria.
            </p>
            <p>
                It uses the Spotify recommendation algorithm through the Spotify
                API.
            </p>
            <br />
            <p className="font-bold">
                Why don't all songs have previews / stats? - They're not
                available from Spotify.
            </p>
            <br />
            <p>
                Any bugs, possible features or general nitpicks you can contact
                me via:
            </p>
            <p>email: aluux999@gmail.com</p>
            <p>discord: mousetaco</p>
            <br />
            {expandHistory ? (
                <button
                    className="button3"
                    onClick={() => setExpandHistory(false)}
                >
                    Hide Changelog
                </button>
            ) : (
                <button
                    className="button2 grad"
                    onClick={() => setExpandHistory(true)}
                >
                    Show Changelog
                </button>
            )}
            {expandHistory && (
                <div className="flex flex-col">
                    <br />
                    <p>v0.3 (September 2023)</p>
                    <small>- Implemented dark mode</small>
                    <small>- Added song saving function</small>
                    <small>- Added local browser saving songs</small>
                    <small>- Added playlist creation</small>
                    <br />
                    <p>v0.2 (Aug 2023)</p>
                    <small>- Added developer mode</small>
                    <small>- Added tutorial for webapp</small>
                    <small>- Largescale style overhauls</small>
                    <small>- Added extra criteria search</small>
                    <small>- Added preview audios</small>
                    <small>- Added search by song, artist and genre.</small>
                </div>
            )}
        </div>
    );
};

export default AboutPage;
