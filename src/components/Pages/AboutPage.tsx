const AboutPage = () => {
    return (
        <div className="flex justify-center text-center flex-wrap flex-col p-4">
            <h2>About TrackTrekker</h2>
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
            <p>v0.1 (Aug 2023)</p>
            <small>- Largescale style overhauls</small>
            <small>- Added extra criteria search</small>
            <small>- Added preview audios</small>
            <small>- Added search by song, artist and genre.</small>
        </div>
    );
};

export default AboutPage;
