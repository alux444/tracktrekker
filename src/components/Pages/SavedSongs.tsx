import { useContext, useEffect, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { LoginContext } from "../../App";
import usePlaylist from "../../utils/usePlaylist";
import SavedSongDisplay from "../Displays/SavedSongDisplay";

const SavedSongs = ({ onClose }: { onClose: () => void }) => {
    const { loginMode, savedSongs, setSavedSongs } = useContext(LoginContext);
    const [saved, setSaved] = useState<boolean>(false);

    const modalRef = useRef(null);
    const { createPlaylist } = usePlaylist();
    useOutsideClick(modalRef, onClose);

    useEffect(() => {
        setSaved(false);
    }, [savedSongs]);

    const cart = savedSongs.map((song) => (
        <SavedSongDisplay songInfo={song} key={song.id} />
    ));

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-screen h-screen">
            <div
                ref={modalRef}
                className="relative bg-dark3 flex flex-col p-5 gap-1 rounded-lg shadow-md flex items-center max-h-[90vh] w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] overflow-auto"
            >
                <button
                    className="absolute top-2 right-3 cursor-pointer"
                    onClick={onClose}
                >
                    <span>&times;</span>
                </button>
                <p className="grad text-lg">Saved Songs</p>
                <p>Click the heart button to save songs!</p>
                <p className="">
                    {savedSongs.length}{" "}
                    {savedSongs.length == 1 ? "Song" : "Songs"} Saved
                </p>
                {savedSongs.length > 0 && (
                    <button
                        className="buttoncancel"
                        onClick={() => setSavedSongs([])}
                    >
                        <span>Clear Songs</span>
                    </button>
                )}
                {cart}
                {savedSongs.length > 0 &&
                    loginMode &&
                    (saved ? (
                        <p className="grad">Saved to your Spotify!</p>
                    ) : (
                        <button
                            className="grad button2"
                            onClick={() => {
                                createPlaylist(savedSongs);
                                setSaved(true);
                            }}
                        >
                            Create a Playlist
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default SavedSongs;
