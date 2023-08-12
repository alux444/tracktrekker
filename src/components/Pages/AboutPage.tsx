const AboutPage = () => {
    return (
        <div className="flex justify-center flex-col items-center p-4">
            <h2>About TrackTrekker</h2>
            <p>
                TrackTrekker is a project made for discovering new music, based
                off personal selected criteria.
            </p>
            <p>
                It uses the Spotify recommendation algorithm through the Spotify
                API.
            </p>
            <br />
            <p>v0.1</p>
            <small>- Added search by song, artist and genre.</small>
        </div>
    );
};

export default AboutPage;
