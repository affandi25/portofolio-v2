/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				studio: {
					DEFAULT: '#EAE8E4',
					light: '#F4F3EF',
					dark: '#0D0D0D',
					card: '#FFFFFF',
					muted: '#737373',
					border: '#DCD9D2',
					'border-dark': '#262626'
				}
			},
			fontFamily: {
				sans: ["Inter", "Plus Jakarta Sans", "system-ui", "sans-serif"],
				display: ["Plus Jakarta Sans", "Syne", "sans-serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
			backdropBlur: {
				sm: '4px',
			},
		},
	},
	plugins: [],
}
