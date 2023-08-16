const TutorialPage = () => {
    return (
        <div className="flex justify-center text-center flex-wrap flex-col p-4">
            <h2 className="text-lg grad">How to use TrackTrekker</h2>
            <p>Select at least one song, artist or genre for your search.</p>
            <small>
                Note: Not all songs will be avaliable, nor will all songs have
                previews or stats.
            </small>
            <br />
            <p>
                After making a selection, click get results to receive your
                recommendations.
            </p>
            <p>
                Using the reroll function, you can reroll the selection of songs
                avaliable
            </p>
            <small>
                Note: Sometimes your search will result in less than 20 results,
                so rerolling won't do anything. Simplifying your search will
                increase the amount of results.
            </small>
            <br />
            <p>
                You can add songs from your search to further refine it. Click
                get results again to use this new search.
            </p>
            <br />
            <p>
                Through the "extras" section you can filter and sort the
                results.
            </p>
            <p>
                All results will be filtered within your maximum and minimum
                range.
            </p>
            <p>
                The target will define how your results are sorted. Results will
                be sorted by the closest values to your given target(s).
            </p>
            <p>
                For example, having a target with popularity 0 would result in
                the results being sorted from ascending popularity.
            </p>
            <p>
                This also means rerolling with a target likely doesn't result in
                much change.
            </p>
        </div>
    );
};

export default TutorialPage;
