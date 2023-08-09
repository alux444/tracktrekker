const AskForExtra = ({ submit, goBack }) => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center p-5">
            <h1>TODO: Extra criteria</h1>
            <button className="button1" onClick={goBack}>
                <span className="button1-content">Back</span>
            </button>
            <button className="button1" onClick={submit}>
                <span className="button1-content">Submit</span>
            </button>
        </div>
    );
};

export default AskForExtra;
