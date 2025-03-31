<script setup lang="ts">
import {ref} from "vue";
import {useAuth} from "~/composables/useAuth";
import {useDialogUserProfile} from "~/composables/useDialogUserProfile";

const dialogUserProfile = useDialogUserProfile()
const auth = useAuth();

const menu = ref();
const items = ref([
    {
        label: 'Mon compte',
        items: [
            {
                label: 'Avatar',
                icon: 'pi pi-user-edit'
            },
            {
                label: 'Déconnexion',
                icon: 'pi pi-sign-out',
                command: () => {
                    auth.logout();
                }
            }
        ],
    },
    {
        label: 'Administration',
        items: [
            {
                label: 'Utilisateurs',
                icon: 'pi pi-users',
            },
            {
                label: 'Forums',
                icon: 'pi pi-book',
            }
        ],
    }
]);

defineExpose({menu}); // Permet à la Navbar de contrôler le menu
</script>

<template>
    <Menu ref="menu" :model="items" :popup="true">
        <template #start>
            <div class="menu-btn" @click="dialogUserProfile.openDialog()">
                <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
                <div class="flex flex-col">
                    <strong>Jhon Doe</strong>
                    <p class="text-xs">Admin</p>
                </div>
            </div>
            <Divider class="!m-0" layout="horizontal" />
        </template>
    </Menu>
</template>

<style scoped>
@reference "tailwindcss/theme";

.menu-btn {
    @apply flex items-center gap-2 p-2 w-full max-w-[200px];
}

.menu-btn:hover {
    @apply bg-gray-100 cursor-pointer;
}
</style>