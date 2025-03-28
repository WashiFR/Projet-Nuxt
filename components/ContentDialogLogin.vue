<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    registerDialogVisible: {
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
    'update:registerDialogVisible',
    'update:dialogVisible'
]);

/**
 * Ferme la boîte de dialogue
 */
function closeDialog() {
    emit('update:dialogVisible', false);
}

function openRegisterDialog() {
    emit('update:visible', false);
    emit('update:registerDialogVisible', true);
}
</script>

<template>
    <div>
        <div class="absolute right-0 top-0 p-2">
            <Button icon="pi pi-times" severity="secondary" variant="text" rounded @click="closeDialog" />
        </div>
        <div class="flex justify-center mb-4">
            <h2 class="text-4xl font-bold">Connexion</h2>
        </div>
        <div class="flex flex-col gap-4">
            <IconField>
                <InputIcon class="pi pi-at" />
                <InputText placeholder="Email" fluid />
            </IconField>
            <IconField>
                <InputIcon class="pi pi-lock" />
                <Password placeholder="Password" :feedback="false" toggleMask fluid />
            </IconField>
            <Button label="Se connecter" />
            <Divider layout="horizontal" align="center">
                <b>Pas de compte ?</b>
            </Divider>
            <Button label="S'inscrire" severity="secondary" variant="outlined" @click="openRegisterDialog" />
        </div>
    </div>
</template>

<style scoped>

</style>