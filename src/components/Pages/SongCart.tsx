import { useContext, useRef } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import { DevContext } from "../../App";
import CartSongDisplay from "../Displays/CartSongDisplay";

const SongCart = ({ onClose }: { onClose: () => void }) => {
    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);
    const { songCart } = useContext(DevContext);

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
                {cart}
            </div>
        </div>
    );
};

export default SongCart;
