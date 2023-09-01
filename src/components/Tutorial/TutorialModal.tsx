import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../utils/useOutsideClose";
import TutPageOne from "./TutPageOne";
import TutPageTwo from "./TutPageTwo";
import TutPageThree from "./TutPageThree";
import TutPageFour from "./TutPageFour";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
        if (page < 4) {
            setPage(page + 1);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                ref={modalRef}
                className="bg-dark3 flex flex-col p-2 rounded-lg shadow-md flex justify-center items-center align-center max-w-[90vw] relative"
            >
                <button
                    className="absolute top-2 right-3 cursor-pointer"
                    onClick={onClose}
                >
                    <span>&times;</span>
                </button>
                {page === 1 && <TutPageOne />}
                {page === 2 && <TutPageTwo />}
                {page === 3 && <TutPageThree />}
                {page === 4 && <TutPageFour />}
                <div className="flex gap-5 w-full justify-center items-center">
                    {page !== 1 && (
                        <button className="button4" onClick={decrementPage}>
                            <span>
                                <KeyboardArrowLeftIcon />
                            </span>
                        </button>
                    )}
                    {page !== 4 && (
                        <button className="button4" onClick={incrementPage}>
                            <span>
                                <KeyboardArrowRightIcon />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorialModal;
