<script setup lang="ts">
import { useDialogLogin }   from '~/composables/useDialogLogin'
import { useDialogSubject } from '~/composables/useDialogSubject'
import { useAuth }          from '~/composables/useAuth'
import { ref }              from 'vue'
import MenuUser             from '~/components/MenuUser.vue'
import GlobalDialogSubject  from '~/components/GlobalDialogSubject.vue'

const dialogLogin   = useDialogLogin()
const dialogSubject = useDialogSubject()
const auth          = useAuth()

const userMenu = ref()
function toggleMenu(event: Event) {
  userMenu.value?.menu.toggle(event)
}
</script>

<template>
  <nav class="mb-4 sticky top-0 z-10">
    <Menubar class="navbar">
        <template #start>
                <RouterLink
                    v-tooltip="{
                        value: 'Retour à l\'accueil',
                        showDelay: 500,
                        hideDelay: 200
                    }"
                    to="/"
                    class="flex items-center"
                >
                    <Image src="/images/raditz_dbz.png" alt="logo" width="50" />
                    <h1 style="font-size: xx-large; font-weight: bold">Raddit</h1>
                    <Image
                        src="/images/dbz_letter_z_logo.png"
                        alt="logo"
                        width="40"
                        class="img-logo"
                    />
                </RouterLink>
            </template>

      <template #end>
        <div v-if="!auth.isAuthenticated.value" class="flex items-center">
          <Button
            label="Connexion"
            icon="pi pi-user"
            @click="dialogLogin.openLoginDialog()"
          />
        </div>
        <div v-else class="flex items-center">
          <Button
            v-tooltip.bottom="{
              value: 'Nouveau sujet',
              showDelay: 500,
              hideDelay: 200
            }"
            label="Sujet"
            icon="pi pi-plus"
            variant="text"
            severity="secondary"
            rounded
            class="mr-2"
            @click="dialogSubject.openDialog()"
          />
          <Divider layout="vertical" />
          <Button
            v-tooltip.bottom="{
              value: 'Menu du profil',
              showDelay: 500,
              hideDelay: 200
            }"
            variant="text"
            severity="secondary"
            rounded
            class="btn-avatar ml-2"
            @click="toggleMenu"
          >
            <Avatar icon="pi pi-user" shape="circle" />
          </Button>
          <MenuUser ref="userMenu" />
        </div>
      </template>
    </Menubar>

    <!-- ici on place la modale de sujet -->
    <GlobalDialogSubject />
  </nav>
</template>

<style scoped>
@reference "tailwindcss/theme";

:deep(.navbar) {
  @apply border-0 rounded-none border-b border-gray-200;
}

:deep(.btn-avatar) {
  @apply p-1;
}
</style>
