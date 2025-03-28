<script setup lang="ts">
import { ref } from 'vue';
import ContentDialogLogin from "~/components/ContentDialogLogin.vue";
import ContentDialogRegister from "~/components/ContentDialogRegister.vue";

const dialogVisible = ref(false);
const contentDialogLoginVisible = ref(true);
const contentDialogRegisterVisible = ref(false);
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
                    <Button label="Login" icon="pi pi-user" @click="dialogVisible = true" />
                </div>
            </template>
        </Menubar>

        <Dialog v-model:visible="dialogVisible" modal :style="{ width: '25rem', padding: '2rem' }">
            <template #container>
                <ContentDialogLogin
                    v-if="contentDialogLoginVisible"
                    v-model:visible="contentDialogLoginVisible"
                    v-model:registerDialogVisible="contentDialogRegisterVisible"
                    v-model:dialog-visible="dialogVisible"
                />
                <ContentDialogRegister
                    v-if="contentDialogRegisterVisible"
                    v-model:visible="contentDialogRegisterVisible"
                    v-model:loginDialogVisible="contentDialogLoginVisible"
                    v-model:dialog-visible="dialogVisible"
                />
            </template>
        </Dialog>
    </nav>
</template>

<style scoped>

</style>