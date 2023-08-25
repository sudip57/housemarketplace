/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        personIcon: 'url(/src/assets/svg/personIcon.svg)',
        lockIcon: 'url(/src/assets/svg/lockIcon.svg)',
        badgeIcon: 'url(/src/assets/svg/badgeIcon.svg)',
      },
    },
  },
  plugins: [],
};
