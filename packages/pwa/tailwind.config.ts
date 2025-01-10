/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        worldAthletics: ['WorldAthletics', 'Poppins', 'sans-serif'], // Voor de normale stijl
        worldAthleticsBold: ['WorldAthletics', 'Poppins', 'sans-serif'], // Voor de vetgedrukte stijl
        worldAthleticsHeading: [
          'WorldAthleticsHeading',
          'Poppins',
          'sans-serif',
        ], // Voor headings
      },
      colors: {
        wa: {
          blue: '#283846',
          red: '#D12630',
          orange: '#FB4517',
          orange_light: '#FE8040',
        }
      }
    },
  },
  plugins: [],
}
