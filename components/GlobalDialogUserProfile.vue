<script setup lang="ts">
import { useDialogUserProfile } from '~/composables/useDialogUserProfile'

const dialog = useDialogUserProfile()
</script>

<template>
    <Dialog
        :visible="dialog.dialogVisible.value"
        modal
        :style="{ width: '25rem', padding: '2rem' }"
    >
        <template #container>
            <div class="absolute right-0 top-0 p-2 test">
                <Button
                    icon="pi pi-times"
                    severity="secondary"
                    variant="text"
                    rounded
                    @click="dialog.closeDialog()"
                />
            </div>
            <div class="flex justify-center mb-4">
                <h2 class="text-4xl font-bold">Mon compte</h2>
            </div>
            <Tabs value="0">
                <TabList>
                    <Tab value="0" class="grow">Informations</Tab>
                    <Tab value="1" class="grow">Mot de passe</Tab>
                </TabList>
                <TabPanels class="custom-padding">
                    <TabPanel value="0">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col gap-2">
                                <label>Nom d'utilisateur</label>
                                <IconField>
                                    <InputIcon class="pi pi-user" />
                                    <InputText
                                        placeholder="Jhon Doe"
                                        default-value="Jhon Doe"
                                        fluid
                                        autofocus
                                    />
                                </IconField>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label>Email</label>
                                <IconField>
                                    <InputIcon class="pi pi-at" />
                                    <InputText
                                        placeholder="jhon.doe@gmail.com"
                                        default-value="jhon.doe@gmail.com"
                                        fluid
                                    />
                                </IconField>
                            </div>
                            <Button label="Modifier" @click="dialog.closeDialog()" />
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <div class="flex flex-col gap-4">
                            <div class="flex flex-col gap-2">
                                <label>Nouveau mot de passe</label>
                                <IconField>
                                    <InputIcon class="pi pi-lock" />
                                    <Password toggle-mask fluid />
                                </IconField>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label>Confirmer le mot de passe</label>
                                <IconField>
                                    <InputIcon class="pi pi-lock" />
                                    <Password toggle-mask fluid />
                                </IconField>
                            </div>
                            <Button label="Modifier" @click="dialog.closeDialog()" />
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </template>
    </Dialog>
</template>

<style scoped>
.test {
    z-index: 2;
}

:deep(.grow) {
    flex-grow: 1;
}

:deep(.custom-padding) {
    padding: 18px 14px 8px 14px;
}
</style>
