import { useContext, useEffect, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { DevContext } from "../../App";
import CartSongDisplay from "../Displays/CartSongDisplay";
import usePlaylist from "../../utils/usePlaylist";

const SongCart = ({ onClose }: { onClose: () => void }) => {
    const { songCart, setSongCart } = useContext(DevContext);
    const [saved, setSaved] = useState<boolean>(false);

    const modalRef = useRef(null);
    const { createPlaylist } = usePlaylist();
    useOutsideClick(modalRef, onClose);

    useEffect(() => {
        setSaved(false);
    }, [songCart]);

    const cart = songCart.map((song) => <CartSongDisplay songInfo={song} />);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10 w-screen h-screen">
            <div
                ref={modalRef}
                className="bg-dark3 flex flex-col p-5 gap-2 rounded-lg shadow-md flex items-center w-fit z-10 max-h-[90vh] w-[90vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] overflow-auto"
            >
                <p className="grad text-lg">Saved Songs</p>
                {songCart.length > 0 && (
                    <button
                        className="buttoncancel"
                        onClick={() => setSongCart([])}
                    >
                        <span>Clear Songs</span>
                    </button>
                )}
                {cart}
                {songCart.length > 0 ? (
                    saved ? (
                        <p className="grad">Saved to your Spotify!</p>
                    ) : (
                        <button
                            className="grad button2"
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
