<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncData, useFetch } from '#app'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'
import { useDialogSubject } from '~/composables/useDialogSubject'

interface Forum { id: number; name: string }

const auth          = useAuth()
const router        = useRouter()
const dialogSubject = useDialogSubject()

// Récupération des forums
const { data: forums, pending, error } = await useAsyncData<Forum[]>(
  'forums-list',
  () => $fetch('/api/forums')
)

const selectedForum = ref<number|null>(null)
const title         = ref('')
const content       = ref('')
const isSubmitting  = ref(false)
const formError     = ref('')

async function handleSubmit() {
  if (!auth.isAuthenticated.value) {
    formError.value = 'Connectez-vous pour créer un sujet.'
    return
  }
  if (!selectedForum.value || !title.value || !content.value) {
    formError.value = 'Tous les champs sont obligatoires.'
    return
  }

  isSubmitting.value = true
  formError.value     = ''

  try {
    const authorId = auth.userId.value
    if (!authorId) {
      formError.value = 'Impossible de récupérer votre ID utilisateur.'
      return
    }

    const payload = {
      title:   title.value,
      content: content.value,
      author:  authorId
    }

    const { data, error: postErr } = await useFetch<{ topic: { id: number } }>(
      `/api/forums/${selectedForum.value}/topics`,
      {
        method: 'POST',
        body:    payload
      }
    )

    if (postErr.value) {
      formError.value =
        postErr.value.data?.message ||
        `Erreur création sujet (${postErr.value.statusCode})`
      return
    }

    dialogSubject.closeDialog()
  } catch (err) {
    console.error('Catch handleSubmit', err)
    formError.value = 'Erreur technique.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="p-4 max-w-lg mx-auto">
    <h2 class="text-2xl mb-4">Créer un nouveau sujet</h2>

    <Dropdown
      v-model="selectedForum"
      :options="forums || []"
      optionLabel="name"
      optionValue="id"
      placeholder="Choisissez un forum"
      class="w-full mb-4"
      :disabled="pending || !!error"
    />

    <InputText
      v-model="title"
      placeholder="Titre du sujet"
      class="w-full mb-4"
    />

    <Textarea
      v-model="content"
      placeholder="Votre message"
      rows="5"
      class="w-full mb-4"
    />

    <p v-if="formError" class="text-red-600 mb-4">{{ formError }}</p>

    <Button
      label="Publier le sujet"
      :loading="isSubmitting"
      :disabled="!selectedForum || !title || !content || isSubmitting"
      @click="handleSubmit"
      class="w-full"
    />
  </div>
</template>

<style scoped>
/* Ajoute ici tes styles si nécessaire */
</style>
