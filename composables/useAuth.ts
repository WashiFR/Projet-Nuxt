import { ref } from 'vue'

// Singleton
let instance: any = null

export function useAuth() {
  if (instance) return instance

  // Nouveau : on stocke l'ID de l'utilisateur ici
  const userId = ref<number | null>(null)
  const isAuthenticated = ref(false)

  // login reçoit désormais le payload { userId, ... }
  function login(payload: { userId: number; [key: string]: any }) {
    userId.value = payload.userId
    isAuthenticated.value = true
  }

  function logout() {
    userId.value = null
    isAuthenticated.value = false
  }

  instance = { userId, isAuthenticated, login, logout }
  return instance
}
