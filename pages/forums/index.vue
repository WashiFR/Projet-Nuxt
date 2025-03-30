<script setup lang="ts">

import CardForum from "~/components/CardForum.vue";
</script>

<template>
    <main class="flex flex-col items-center">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            <CardForum v-for="i in 11" :key="i" />
        </div>
        <Paginator :rows="5" :totalRecords="50" class="paginator" />
    </main>
</template>

<style scoped>
@reference "tailwindcss/theme";

:deep(.paginator) {
    @apply mt-4
}
</style>