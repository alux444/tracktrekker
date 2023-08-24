import { useContext, useRef } from "react";
import {
    ArtistInfoContext,
    ArtistSeedContext,
    ExtrasContext,
    GenreContext,
    SongSeedContext,
    SongsInfoContext,
} from "../../App";
import ArtistDisplay from "../Displays/ArtistDisplay";
import useManageQuery from "../../utils/useManageQuery";
import SmallSongDisplay from "../Displays/SmallSongDisplay";
import { descriptions } from "../../utils/descriptions";
import ExtraCriteriaTriple from "../AskFor/ExtraCriteriaTriple";
import { ExtraInfo } from "../../interfaces/extrasInfo";
import useOutsideClick from "../../utils/useOutsideClose";
import { PromptPageContext } from "./Views";

const CurrentSearchPage = ({ onClose }: { onClose: () => void }) => {
    const modalRef = useRef(null);

    const { setPromptPage } = useContext(PromptPageContext);
    const { songs, setSongs } = useContext(SongsInfoContext);
    const { setSongSeeds } = useContext(SongSeedContext);
    const { artists, setArtists } = useContext(ArtistInfoContext);
    const { setArtistSeeds } = useContext(ArtistSeedContext);
    const { genres, setGenres } = useContext(GenreContext);
    const { extras, setExtras } = useContext(ExtrasContext);
    const { removeGenre } = useManageQuery();

    useOutsideClick(modalRef, onClose);

    const clearSearch = () => {
        setSongSeeds([]);
        setSongs([]);
        setArtistSeeds([]);
        setArtists([]);
        setGenres([]);
        setPromptPage("home");
    };

    const allSongs = songs.map((song) => <SmallSongDisplay song={song} />);

    const allArtists = artists.map((artist) => (
        <ArtistDisplay artist={artist} type={"currentsearch"} />
    ));

    const allGenres = genres.map((genre) => (
        <div className="flex gap-2 items-center rounded-lg p-2 border-[1px] hover">
            {genre.label.charAt(0).toUpperCase()}
            {genre.label.slice(1)}
            <button
                onClick={() => removeGenre(genre)}
                className="hover:border-error hover:text-error border-[1px] px-[5px] rounded-lg ease-in-out transition-all"
            >
                <span>&times;</span>
            </button>
        </div>
    ));

    const allExtras = Object.keys(extras).map((extraName: string) => (
        <ExtraCriteriaTriple
            criteriaName={extraName as keyof ExtraInfo}
            maxValue={extraName === "popularity" ? 100 : 1}
            dialog={descriptions[extraName]}
        />
    ));

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div
                ref={modalRef}
                className="flex flex-col w-[95vw] lg:w-[40vw] max-h-[90vh] overflow-auto  gap-2 p-5 rounded-[10px] z-10 items-center bg-slate-100"
            >
                {songs.length === 0 &&
                genres.length === 0 &&
                artists.length === 0 ? (
                    <div className="justify-center align-center items-center flex h-full">
                        <p>Your search is empty.</p>
                    </div>
                ) : (
                    <div className="justify-center align-center items-center flex h-full gap-2">
                        <p className="grad text-lg">Current Search</p>
                        <button onClick={clearSearch} className="button3">
                            Clear Search
                        </button>
                    </div>
                )}
                {songs.length > 0 && (
                    <div className="flex flex-wrap w-full items-center justify-center gap-2 flex-col">
                        {allSongs}
                    </div>
                )}
                {artists.length > 0 && (
                    <div className="flex flex-wrap w-full items-center justify-center gap-1">
                        {allArtists}
                    </div>
                )}
                {genres.length > 0 && (
                    <div className="flex flex-wrap w-full items-center justify-center gap-1">
                        {allGenres}
                    </div>
                )}
                <div className="h-[1px] bg-purple-600 w-[50%]" />
                {Object.keys(extras).length === 0 ? (
                    <div className="justify-center align-center items-center flex h-full">
                        <p>No extra filters enabled.</p>
                    </div>
                ) : (
                    <div className="justify-center align-center items-center flex h-full gap-2">
                        <p className="grad text-lg">Current Extra Filters</p>
                        <button
                            onClick={() => setExtras({})}
                            className="button3"
                        >
                            Clear Extras
                        </button>
                    </div>
                )}
                {allExtras}
            </div>
        </div>
    );
};

export default CurrentSearchPage;
