<script setup lang="ts">

import CardForum from "~/components/CardForum.vue";
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <CardForum v-for="i in 11" :key="i" />
    </div>
</template>

<style scoped>

</style>