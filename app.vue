<script setup lang="ts">
import TheNavbar from "~/components/TheNavbar.vue";
import TheFooter from "~/components/TheFooter.vue";
import GlobalDialogLogin from "~/components/GlobalDialogLogin.vue";
</script>

<template>
    <NuxtLayout>

        <TheNavbar />

        <!-- Main content -->
        <NuxtPage />

        <TheFooter />

        <!-- Globals Components -->
        <GlobalDialogLogin />

    </NuxtLayout>
</template>