<script setup lang="ts">
import { useDialogLogin } from '~/composables/useDialogLogin';
import ContentDialogLogin from '~/components/ContentDialogLogin.vue';
import ContentDialogRegister from '~/components/ContentDialogRegister.vue';

const dialogLogin = useDialogLogin();
</script>
<template>
	<Dialog
		:visible="dialogLogin.dialogVisible.value"
		modal
		:style="{ width: '25rem', padding: '2rem' }"
	>
		<template #container>
			<ContentDialogLogin v-if="dialogLogin.isLoginVisible.value" />
			<ContentDialogRegister v-else />
		</template>
	</Dialog>
</template>

<style scoped></style>
