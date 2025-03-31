<script setup lang="ts">
import { useRoute } from "vue-router";
import CardForum from "~/components/CardForum.vue";

const route = useRoute();
const forumName = route.params.name;
</script>

<template>
    <main class="flex flex-col items-center grow">
        <div>
            <h2>Forum: {{forumName}}</h2>
        </div>
        <Paginator :rows="5" :totalRecords="50" class="paginator" />
    </main>
</template>

<style scoped>

</style>