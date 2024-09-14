/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: [
    'bg-red-500', 'bg-blue-500', 'bg-green-500',
    'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-teal-500', 'bg-orange-500',
    'bg-red-600', 'bg-blue-600', 'bg-green-600',
    'bg-yellow-600', 'bg-purple-600', 'bg-pink-600',
    'bg-indigo-600', 'bg-teal-600', 'bg-orange-600',
    'bg-red-700', 'bg-blue-700', 'bg-green-700',
    'bg-yellow-700', 'bg-purple-700', 'bg-pink-700',
    'bg-indigo-700', 'bg-teal-700', 'bg-orange-700',
    'bg-red-800', 'bg-blue-800', 'bg-green-800',
    'bg-yellow-800', 'bg-purple-800', 'bg-pink-800',
    'bg-indigo-800', 'bg-teal-800', 'bg-orange-800',
    'bg-red-900', 'bg-blue-900', 'bg-green-900',
    'bg-yellow-900', 'bg-purple-900', 'bg-pink-900',
    'bg-indigo-900', 'bg-teal-900', 'bg-orange-900',
  ],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    }, 
  },
  plugins: [require("tailwindcss-animate"),require("@tailwindcss/typography")],
} 