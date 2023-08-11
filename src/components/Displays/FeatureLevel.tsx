const colours = [
    "#FF0D0D",
    "#FF4E11",
    "#FF8E15",
    "#FAB733",
    "#ACB334",
    "#69B34C",
    "#46a656",
    "#4abd94",
    "#47ccf5",
    "#4770f5",
];

const FeatureLevel = ({ inputVal, gap }: { inputVal: number; gap: number }) => {
    let val = inputVal;
    const graph = colours.map((color) => {
        if (val > 0) {
            val -= gap;
            return (
                <div
                    key={color} // Added a unique key for each div
                    className={`inline-block w-[5px] h-[5px]`}
                    style={{ backgroundColor: val > 0 ? color : "transparent" }}
                ></div>
            );
        }
        return (
            <div className={`inline-block w-[5px] h-[5px] color-[#000]`}></div>
        );
    });
    return (
        <div className="flex ml-1">
            <div className="inline-block w-[5px] h-[5px] bg-red-800" />
            {graph}
        </div>
    );
};

export default FeatureLevel;
