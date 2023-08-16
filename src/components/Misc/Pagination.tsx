const Pagination = ({
    displaysPerPage,
    totalDisplay,
    paginate,
    currentPage,
}: {
    displaysPerPage: number;
    totalDisplay: number;
    paginate: (number) => void;
    currentPage: number;
}) => {
    const pageNumbers: number[] = [];

    for (
        let i: number = 1;
        i <= Math.ceil(totalDisplay / displaysPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-3 flex align-center justify-center w-[90vw]">
            <ul className="flex align-center justify-center items-center flex-wrap gap-1 w-[80vw] ">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            className="altbutton"
                            onClick={() => paginate(number)}
                            style={{
                                borderWidth:
                                    currentPage === number ? "3px" : "",
                                width: "60px",
                            }}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
