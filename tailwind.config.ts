import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        jura: ["var(--font-jura)", "sans-serif"],
        Just_Another_Hand: ["var(--font-just-another-hand)", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
