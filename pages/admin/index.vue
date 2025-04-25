<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useFetch } from '#app'

const confirm = useConfirm()

const confirmDelete = (event: Event, forumName: string) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: 'Voulez-vous supprimer ce forum ?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Non',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Oui',
      severity: 'danger'
    },
    accept: () => removeForum(forumName)
  })
}

// Options du bouton
const options = ref([
  { label: 'Utilisateurs', icon: 'pi pi-user', value: 'users' },
  { label: 'Forums', icon: 'pi pi-book', value: 'forums' }
])

// Valeur sélectionnée (juste la string 'users' ou 'forums')
const selectedOption = ref('users')

// Données dynamiques
const users = ref<Array<{ name: string; mail: string; role: string }>>([])
const forums = ref<Array<{ name: string; description: string; nbSubjects: number }>>([])

// API
async function fetchUsers() {
  try {
    const { data, error } = await useFetch<any[]>('/api/users')
    if (!error.value && data.value) {
      users.value = data.value.map(u => ({
        name: u.username,
        mail: u.email,
        role: u.role === 1 ? 'Admin' : 'User'
      }))
    }
  } catch (err) {
    console.error('Erreur fetch users:', err)
  }
}

async function fetchForums() {
  try {
    const { data, error } = await useFetch<any[]>('/api/forums')
    if (!error.value && data.value) {
      forums.value = data.value.map(f => ({
        name: f.name,
        description: f.description,
        nbSubjects: f.subjectCount ?? 0
      }))
    }
  } catch (err) {
    console.error('Erreur fetch forums:', err)
  }
}

function removeForum(forumName: string) {
  forums.value = forums.value.filter(f => f.name !== forumName)
}

// Initialisation
onMounted(() => {
  if (selectedOption.value === 'users') fetchUsers()
  else fetchForums()
})

// Changement de vue
watch(selectedOption, (val) => {
  if (val === 'users') fetchUsers()
  else fetchForums()
})
</script>

<template>
  <main class="flex flex-col items-center grow gap-4">
    <h2 class="text-5xl font-bold">Tableau de bord</h2>

    <SelectButton
      v-model="selectedOption"
      :options="options"
      option-label="label"
      option-value="value"
    >
      <template #option="{ option }">
        <i :class="option.icon" />
        <span class="ml-2">{{ option.label }}</span>
      </template>
    </SelectButton>

    <!-- Utilisateurs -->
    <div v-if="selectedOption === 'users'">
      <DataTable :value="users" table-style="min-width: 50rem">
        <template #header>
          <div class="flex justify-between items-end">
            <h5 class="m-0 text-2xl font-bold">Liste des utilisateurs</h5>
            <Button icon="pi pi-plus" label="Admin" severity="primary" size="small" />
          </div>
        </template>
        <Column field="name" header="Nom">
          <template #body="{ data }">
            <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
            <span class="ml-2">{{ data.name }}</span>
          </template>
        </Column>
        <Column field="mail" header="Email" />
        <Column field="role" header="Rôle">
          <template #body="{ data }">
            <Tag :value="data.role" :severity="data.role === 'Admin' ? 'danger' : 'secondary'" />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Forums -->
    <div v-else>
      <DataTable :value="forums" table-style="min-width: 50rem">
        <template #header>
          <div class="flex justify-between items-end">
            <h5 class="m-0 text-2xl font-bold">Liste des forums</h5>
            <Button icon="pi pi-plus" label="Forum" severity="primary" size="small" />
          </div>
        </template>
        <Column field="name" header="Nom" />
        <Column field="description" header="Description" />
        <Column field="nbSubjects" header="Nombre de sujets" />
        <Column>
          <template #body="{ data }">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
            <ConfirmPopup />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDelete($event, data.name)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<style scoped></style>
