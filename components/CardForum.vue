<script setup lang="ts">
interface Forum {
    id: number
    name: string
    description: string
    image: string
    creation_date: string
    subjectCount: number
}

const props = defineProps<{
    forum: Forum
}>()

/**
 * Convertit un nom en slug pour l'URL
 * @example nameToSlug("Forum Card") => "forum-card"
 * @param name Le nom à convertir
 */
function nameToSlug(name: string) {
    return name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}
</script>

<template>
    <NuxtLink :to="`/forums/${props.forum.id}`" class="forum-card">
        <Card style="width: 20rem; overflow: hidden">
            <template #header>
                <img
                    alt="forum header"
                    src="/images/usercard.jpg"
                    class="h-[125px] w-full object-cover"
                />
            </template>
            <template #title>{{ props.forum.name }}</template>
            <template #content>
                <p class="m-0 text-sm">
                    {{ props.forum.description }}
                </p>
            </template>
            <template #footer>
                <Divider />
                <div class="flex items-center justify-between text-xs">
                    <p>{{ props.forum.subjectCount }} sujets</p>
                </div>
            </template>
        </Card>
    </NuxtLink>
</template>

<style scoped>
.forum-card {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.forum-card:hover {
    transform: scale(1.05);
}
</style>
