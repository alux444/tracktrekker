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
    "#1f3a93",
    "#3953a4",
    "#4e6ab3",
    "#6781c1",
    "#7e99cf",
    "#967cd1",
    "#ae60d3",
    "#c644d5",
    "#de27d7",
    "#f609d9",
    "#d90bf1",
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

    const tooltipText: string = `${
        type.charAt(0).toUpperCase() + type.slice(1)
    } : ${((100 * value) / scale).toFixed(1)}`;

    const filterTooltip: string = filters[type]
        ? `Filter Range: ${filtersRange?.lower} - ${filtersRange?.upper}`
        : "";

    return (
        <div className="group relative w-full h-full">
            <div className="flex w-full h-full justify-between items-center">
                <div className="flex items-center justify-between text-center w-[10rem] p-1 mr-1">
                    {/* <p className="md:text-4xl text-2xl emoji group-hover:cursor-pointer">
                        {type === "popularity" && "📊"} 
                        {type === "acousticness" && "🎸"}
                        {type === "energy" && "☀️"}
                        {type === "valence" && "😃"}
                        {type === "danceability" && "💃"}
                    </p> */}
                    <p className="grad">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </p>
                </div>
                <p className="grad text-lg mr-1">
                    {scale === 1 ? (value * 100).toFixed(0) : value.toFixed(0)}
                </p>
                <div className="flex flex-col w-[60%] group">
                    <div
                        className="actualValue h-[10px] bg-red-500 rounded-lg group"
                        style={{
                            width: `${pixels}%`,
                            background: `linear-gradient(to right, ${colours[0]}, ${colours[colourIndex]})`,
                        }}
                    ></div>
                    {filtersRange && (
                        <div className="relative w-full inline-block group">
                            <div className="flex w-full">
                                <div
                                    className="filterRange bg-slate-300 h-[10px] rounded-lg"
                                    style={{
                                        width: `${
                                            filtersRange.upper -
                                            filtersRange.lower
                                        }%`,
                                    }}
                                />
                                <div
                                    className="filterRange h-[10px]"
                                    style={{
                                        width: `${filtersRange.lower}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="tooltip z-50 bg-black bg-opacity-70 text-white py-2 px-4 rounded opacity-0 invisible transition-opacity duration-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform group-hover:opacity-100 group-hover:visible w-fit whitespace-nowrap">
                <p>{tooltipText}</p>
                {filtersRange && <p>{filterTooltip}</p>}
            </div>
        </div>
    );
};

export default StatsBar;
