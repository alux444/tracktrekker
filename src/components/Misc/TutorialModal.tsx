const TutorialModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center align-center">
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TutorialModal;
