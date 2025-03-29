<script setup lang="ts">
import TheNavbar from "~/components/TheNavbar.vue";
import TheFooter from "~/components/TheFooter.vue";
import GlobalDialogLogin from "~/components/GlobalDialogLogin.vue";
</script>

<template>
    <NuxtLayout>

        <TheNavbar />

        <main class="flex flex-col items-center">
            <NuxtPage />
        </main>

        <TheFooter />

        <!-- Global Components -->
        <GlobalDialogLogin />

    </NuxtLayout>
</template>