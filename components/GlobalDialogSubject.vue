<script setup lang="ts">
import { useDialogSubject } from '~/composables/useDialogSubject'
import ContentDialogSubject from '~/components/ContentDialogSubject.vue'

const dialogSubject = useDialogSubject()
</script>

<template>
  <Dialog
    :visible="dialogSubject.dialogVisible.value"
    modal
    :style="{ width: '30rem', padding: '2rem' }"
    @hide="dialogSubject.closeDialog"
  >
    <template #container>
      <ContentDialogSubject />
    </template>
  </Dialog>
</template>

<style scoped></style>
