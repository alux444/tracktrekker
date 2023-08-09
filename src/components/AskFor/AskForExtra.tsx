const AskForExtra = ({ submit }) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center align-center w-full p-5">
            <h1>TODO: Extra criteria</h1>
            <button className="button1" onClick={submit}>
                <span className="button1-content">Submit</span>
            </button>
        </div>
    );
};

export default AskForExtra;
