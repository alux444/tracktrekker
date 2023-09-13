import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
    const [debounced, setDebounced] = useState<string>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(value);
        }, delay);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    return debounced;
};

export default useDebounce;
