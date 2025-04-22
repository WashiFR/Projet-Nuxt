<script setup lang="ts"></script>

<template>
    <Panel>
        <template #header>
            <div class="flex justify-between items-center w-full">
                <div class="flex items-center gap-2">
                    <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
                    <span class="font-bold">Jhon Doe</span>
                </div>
                <span class="text-xs">03/04/2025</span>
            </div>
        </template>
        <h3 class="text-2xl mb-2">Title example</h3>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
        </p>
    </Panel>
</template>

<style scoped></style>
