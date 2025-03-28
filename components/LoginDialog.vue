<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['update:visible']);

function closeDialog() {
    emit('update:visible', false);
}
</script>

<template>
    <Dialog v-model:visible="props.visible" modal :style="{ width: '25rem', padding: '2rem' }">
        <template #container>
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
                <Button label="S'inscrire" severity="secondary" variant="outlined" />
            </div>
        </template>
    </Dialog>
</template>

<style scoped>

</style>