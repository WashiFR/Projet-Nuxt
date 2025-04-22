<script setup lang="ts">
import { useDialogLogin } from '~/composables/useDialogLogin'
import { ref } from 'vue'

const dialogLogin = useDialogLogin()

const username = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const register = async () => {
    if (!username.value || !email.value || !password.value) {
        errorMessage.value = 'Veuillez remplir tous les champs'
        return
    }

    loading.value = true
    errorMessage.value = ''

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Erreur lors de l'inscription")
        }

        dialogLogin.closeDialog()
    } catch (error: any) {
        errorMessage.value = error.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div>
        <div class="absolute right-0 top-0 p-2">
            <Button
                icon="pi pi-times"
                severity="secondary"
                variant="text"
                rounded
                @click="dialogLogin.closeDialog()"
            />
        </div>
        <div class="flex justify-center mb-4">
            <h2 class="text-4xl font-bold">Inscription</h2>
        </div>
        <div v-if="errorMessage" class="p-3 bg-red-100 text-red-700 rounded mb-4">
            {{ errorMessage }}
        </div>
        <form @submit.prevent="register" class="flex flex-col gap-4">
            <IconField>
                <InputIcon class="pi pi-user" />
                <InputText v-model="username" placeholder="Nom d'utilisateur" fluid autofocus />
            </IconField>
            <IconField>
                <InputIcon class="pi pi-at" />
                <InputText v-model="email" placeholder="Email" fluid />
            </IconField>
            <IconField>
                <InputIcon class="pi pi-lock" />
                <Password v-model="password" placeholder="Mot de passe" toggle-mask fluid />
            </IconField>
            <Button type="submit" label="S'inscrire" :loading="loading" />
            <Divider layout="horizontal" align="center">
                <b>Déjà un compte ?</b>
            </Divider>
            <Button
                label="Se connecter"
                severity="secondary"
                variant="outlined"
                @click="dialogLogin.openLoginDialog()"
            />
        </form>
    </div>
</template>
