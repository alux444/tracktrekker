import firstImage from "../../imgs/tutone1.png";

const TutPageOne = () => {
    return (
        <div className="flex flex-col p-2 max-w-[90vw] max-h-[90vh] overflow-auto">
            <h2 className="text-lg grad">Welcome to TrackTrekker!</h2>
            <p>
                TrackTrekker is an app for finding music based on your search.
            </p>
            <p>
                To begin, click any of the "Songs", "Artists" or "Genres"
                buttons.
            </p>
            <img src={firstImage} className="border-[1px] my-2" />
            <p>
                A search bar will appear. For genres, a multiselect will appear.
            </p>
        </div>
    );
};

export default TutPageOne;
