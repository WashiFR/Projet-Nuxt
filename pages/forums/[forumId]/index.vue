<script setup lang="ts">
import { useRoute } from 'vue-router'
import PanelSubject from '~/components/PanelSubject.vue'

const route = useRoute()
const forumId = route.params.forumId

const { data: subjectsResponse } = await useFetch(`/api/forums/${forumId}/topics`)

const subjects = computed(() => subjectsResponse.value || [])

const itemsPerPage = 20
const currentPage = ref(1)

const paginatedSubjects = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return subjects.value.slice(start, start + itemsPerPage)
})
</script>

<template>
    <main class="flex flex-col items-center grow">
        <div class="flex flex-col items-center gap-4 max-w-3xl">
            <PanelSubject v-for="subject in paginatedSubjects" :key="subject.id" :subject="subject" :forumId="forumId" />
        </div>
        <Paginator
            :rows="itemsPerPage"
            :totalRecords="subjects.length"
            :first="(currentPage - 1) * itemsPerPage"
            @page="(e) => (currentPage = e.page + 1)"
            class="paginator"
        />
    </main>
</template>

<style scoped>
@reference "tailwindcss/theme";

:deep(.paginator) {
    @apply mt-4;
}
</style>
