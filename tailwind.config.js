module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './CustomContactForm/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
