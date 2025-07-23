/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("@tailwindcss/typography")]
};
