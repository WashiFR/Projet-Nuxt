import tailwindcss from '@tailwindcss/vite';
import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	vite: {
		plugins: [tailwindcss()],
	},
	css: ['~/assets/css/main.css'],
	modules: ['@primevue/nuxt-module', '@nuxt/eslint'],
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
