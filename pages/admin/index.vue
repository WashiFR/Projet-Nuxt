<script setup lang="ts">
import { ref } from 'vue';

const options = ref([
    { label: 'Utilisateurs', icon: 'pi pi-user', value: 'users' },
    { label: 'Forums', icon: 'pi pi-book', value: 'forums' }
]);
const optionsChoosed = ref(options.value[0]);

const users = ref([
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'Admin'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'Admin'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User'}
])

const forums = ref([
    { name: 'Forum 1', description: 'Description du forum 1', nbSubjects: 10, isLocked: false },
    { name: 'Forum 2', description: 'Description du forum 2', nbSubjects: 5, isLocked: true },
    { name: 'Forum 3', description: 'Description du forum 3', nbSubjects: 20, isLocked: false },
    { name: 'Forum 4', description: 'Description du forum 4', nbSubjects: 0, isLocked: true },
    { name: 'Forum 5', description: 'Description du forum 5', nbSubjects: 15, isLocked: false }
])
</script>

<template>
    <main class="flex flex-col items-center grow">
        <h2>Tableau de bord</h2>

        <SelectButton v-model="optionsChoosed" :options="options">
            <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
                <span class="ml-2">{{ slotProps.option.label }}</span>
            </template>
        </SelectButton>

        <div v-if="optionsChoosed.value === 'users'">
            <DataTable :value="users" tableStyle="min-width: 50rem">
                <template #header>
                    <div class="flex justify-between align-items-center">
                        <h5 class="m-0">Liste des utilisateurs</h5>
                        <Button icon="pi pi-plus" label="Utilisateur" severity="primary" size="small" />
                    </div>
                </template>
                <Column field="name" header="Nom">
                    <template #body="slotProps">
                        <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
                        <span class="ml-2">{{ slotProps.data.name }}</span>
                    </template>
                </Column>
                <Column field="mail" header="Email"></Column>
                <Column field="role" header="Rôle">
                    <template #body="slotProps">
                        <Tag v-if="slotProps.data.role === 'Admin'" :value="slotProps.data.role"></Tag>
                        <Tag v-else :value="slotProps.data.role" severity="secondary"></Tag>
                    </template>
                </Column>
            </DataTable>
        </div>
        <div v-else>
            <DataTable :value="forums" tableStyle="min-width: 50rem">
                <template #header>
                    <div class="flex justify-between align-items-center">
                        <h5 class="m-0">Liste des forums</h5>
                        <Button icon="pi pi-plus" label="Forum" severity="primary" size="small" />
                    </div>
                </template>
                <Column field="name" header="Nom"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="nbSubjects" header="Nombre de sujets"></Column>
                <Column>
                    <template #body="slotProps">
                        <Button v-if="slotProps.data.isLocked" icon="pi pi-lock" rounded severity="contrast" class="mr-2" />
                        <Button v-else icon="pi pi-lock-open" outlined rounded severity="secondary" class="mr-2" />
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </main>
</template>

<style scoped>

</style>