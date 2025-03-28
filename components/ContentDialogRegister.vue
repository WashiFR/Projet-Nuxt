<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    loginDialogVisible: {
        type: Boolean,
        required: true
    },
    dialogVisible: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits([
    'update:visible',
    'update:loginDialogVisible',
    'update:dialogVisible'
]);

/**
 * Ferme la boîte de dialogue
 * Remet la boîte de dialogue de connexion visible
 * Cache la boîte de dialogue d'inscription
 */
function closeDialog() {
    emit('update:visible', false);
    emit('update:loginDialogVisible', true);
    emit('update:dialogVisible', false);
}

function openLoginDialog() {
    emit('update:visible', false);
    emit('update:loginDialogVisible', true);
}

</script>

<template>
    <div>
        <div class="absolute right-0 top-0 p-2">
            <Button icon="pi pi-times" severity="secondary" variant="text" rounded @click="closeDialog" />
        </div>
        <div class="flex justify-center mb-4">
            <h2 class="text-4xl font-bold">Inscription</h2>
        </div>
        <div class="flex flex-col gap-4">
            <IconField>
                <InputIcon class="pi pi-user" />
                <InputText placeholder="Nom d'utilisateur" fluid autofocus />
            </IconField>
            <IconField>
                <InputIcon class="pi pi-at" />
                <InputText placeholder="Email" fluid />
            </IconField>
            <IconField>
                <InputIcon class="pi pi-lock" />
                <Password placeholder="Mot de passe" toggleMask fluid />
            </IconField>
            <Button label="S'inscrire" />
            <Divider layout="horizontal" align="center">
                <b>Déjà un compte ?</b>
            </Divider>
            <Button label="Se connecter" severity="secondary" variant="outlined" @click="openLoginDialog" />
        </div>
    </div>
</template>

<style scoped>

</style>