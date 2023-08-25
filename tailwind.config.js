/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        extend: {
            colors: {
                error: "#ed1811",
                select: "#32a846",
                white: "#f5f5f5",
            },
        },
        screens: {
            xs: "500px",

            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "900px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [],
};
