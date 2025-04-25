<script setup lang="ts">
import { useDialogSubject } from '~/composables/useDialogSubject'
import NewSubjectForm from '~/components/NewSubjectForm.vue'

const dialogSubject = useDialogSubject()
</script>

<template>
  <div>
    <div class="absolute right-0 top-0 p-2">
      <Button
        icon="pi pi-times"
        severity="secondary"
        variant="text"
        rounded
        @click="dialogSubject.closeDialog()"
      />
    </div>
    <NewSubjectForm />
  </div>
</template>

<style scoped></style>
