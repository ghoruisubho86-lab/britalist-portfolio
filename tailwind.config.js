/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'display': ['"Space Grotesk"', 'sans-serif'],
                'body': ['"Inter"', 'sans-serif'],
            },
            colors: {
                'brutal-black': '#1a1a1a',
                'brutal-white': '#f5f5f5',
                'neon-lime': '#fe0000', // Now Neon Red
                'neon-lime-dark': '#990000', // Darker red for contrast
            }
        },
    },
    plugins: [],
}
