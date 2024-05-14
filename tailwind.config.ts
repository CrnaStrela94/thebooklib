import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        neon: "neon 1s ease-in-out infinite alternate",
      },
      keyframes: {
        neon: {
          "0%": {
            textShadow:
              "0 0 5px #00c9ff, 0 0 10px #00c9ff, 0 0 15px #00c9ff, 0 0 20px #00c9ff, 0 0 30px #00c9ff, 0 0 40px #00c9ff",
          },
          "100%": {
            textShadow:
              "0 0 10px #00c9ff, 0 0 20px #00c9ff, 0 0 30px #00c9ff, 0 0 40px #00c9ff, 0 0 50px #00c9ff, 0 0 60px #00c9ff",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
