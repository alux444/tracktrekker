import React from "react";
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
    const pixels: number = heightPercent * 100;

    let filtersRange: Range | undefined;
    if (filters[type]) {
        filtersRange = {
            upper: (filters[type]!.max / scale) * 100,
            lower: (filters[type]!.min / scale) * 100,
            target: filters[type]!.target,
        };
    }

    console.log(filtersRange);

    return (
        <div className="flex h-full justify-end flex-col items-center">
            <p>{scale === 1 ? value * 100 : value}</p>
            <div className="flex h-full justify-end items-end">
                <div
                    className="actualValue w-[10px] bg-red-500"
                    style={{ height: `${pixels}%` }}
                />
                {filtersRange && (
                    <div className="flex flex-col h-full justify-end">
                        <div
                            className="filterRange bg-blue-500 w-[10px]"
                            style={{
                                height: `${
                                    filtersRange.upper - filtersRange.lower
                                }%`,
                            }}
                        />
                        <div
                            className="filterRange w-[10px]"
                            style={{
                                height: `${filtersRange.lower}%`,
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsBar;
