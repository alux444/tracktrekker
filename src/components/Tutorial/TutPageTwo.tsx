import firstImage from "../../imgs/tuttwo1.png";

const TutPageTwo = () => {
    return (
        <div className="flex flex-col p-2 max-w-[90vw] flex-wrap items-center max-h-[90vh] overflow-auto">
            <h2 className="text-lg grad">Selecting Search</h2>
            <p>In the search bar, search for your desired songs / artists.</p>
            <p>For genres, simply select a genre from the dropdown.</p>
            <img
                src={firstImage}
                className="border-[1px] my-2 max-w-[50vw] lg:max-w-[30vw]"
            />
            <p>
                By clicking the green "+" button, the song / artist will be
                added to your search.
            </p>
        </div>
    );
};

export default TutPageTwo;
