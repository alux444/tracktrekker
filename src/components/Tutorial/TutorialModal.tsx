import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import TutPageOne from "./TutPageOne";

const TutorialModal = ({ onClose }: { onClose: () => void }) => {
    const modalRef = useRef(null);
    useOutsideClick(modalRef, onClose);

    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, []);

    const decrementPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const incrementPage = () => {
        setPage(page + 1);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                ref={modalRef}
                className="bg-white flex flex-col p-4 rounded-lg shadow-md flex justify-center items-center align-center"
            >
                {page === 1 && <TutPageOne />}
                <div className="flex gap-5 w-full justify-center items-center">
                    {page !== 1 && (
                        <button className="button3" onClick={decrementPage}>
                            <span>Prev</span>
                        </button>
                    )}
                    <button className="button3" onClick={incrementPage}>
                        <span>Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
