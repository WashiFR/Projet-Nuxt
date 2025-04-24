<script setup lang="ts">
import CardForum from '~/components/CardForum.vue'

const { data: forumsResponse } = await useFetch('/api/forums')

const forums = computed(() => forumsResponse.value || [])

const itemsPerPage = 20
const currentPage = ref(1)

const paginatedForums = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return forums.value.slice(start, start + itemsPerPage)
})
</script>

<template>
    <main class="flex flex-col items-center grow">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            <CardForum v-for="forum in paginatedForums" :key="forum.id" :forum="forum" />
        </div>
        <Paginator
            :rows="itemsPerPage"
            :totalRecords="forums.length"
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
