<script setup lang="ts">
const name = "Nom du forum";

/**
 * Convertit un nom en slug pour l'URL
 * @example nameToSlug("Forum Card") => "forum-card"
 * @param name Le nom à convertir
 */
function nameToSlug(name: string) {
    return name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
}

</script>

<template>
    <NuxtLink :to="`/forums/${nameToSlug(name)}`" class="forum-card">
        <Card style="width: 20rem; overflow: hidden">
            <template #header>
                <img alt="forum header" src="/images/usercard.jpg" class="h-[125px] w-full object-cover" />
            </template>
            <template #title>{{name}}</template>
            <template #content>
                <p class="m-0 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis
                </p>
            </template>
            <template #footer>
                <Divider />
                <div class="flex items-center justify-between text-xs">
                    <p>15 sujets</p>
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