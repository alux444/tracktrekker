import { useRef } from "react";
import useOutsideClick from "../../utils/useOutsideClose";

const SongCart = ({ onClose }: { onClose: () => void }) => {
    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10 w-screen h-screen">
            <div
                ref={modalRef}
                className="bg-white flex flex-col p-3 gap-2 rounded-lg shadow-md flex items-center w-fit z-10 max-h-[90vh] max-w-[90vw] overflow-auto"
            ></div>
        </div>
    );
};

export default SongCart;
