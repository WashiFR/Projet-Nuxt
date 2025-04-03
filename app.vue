<script setup lang="ts">
import TheNavbar from '~/components/TheNavbar.vue';
import TheFooter from '~/components/TheFooter.vue';
import GlobalDialogLogin from '~/components/GlobalDialogLogin.vue';
import GlobalDialogUserProfile from '~/components/GlobalDialogUserProfile.vue';
</script>

<template>
	<div class="flex flex-col min-h-screen">
		<TheNavbar />

		<!-- Main content -->
		<NuxtPage />

		<TheFooter />

		<!-- Globals Components -->
		<GlobalDialogLogin />
		<GlobalDialogUserProfile />
	</div>
</template>
