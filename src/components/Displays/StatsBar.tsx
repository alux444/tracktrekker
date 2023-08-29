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
        <div className="flex h-full justify-end flex-col items-center">
            <div className="flex h-[200px] justify-end items-end">
                <div
                    className="actualValue w-[10px] bg-red-500 rounded-lg"
                    style={{
                        height: `${pixels + 5}%`,
                        background: `linear-gradient(to top, ${colours[0]}, ${colours[colourIndex]})`,
                    }}
                />
                {filtersRange && (
                    <div className="flex flex-col h-full justify-end">
                        <div
                            className="filterRange bg-slate-300 w-[10px] rounded-lg"
                            style={{
                                height: `${
                                    filtersRange.upper - filtersRange.lower
                                }%`,
                            }}
                        />
                        <div
                            className="filterRange w-[10px]"
                            style={{
                                height: `${filtersRange.lower + 5}%`,
                            }}
                        />
                    </div>
                )}
            </div>
            <p className="text-xl">
                {type === "popularity" && "📊"}
                {type === "acousticness" && "🎸"}
                {type === "energy" && "☀️"}
                {type === "valence" && "😃"}
                {type === "danceability" && "💃"}
            </p>
            <p className="grad text-lg">
                {scale === 1 ? (value * 100).toFixed(0) : value.toFixed(0)}
            </p>
        </div>
    );
};

export default StatsBar;
