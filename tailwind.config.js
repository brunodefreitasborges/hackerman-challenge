/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

      fontWeight: {
        normal: 400,
        bold: 700,
      },
      fontSize: {
        'title': '30px',
        'subtitle': '20px',
        'body': '16px',
        'caption': '14px',
        'button': '16px',
      },
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
      },
      colors: {
        'on-background': '#CECECE',
        'on-surface': '#DFDFDF',
      },

      backgroundImage: {
        'star-wars': "url('assets/StarWarsBackground.png')",
      },
    },
  },
  plugins: [],
}

