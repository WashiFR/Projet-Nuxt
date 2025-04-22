<script setup lang="ts">
import { ref } from 'vue'
import { useDialogLogin } from '~/composables/useDialogLogin'
import { useAuth } from '~/composables/useAuth'
import { useFetch } from '#app'

const dialogLogin = useDialogLogin()
const auth = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin() {
    isLoading.value = true
    errorMessage.value = ''

    try {
        const { data, error } = await useFetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: email.value,
                password: password.value
            }
        })

        if (error.value) {
            const statusCode = error.value.statusCode

            switch (statusCode) {
                case 401:
                    errorMessage.value = 'Identifiants incorrects.'
                    break
                case 404:
                    errorMessage.value = 'Aucun compte trouvé avec cet email.'
                    break
                default:
                    errorMessage.value = error.value.data?.message || 'Erreur lors de la connexion.'
                    break
            }

            return
        }

        if (!data.value || !data.value.userId) {
            errorMessage.value = 'Réponse invalide du serveur.'
            return
        }
        auth.login(data.value)
        dialogLogin.closeDialog()
    } catch (err) {
        errorMessage.value = 'Une erreur technique est survenue.'
    } finally {
        isLoading.value = false
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
            <h2 class="text-4xl font-bold">Connexion</h2>
        </div>

        <div class="flex flex-col gap-4">
            <IconField>
                <InputIcon class="pi pi-at" />
                <InputText v-model="email" placeholder="Email" fluid autofocus />
            </IconField>

            <IconField>
                <InputIcon class="pi pi-lock" />
                <Password
                    v-model="password"
                    placeholder="Mot de passe"
                    :feedback="false"
                    toggle-mask
                    fluid
                />
            </IconField>

            <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

            <Button
                :label="isLoading ? 'Connexion en cours...' : 'Se connecter'"
                :disabled="isLoading"
                @click="handleLogin"
            />

            <Divider layout="horizontal" align="center">
                <b>Pas de compte ?</b>
            </Divider>

            <Button
                label="S'inscrire"
                severity="secondary"
                variant="outlined"
                @click="dialogLogin.openRegisterDialog()"
            />
        </div>
    </div>
</template>

<style scoped></style>
