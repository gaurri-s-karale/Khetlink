/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          primary: '#123B63',
          secondary: '#1E5AA8',
          agri: '#2E7D32',
          accent: '#E88919',
          bg: '#F6F8FA',
          card: '#FFFFFF',
          text: '#1F2937',
          muted: '#64748B',
          border: '#D7DEE7',
          lightBlue: '#EBF3FA',
          lightGreen: '#EAF5EB',
          lightOrange: '#FDF3E7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        gov: '0 1px 3px rgba(18, 59, 99, 0.08), 0 1px 2px rgba(18, 59, 99, 0.04)',
        'gov-md': '0 4px 6px -1px rgba(18, 59, 99, 0.08), 0 2px 4px -1px rgba(18, 59, 99, 0.04)',
        'gov-lg': '0 10px 15px -3px rgba(18, 59, 99, 0.08), 0 4px 6px -2px rgba(18, 59, 99, 0.04)',
      }
    },
  },
  plugins: [],
}
