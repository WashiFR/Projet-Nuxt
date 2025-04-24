<script setup lang="ts">
interface Message {
    id: number
    content: string
    creation_date: string
    id_subject: number
    id_author: number
}

const props = defineProps<{
    message: Message
}>()
</script>

<template>
    <Panel>
        <template #header>
            <div class="flex justify-between items-center w-full">
                <div class="flex items-center gap-2">
                    <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
                    <span class="font-bold">Jhon Doe</span>
                </div>
                <span class="text-xs">
                    {{ new Date(props.message.creation_date).toLocaleDateString('fr-FR') }}
                </span>
            </div>
        </template>
        <p class="m-0">
            {{ props.message.content }}
        </p>
    </Panel>
</template>

<style scoped></style>
