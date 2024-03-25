/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      "admin-report": "1664px"
    },
    extend: {
      colors: {
        "example-color": "#ff0000"
      },
      fontFamily: {
        sans: ["Prompt", "sans-serif"],
        "noto-sans": ["Noto Sans Thai", "sans-serif"],
        "example-font": ["Inter var", "sans-serif"],
        "libre-bodoni": ["Libre Bodoni", "serif"],
        "noto-sans-eng": ["Noto Sans", "sans-serif"]
      }
    }
  },
  plugins: []
}
