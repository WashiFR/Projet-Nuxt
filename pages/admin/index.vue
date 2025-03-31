<script setup lang="ts">
import { ref } from 'vue';

const options = ref([
    { label: 'Utilisateurs', icon: 'pi pi-user', value: 'users' },
    { label: 'Forums', icon: 'pi pi-book', value: 'forums' }
]);
const value = ref(options.value[0]);

const users = ref([
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'Admin'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'Admin'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User'},
    { name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User'},
])
</script>

<template>
    <main class="flex flex-col items-center grow">
        <SelectButton v-model="value" :options="options">
            <template #option="slotProps">
                <i :class="slotProps.option.icon"></i>
                <span class="ml-2">{{ slotProps.option.label }}</span>
            </template>
        </SelectButton>

        <div>
            <DataTable :value="users" tableStyle="min-width: 50rem">
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
                <Column>
                    <template #body>
                        <Button type="button" icon="pi pi-cog" severity="secondary" variant="text" rounded />
                    </template>
                </Column>
            </DataTable>
        </div>
    </main>
</template>

<style scoped>

</style>