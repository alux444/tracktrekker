import { useContext, useEffect, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { DevContext } from "../../App";
import CartSongDisplay from "../Displays/CartSongDisplay";
import usePlaylist from "../../utils/usePlaylist";

const SongCart = ({ onClose }: { onClose: () => void }) => {
    const { songCart } = useContext(DevContext);
    const [saved, setSaved] = useState<boolean>(false);

    const modalRef = useRef(null);
    const { createPlaylist } = usePlaylist();
    useOutsideClick(modalRef, onClose);

    useEffect(() => {
        setSaved(false);
    }, [songCart]);

    const cart = songCart.map((song, index) => (
        <div className="flex gap-3 items-center w-full">
            <span className="grad text-lg">{index + 1}</span>
            <CartSongDisplay songInfo={song} />
        </div>
    ));

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10 w-screen h-screen">
            <div
                ref={modalRef}
                className="bg-white flex flex-col p-5 gap-2 rounded-lg shadow-md flex items-center w-fit z-10 max-h-[90vh] w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] border-2 overflow-auto"
            >
                <p className="grad text-lg">Saved Songs</p>
                {cart}
                {songCart.length > 0 ? (
                    saved ? (
                        <p className="grad">Saved to your Spotify!</p>
                    ) : (
                        <button
                            className="grad button2 border-[1px] border-purple-700 my-2"
                            onClick={() => {
                                createPlaylist(songCart);
                                setSaved(true);
                            }}
                        >
                            Create a Playlist
                        </button>
                    )
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default SongCart;
