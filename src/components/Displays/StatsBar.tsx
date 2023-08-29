import { ExtraInfo } from "../../interfaces/extrasInfo";

type FilterOption =
    | "popularity"
    | "energy"
    | "valence"
    | "danceability"
    | "acousticness";

type Range = {
    upper: number;
    lower: number;
    target: number;
};

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
    "#0a35c2",
];

const StatsBar = ({
    scale,
    value,
    type,
    filters,
}: {
    scale: 1 | 100;
    value: number;
    type: FilterOption;
    filters: ExtraInfo;
}) => {
    const heightPercent: number = value / scale;
    const colourIndex: number = Math.ceil(heightPercent * 10);
    const pixels: number = heightPercent * 100;

    let filtersRange: Range | undefined;
    if (filters[type]) {
        filtersRange = {
            upper: (filters[type]!.max / scale) * 100,
            lower: (filters[type]!.min / scale) * 100,
            target: filters[type]!.target,
        };
    }

    return (
        <div className="flex w-full h-full justify-end items-center">
            <div className="flex items-center justify-between text-center w-fit p-1">
                <div className="group inline-block relative">
                    <p className="text-4xl emoji group-hover:cursor-pointer">
                        {type === "popularity" && "📊"}
                        {type === "acousticness" && "🎸"}
                        {type === "energy" && "☀️"}
                        {type === "valence" && "😃"}
                        {type === "danceability" && "💃"}
                    </p>
                    <div className="tooltip z-50 bg-black bg-opacity-70 text-white py-2 px-4 rounded opacity-0 invisible transition-opacity duration-200 absolute left-full top-1/2 -translate-y-1/2 transform -translate-x-1/2 group-hover:opacity-100 group-hover:visible">
                        {type}
                    </div>
                </div>
                <p className="grad text-lg">
                    {scale === 1 ? (value * 100).toFixed(0) : value.toFixed(0)}
                </p>
            </div>
            <div className="flex flex-col w-full">
                <div
                    className="actualValue h-[10px] bg-red-500 rounded-lg"
                    style={{
                        width: `${pixels + 5}%`,
                        background: `linear-gradient(to right, ${colours[0]}, ${colours[colourIndex]})`,
                    }}
                />
                {filtersRange && (
                    <div className="flex w-full">
                        <div
                            className="filterRange bg-slate-300 h-[10px] rounded-lg"
                            style={{
                                width: `${
                                    filtersRange.upper - filtersRange.lower
                                }%`,
                            }}
                        />
                        <div
                            className="filterRange h-[10px]"
                            style={{
                                width: `${filtersRange.lower + 5}%`,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsBar;
