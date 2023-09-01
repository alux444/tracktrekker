import firstImage from "../../imgs/tutfour1.png";
import secondImage from "../../imgs/tutfour2.png";

const TutPageFour = () => {
    return (
        <div className="flex flex-col p-2 max-w-[90vw] items-center max-h-[90vh] overflow-auto">
            <h2 className="text-lg grad">Filtering Results</h2>
            <img
                src={firstImage}
                className="border-[1px] border-dark2 my-2 max-h-[30vh]"
            />
            <p>
                You can further refine your results using the "Manage Filters"
                button.
            </p>
            <img
                src={secondImage}
                className="border-[1px] border-dark2 my-2 max-h-[30vh]"
            />
            <p>You can click to enable any of the available filters.</p>
            <p>
                This makes all the search results within your set filter ranges.
            </p>
            <br />
            <p>
                You can also enable a "Target" value - your results will then be
                sorted by closest to your target value(s).
            </p>
        </div>
    );
};

export default TutPageFour;
