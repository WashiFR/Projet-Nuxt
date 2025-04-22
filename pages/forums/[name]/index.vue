<script setup lang="ts">
import { useRoute } from 'vue-router'
import PanelSubject from '~/components/PanelSubject.vue'

const route = useRoute()
const forumName = route.params.name
</script>

<template>
    <main class="flex flex-col items-center grow">
        <h2 class="text-5xl font-bold mb-4">Forum : {{ forumName }}</h2>
        <div class="flex flex-col items-center gap-4 max-w-3xl">
            <PanelSubject v-for="i in 10" :key="i" />
        </div>
        <Paginator :rows="5" :total-records="50" class="paginator" />
    </main>
</template>

<style scoped></style>
