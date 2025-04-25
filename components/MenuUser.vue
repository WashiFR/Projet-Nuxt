<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useDialogUserProfile } from '~/composables/useDialogUserProfile'
import { useRouter } from 'vue-router'
import { useFetch } from '#app'

const dialogUserProfile = useDialogUserProfile()
const auth = useAuth()
const router = useRouter()

const menu = ref<any>(null)
const items = ref<any[]>([])

const userName = ref<string>('')
const role = ref<number>(0) // 0 = utilisateur, 1 = admin

onMounted(async () => {
  if (auth.userId.value) {
    try {
      const { data } = await useFetch<{ username: string; role: number }>(
        '/api/users/user',
        { params: { id: auth.userId.value } }
      )
      if (data.value) {
        userName.value = data.value.username
        role.value = data.value.role

        // Construction dynamique des items
        items.value = [
          { separator: true },
          {
            label: 'Mon compte',
            items: [
              { label: 'Avatar', icon: 'pi pi-user-edit' },
              {
                label: 'Déconnexion',
                icon: 'pi pi-sign-out',
                command: () => auth.logout()
              }
            ]
          },
          ...(role.value === 1
            ? [
                {
                  label: 'Administration',
                  items: [
                    {
                      label: 'Tableau de bord',
                      icon: 'pi pi-chart-bar',
                      command: () => router.push('/admin')
                    }
                  ]
                }
              ]
            : [])
        ]
      }
    } catch (err) {
      console.error('Erreur fetch user profile:', err)
    }
  }
})

defineExpose({ menu })
</script>


<template>
  <Menu ref="menu" :model="items" :popup="true">
    <template #start>
      <div class="menu-btn" @click="dialogUserProfile.openDialog()">
        <Avatar icon="pi pi-user" shape="circle" class="!min-w-[32px]" />
        <div class="flex flex-col">
          <strong>{{ userName || '' }}</strong>
          <p class="text-xs">{{ role || '' }}</p>
        </div>
      </div>
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
