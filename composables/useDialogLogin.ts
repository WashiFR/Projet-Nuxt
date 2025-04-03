import { ref } from 'vue';

// Singleton
let instance: any = null;

export function useDialogLogin() {
	if (instance) {
		return instance;
	}

	const dialogVisible = ref(false);
	const isLoginVisible = ref(true);

	function openLoginDialog() {
		dialogVisible.value = true;
		isLoginVisible.value = true;
	}

	function openRegisterDialog() {
		dialogVisible.value = true;
		isLoginVisible.value = false;
	}

	function closeDialog() {
		dialogVisible.value = false;
		isLoginVisible.value = true;
	}

	instance = {
		dialogVisible,
		isLoginVisible,
		openLoginDialog,
		openRegisterDialog,
		closeDialog,
	};

	return instance;
}
