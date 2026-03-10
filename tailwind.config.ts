import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest:   "#0D6E57",
        forestD:  "#0A4035",
        forestL:  "#148F70",
        forestBg: "#EBF5F1",
        amber:    "#B87800",
        amberL:   "#D49200",
        amberBg:  "#FDF6E6",
        ink:      "#161410",
        slate:    "#3D4F5C",
        slateL:   "#56707F",
        paper:    "#FFFFFF",
        bg:       "#F8F6F1",
        mist:     "#F0EDE6",
        fog:      "#E4DFD6",
        rule:     "#D4CFC6",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans:  ['"DM Sans"',  "system-ui", "sans-serif"],
        mono:  ['"DM Mono"',  '"Courier New"', "monospace"],
      },
      maxWidth: {
        container: "1280px",
        prose:     "720px",
        article:   "680px",
      },
      boxShadow: {
        card:  "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)",
        hover: "0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)",
        glow:  "0 0 0 3px rgba(13,110,87,0.25)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
