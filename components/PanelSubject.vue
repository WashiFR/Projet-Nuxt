<script setup lang="ts">
interface Subject {
    id: number
    title: string
    content: string
    image: string
    creation_date: string
    is_locked: boolean
    id_forum: number
    id_author: number
}

const props = defineProps<{
    subject: Subject
    forumId?: number
}>()

</script>

<template>
    <NuxtLink v-if="props.forumId" :to="`/forums/${props.forumId}/${props.subject.id}`">
        <Panel>
            <template #header>
                <div class="flex justify-between items-center w-full">
                    <div class="flex items-center gap-2">
                        <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
                        <span class="font-bold">Jhon Doe</span>
                    </div>
                    <span class="text-xs">
                        {{ new Date(props.subject.creation_date).toLocaleDateString('fr-FR') }}
                    </span>
                </div>
            </template>
            <h3 class="text-2xl mb-2">
                {{ props.subject.title }}
            </h3>
            <p class="m-0">
                {{ props.subject.content }}
            </p>
        </Panel>
    </NuxtLink>

    <Panel v-else>
        <template #header>
            <div class="flex justify-between items-center w-full">
                <div class="flex items-center gap-2">
                    <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
                    <span class="font-bold">Jhon Doe</span>
                </div>
                <span class="text-xs">
                        {{ new Date(props.subject.creation_date).toLocaleDateString('fr-FR') }}
                    </span>
            </div>
        </template>
        <h3 class="text-2xl mb-2">
            {{ props.subject.title }}
        </h3>
        <p class="m-0">
            {{ props.subject.content }}
        </p>
    </Panel>
</template>

<style scoped></style>
