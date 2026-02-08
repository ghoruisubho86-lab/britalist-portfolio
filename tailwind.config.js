/** @type {import('tailwindcss').Config} */
export default {
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
                'neon-lime': '#ccff00',
            }
        },
    },
    plugins: [],
}
