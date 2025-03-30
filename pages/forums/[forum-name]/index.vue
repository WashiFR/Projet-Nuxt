<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const forumName = route.params.forumname;
</script>

<template>
    <main class="flex flex-col items-center">
        <h1>Forum: {{ forumName }}</h1>
    </main>
</template>

<style scoped>

</style>