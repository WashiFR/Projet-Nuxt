<script setup lang="ts">
import { ref } from 'vue';

const options = ref([
	{ label: 'Utilisateurs', icon: 'pi pi-user', value: 'users' },
	{ label: 'Forums', icon: 'pi pi-book', value: 'forums' },
]);
const optionsChoosed = ref(options.value[0]);

const users = ref([
	{ name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'Admin' },
	{ name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'Admin' },
	{ name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User' },
	{ name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User' },
	{ name: 'Jhon Doe', mail: 'jhon.doe@gmail.com', role: 'User' },
]);

const forums = ref([
	{ name: 'Forum 1', description: 'Description du forum 1', nbSubjects: 10 },
	{ name: 'Forum 2', description: 'Description du forum 2', nbSubjects: 5 },
	{ name: 'Forum 3', description: 'Description du forum 3', nbSubjects: 20 },
	{ name: 'Forum 4', description: 'Description du forum 4', nbSubjects: 0 },
	{ name: 'Forum 5', description: 'Description du forum 5', nbSubjects: 15 },
]);
</script>

<template>
	<main class="flex flex-col items-center grow gap-4">
		<h2 class="text-5xl font-bold">Tableau de bord</h2>

		<SelectButton v-model="optionsChoosed" :options="options">
			<template #option="slotProps">
				<i :class="slotProps.option.icon" />
				<span class="ml-2">{{ slotProps.option.label }}</span>
			</template>
		</SelectButton>

		<div v-if="optionsChoosed.value === 'users'">
			<DataTable :value="users" table-style="min-width: 50rem">
				<template #header>
					<div class="flex justify-between items-end">
						<h5 class="m-0 text-2xl font-bold">Liste des utilisateurs</h5>
						<Button
							icon="pi pi-plus"
							label="Admin"
							severity="primary"
							size="small"
						/>
					</div>
				</template>
				<Column field="name" header="Nom">
					<template #body="slotProps">
						<Avatar
							icon="pi pi-user"
							shape="circle"
							class="!min-w-[32px]"
						/>
						<span class="ml-2">{{ slotProps.data.name }}</span>
					</template>
				</Column>
				<Column field="mail" header="Email" />
				<Column field="role" header="Rôle">
					<template #body="slotProps">
						<Tag
							v-if="slotProps.data.role === 'Admin'"
							:value="slotProps.data.role"
						/>
						<Tag
							v-else
							:value="slotProps.data.role"
							severity="secondary"
						/>
					</template>
				</Column>
			</DataTable>
		</div>
		<div v-else>
			<DataTable :value="forums" table-style="min-width: 50rem">
				<template #header>
					<div class="flex justify-between items-end">
						<h5 class="m-0 text-2xl font-bold">Liste des forums</h5>
						<Button
							icon="pi pi-plus"
							label="Forum"
							severity="primary"
							size="small"
						/>
					</div>
				</template>
				<Column field="name" header="Nom" />
				<Column field="description" header="Description" />
				<Column field="nbSubjects" header="Nombre de sujets" />
				<Column>
					<template #body="slotProps">
						<Button
							icon="pi pi-pencil"
							outlined
							rounded
							class="mr-2"
						/>
						<Button
							icon="pi pi-trash"
							outlined
							rounded
							severity="danger"
						/>
					</template>
				</Column>
			</DataTable>
		</div>
	</main>
</template>

<style scoped></style>
