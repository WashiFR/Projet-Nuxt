<script setup lang="ts">

import ForumCard from "~/components/ForumCard.vue";
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <ForumCard v-for="i in 11" :key="i" />
    </div>
</template>

<style scoped>

</style>