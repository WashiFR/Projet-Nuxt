<script setup lang="ts">
import {useDialogLogin} from "~/composables/useDialogLogin";
import { ref } from 'vue';

const isLogged = ref(false);
const dialogLogin = useDialogLogin();
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
                    <Button v-if="!isLogged" label="Connexion" icon="pi pi-user" @click="dialogLogin.openLoginDialog()" />
                    <Button v-if="isLogged" variant="text" severity="secondary" rounded class="btn-avatar">
                        <Avatar v-if="isLogged" icon="pi pi-user" shape="circle" />
                    </Button>
                </div>
            </template>
        </Menubar>
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