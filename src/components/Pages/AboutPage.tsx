const AboutPage = () => {
    return (
        <div className="flex justify-center text-center flex-wrap flex-col p-4">
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
            <p>
                Any bugs, possible features or general nitpicks you can contact
                me via:
            </p>
            <p>email: aluux999@gmail.com</p>
            <p>discord: mousetaco</p>
            <br />
            <p>v0.2 (Aug 2023)</p>
            <small>- Added developer mode</small>
            <small>- Added tutorial for webapp</small>
            <small>- Largescale style overhauls</small>
            <small>- Added extra criteria search</small>
            <small>- Added preview audios</small>
            <small>- Added search by song, artist and genre.</small>
            <br />
            <p>
                Why don't all songs have previews / stats? - They're not
                avalaible from Spotify.
            </p>
            <br />
            <p>
                I need to apply to Spotify for expanded quota before I can allow
                random users to sign in with their Spotify.
            </p>
            <p>
                If you genuinely want to use the features from that (viewing top
                tracks/artists), contact me and I'll give your Spotify account
                access.
            </p>
        </div>
    );
};

export default AboutPage;
