import { ref } from 'vue';

// Singleton
let instance: any = null;

export function useAuth() {
	if (instance) {
		return instance;
	}

	const isAuthenticated = ref(false);

	function login() {
		isAuthenticated.value = true;
	}

	function logout() {
		isAuthenticated.value = false;
	}

	instance = {
		isAuthenticated,
		login,
		logout,
	};

	return instance;
}
