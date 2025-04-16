import Aura from '@primeuix/themes/aura';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	vite: {
		plugins: [tailwindcss()],
	},
	css: ['~/assets/css/main.css'],
	modules: ['@primevue/nuxt-module', '@nuxt/eslint'],
	nitro: {
		experimental: {
		websocket: true
			}
		},
	primevue: {
		options: {
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: '.dark-mode',
				},
			},
		},
	},
});
