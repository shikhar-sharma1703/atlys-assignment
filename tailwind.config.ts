import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        subtle: "0px 0px 6px 0px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gray: {
          10: "#DFDFDF",
          20: "#D3D3D3",
          30: "#A5A5A5",
          40: "#585757",
        },
        mustard: {
          50: "#FFEED5",
          100: "#FFC267",
          200: "#E29A2D",
        },
        green: {
          10: "#C5F2DA",
          20: "#2DD179",
          30: "#4CAF79",
        },
        indigo: {
          10: "#66A3FF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
