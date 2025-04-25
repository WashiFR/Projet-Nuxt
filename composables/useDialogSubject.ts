import { ref } from 'vue'

// Singleton
let instance: any = null

export function useDialogSubject() {
  if (instance) return instance

  const dialogVisible = ref(false)

  function openDialog() {
    dialogVisible.value = true
  }
  function closeDialog() {
    dialogVisible.value = false
  }

  instance = { dialogVisible, openDialog, closeDialog }
  return instance
}
