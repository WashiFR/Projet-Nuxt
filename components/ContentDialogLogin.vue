<script setup lang="ts">
import { useDialogLogin } from '~/composables/useDialogLogin'

const dialogLogin = useDialogLogin()
</script>

<template>
    <div>
        <div class="absolute right-0 top-0 p-2">
            <Button icon="pi pi-times" severity="secondary" variant="text" rounded @click="dialogLogin.closeDialog()" />
        </div>
        <div class="flex justify-center mb-4">
            <h2 class="text-4xl font-bold">Connexion</h2>
        </div>
        <div class="flex flex-col gap-4">
            <IconField>
                <InputIcon class="pi pi-at" />
                <InputText placeholder="Email" fluid autofocus />
            </IconField>
            <IconField>
                <InputIcon class="pi pi-lock" />
                <Password placeholder="Mot de passe" :feedback="false" toggleMask fluid />
            </IconField>
            <Button label="Se connecter" />
            <Divider layout="horizontal" align="center">
                <b>Pas de compte ?</b>
            </Divider>
            <Button label="S'inscrire" severity="secondary" variant="outlined" @click="dialogLogin.openRegisterDialog()" />
        </div>
    </div>
</template>

<style scoped>

</style>