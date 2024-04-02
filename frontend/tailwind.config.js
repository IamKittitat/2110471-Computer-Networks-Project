/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      "admin-report": "1664px"
    },
    extend: {
      colors: {
        "example-color": "#ff0000",
        "blue-100": "#E2EDFF",
        "blue-500": "#0D6EFD",
        "blue-800": "#052C65",
        "gray-100": "#F8F9FA",
        "gray-200": "#E9ECEF",
        "gray-600": "#6C757D",
        "gray-800": "#343A40",
        "gray-900": "#212529",
        "red-cancel": "#DC3545"
      },
      fontFamily: {
        "example-font": ["Inter var", "sans-serif"],
        "inter-font": ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
