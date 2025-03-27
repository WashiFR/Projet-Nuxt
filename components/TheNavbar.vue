<script setup lang="ts">
import { ref } from 'vue';

const loginDialogVisible = ref(false);
</script>

<template>
    <nav class="mb-4 sticky top-0 z-10">
        <Menubar pt:root:class="border-0 rounded-none border-b-1 border-gray-200">
            <template #start>
                <a href="/" class="flex items-center">
                    <Image src="/images/raditz_dbz.png" alt="logo" width="50" />
                    <Image src="/images/Radditz_logo.png" alt="logo" width="100" />
                </a>
            </template>
            <template #end>
                <div class="flex items-center">
                    <div class="flex items-center gap-2">
                        <Button label="Sujet" icon="pi pi-plus" variant="text" severity="secondary" />
                        <Button icon="pi pi-cog" variant="text" severity="secondary" />
                    </div>
                    <Divider layout="vertical" />
                    <Button label="Login" icon="pi pi-user" @click="loginDialogVisible = true" />
                </div>
            </template>
        </Menubar>

        <LoginDialog :isVisible="loginDialogVisible" v-model:visible="loginDialogVisible" />
    </nav>
</template>

<style scoped>

</style>