/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#7892b4',
          500: '#5b78a0',
          600: '#42598a',
          700: '#344973',
          800: '#1e3a5f',
          900: '#13293d',
          950: '#0a1a2e',
        },
        teal: {
          50: '#effcf6',
          100: '#c8f7e3',
          200: '#91edd0',
          300: '#52e0ba',
          400: '#28c9a3',
          500: '#11b08a',
          600: '#068f72',
          700: '#03725c',
          800: '#045a4a',
          900: '#064b3e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(19,41,61,0.06), 0 1px 2px rgba(19,41,61,0.04)',
        'card-hover': '0 8px 24px rgba(19,41,61,0.10), 0 2px 6px rgba(19,41,61,0.06)',
      },
    },
  },
  plugins: [],
};
