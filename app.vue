<script setup lang="ts">
import TheNavbar from "~/components/TheNavbar.vue";
import TheFooter from "~/components/TheFooter.vue";
</script>

<template>
    <NuxtLayout>

        <TheNavbar />

        <main class="flex flex-col items-center">
            <NuxtPage />
        </main>

        <TheFooter />

    </NuxtLayout>
</template>