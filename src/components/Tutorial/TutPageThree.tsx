import firstImage from "../../imgs/tutthree1.png";
import secondImage from "../../imgs/tutthree2.png";

const TutPageThree = () => {
    return (
        <div className="flex flex-col p-2 max-w-[90vw] items-center max-h-[90vh] overflow-auto">
            <h2 className="text-lg grad">Getting Results</h2>
            <p>Click the "Get Results" button to get your recommended songs.</p>
            <img src={firstImage} className="border-[1px] my-2" />
            <p>Your results will appear at the bottom of the screen.</p>
            <img
                src={secondImage}
                className="border-[1px] my-2 max-w-[50vw] lg:max-w-[30vw]"
            />
            <p>
                If you ever change your search, you should click "Get Results"
                again to search with your new search.
            </p>
            <br />
            <p>Using "reroll" will keep rerolling with your current search.</p>
        </div>
    );
};

export default TutPageThree;
