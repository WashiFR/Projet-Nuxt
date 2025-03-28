<script setup lang="ts">
import { ref } from 'vue';
import ContentDialogLogin from "~/components/ContentDialogLogin.vue";
import ContentDialogRegister from "~/components/ContentDialogRegister.vue";

const isLogged = ref(false);

const dialogVisible = ref(false);
const contentDialogLoginVisible = ref(true);
const contentDialogRegisterVisible = ref(false);
</script>

<template>
    <nav class="mb-4 sticky top-0 z-10">
        <Menubar class="navbar">
            <template #start>
                <a href="/" class="flex items-center">
                    <Image src="/images/raditz_dbz.png" alt="logo" width="50" />
                    <h1 style="font-size: xx-large; font-weight: bold">Raddit</h1>
                    <Image src="/images/dbz_letter_z_logo.png" alt="logo" width="40" class="img-logo" />
                </a>
            </template>
            <template #end>
                <div class="flex items-center">
                    <div class="flex items-center gap-2">
                        <Button v-if="isLogged" label="Sujet" icon="pi pi-plus" variant="text" severity="secondary" rounded />
                        <Button icon="pi pi-cog" variant="text" severity="secondary" rounded />
                    </div>
                    <Divider layout="vertical" />
                    <Button v-if="!isLogged" label="Connexion" icon="pi pi-user" @click="dialogVisible = true" />
                    <Button v-if="isLogged" variant="text" severity="secondary" rounded class="btn-avatar">
                        <Avatar v-if="isLogged" icon="pi pi-user" shape="circle" />
                    </Button>
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
@reference "tailwindcss/theme";

:deep(.navbar) {
    @apply border-0 rounded-none border-b-1 border-gray-200
}

:deep(.img-logo) {
    transform: translateX(-5px);
}

:deep(.btn-avatar) {
    @apply p-1;
}
</style>