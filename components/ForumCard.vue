<script setup lang="ts">

</script>

<template>
    <div class="forum-card">
        <Card style="width: 20rem; overflow: hidden">
            <template #header>
                <img alt="forum header" src="/images/usercard.jpg" />
            </template>
            <template #title>Advanced Card</template>
            <template #content>
                <p class="m-0 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis
                </p>
            </template>
            <template #footer>
                <Divider />
                <div class="flex items-center justify-between text-xs">
                    <p>35K membres</p>
                    <p>15 posts</p>
                </div>
            </template>
        </Card>
    </div>
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