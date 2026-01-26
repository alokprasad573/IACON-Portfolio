const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'periwinkle-tint': '#DCD0FF',
      },
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;