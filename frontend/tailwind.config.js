/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            colors: {
                brand: {
                    50: "#eef2ff",
                    100: "#e0e7ff",
                    200: "#c7d2fe",
                    300: "#a5b4fc",
                    400: "#818cf8",
                    500: "#6366f1",
                    600: "#4f46e5",
                    700: "#4338ca",
                    800: "#3730a3",
                    900: "#312e81",
                },
                ink: {
                    50: "#f7f7f8",
                    100: "#ececef",
                    200: "#d8d8de",
                    300: "#b5b5bf",
                    400: "#8c8c9a",
                    500: "#6b6b78",
                    600: "#555560",
                    700: "#45454e",
                    800: "#2a2a31",
                    900: "#18181b",
                    950: "#0b0b0d",
                },
            },
            boxShadow: {
                soft: "0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)",
                card: "0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.12)",
            },
            borderRadius: { "2xl": "1rem", "3xl": "1.25rem" },
        },
    },
    plugins: [],
};