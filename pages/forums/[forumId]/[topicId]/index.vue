<script setup lang="ts">
import { useRoute } from 'vue-router'
import PanelSubject from "~/components/PanelSubject.vue";

const route = useRoute()
const subjectId = route.params.topicId

const { data: subjectResponse } = await useFetch(`/api/topics/${subjectId}`)
const { data: messagesResponse } = await useFetch(`/api/topics/${subjectId}/messages`)

const subject = computed(() => subjectResponse.value || {})
const messages = computed(() => messagesResponse.value || [])

const itemsPerPage = 20
const currentPage = ref(1)

const paginatedMessage = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return messages.value.slice(start, start + itemsPerPage)
})
</script>

<template>
    <main class="flex flex-col items-center grow">
        <PanelSubject :subject="subject" />

        <Divider />

        <h2 class="text-5xl font-bold mb-4">Messages</h2>

        <div class="flex flex-col items-center gap-4 max-w-3xl">
            <PanelMassage v-for="message in paginatedMessage" :key="message.id" :message="message" />
        </div>
        <Paginator
            :rows="itemsPerPage"
            :totalRecords="messages.length"
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