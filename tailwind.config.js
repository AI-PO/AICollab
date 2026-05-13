/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0F',
        accent: '#E0EAFF',
        cta: '#F2A65A',
        surface: '#13131A',
        offwhite: '#F5F4F0',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
