/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1e3c72',
                accent: '#d4af37',
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
