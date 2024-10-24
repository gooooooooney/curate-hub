import { nextui } from "@nextui-org/theme";
import animate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"src/app/**/*.{ts,tsx}",
		"src/components/**/*.{ts,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/(button|calendar|modal|ripple|spinner).js"
	],
	theme: {
		container: {
			center: 'true',
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ["var(--font-sans)", ...fontFamily.sans]
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [
		nextui({
			themes: {
				// dark: {
				// 	"colors": {
				// 		"background": {
				// 			"DEFAULT": "#1C1E26",
				// 			"foreground": "#f9f9fb"
				// 		},
				// 		"content1": "#1c2030",
				// 		"content2": "#3c4567",
				// 		"content3": "#596597",
				// 		"content4": "#8b95bb",
				// 		"danger": {
				// 			"50": "#3f0d0d",
				// 			"100": "#871d1d",
				// 			"200": "#c62a2a",
				// 			"300": "#df6868",
				// 			"400": "#eba2a2",
				// 			"500": "#efb3b3",
				// 			"600": "#f3c4c4",
				// 			"700": "#f7d9d9",
				// 			"800": "#fbeeee",
				// 			"900": "#fdf7f7",
				// 			"DEFAULT": "#F25555"
				// 		},
				// 		"default": {
				// 			"50": "#262626",
				// 			"100": "#525252",
				// 			"200": "#787878",
				// 			"300": "#a3a3a3",
				// 			"400": "#c7c7c7",
				// 			"500": "#d1d1d1",
				// 			"600": "#dbdbdb",
				// 			"700": "#e8e8e8",
				// 			"800": "#f5f5f5",
				// 			"900": "#fafafa",
				// 			"DEFAULT": "#FAFAFA",
				// 			foreground: "#1C1E26"
				// 		},
				// 		"divider": "#8b95bb",
				// 		"focus": "#F7A500",
				// 		"foreground": {
				// 			"50": "#262626",
				// 			"100": "#525252",
				// 			"200": "#787878",
				// 			"300": "#a3a3a3",
				// 			"400": "#c7c7c7",
				// 			"500": "#d1d1d1",
				// 			"600": "#dbdbdb",
				// 			"700": "#e8e8e8",
				// 			"800": "#f5f5f5",
				// 			"900": "#fafafa",
				// 			"DEFAULT": "#FAFAFA"
				// 		},
				// 		"overlay": "#1C1E26",
				// 		"primary": {
				// 			"50": "#4d3300",
				// 			"100": "#a36d00",
				// 			"200": "#f0a000",
				// 			"300": "#ffc247",
				// 			"400": "#ffda8f",
				// 			"500": "#ffe0a3",
				// 			"600": "#ffe7b8",
				// 			"700": "#fff0d1",
				// 			"800": "#fff8eb",
				// 			"900": "#fffcf5",
				// 			"DEFAULT": "#F7A500"
				// 		},
				// 		"secondary": {
				// 			"50": "#072045",
				// 			"100": "#104494",
				// 			"200": "#1764d9",
				// 			"300": "#5994ee",
				// 			"400": "#99bef4",
				// 			"500": "#accaf6",
				// 			"600": "#bed6f8",
				// 			"700": "#d5e4fb",
				// 			"800": "#edf3fd",
				// 			"900": "#f6f9fe",
				// 			"DEFAULT": "#2F80FA"
				// 		},
				// 		"success": {
				// 			"50": "#0b4221",
				// 			"100": "#178c46",
				// 			"200": "#22ce67",
				// 			"300": "#61e596",
				// 			"400": "#9fefbf",
				// 			"500": "#b0f2ca",
				// 			"600": "#c2f5d6",
				// 			"700": "#d8f9e5",
				// 			"800": "#edfcf3",
				// 			"900": "#f6fef9",
				// 			"DEFAULT": "#36C26E"
				// 		},
				// 		"warning": {
				// 			"50": "#4d1800",
				// 			"100": "#a33400",
				// 			"200": "#f04c00",
				// 			"300": "#ff8247",
				// 			"400": "#ffb28f",
				// 			"500": "#ffc0a3",
				// 			"600": "#ffceb8",
				// 			"700": "#ffe0d1",
				// 			"800": "#fff1eb",
				// 			"900": "#fff8f5",
				// 			"DEFAULT": "#F54E00"
				// 		}
				// 	},
				// 	"extend": "dark"
				// },
			}
		}),
		animate
	],
}
