<template>
  <DialogRoot v-model:open="show">
    <DialogPortal>
      <DialogOverlay
        class="bg-slate-300/60 dark:bg-slate-800/60 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        :aria-describedby="undefined"
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg dark:bg-slate-950 bg-slate-100 p-6 shadow-lg z-[100] flex flex-col space-y-4"
      >
        <DialogTitle
          class="text-slate-700 dark:text-slate-300 text-lg font-semibold"
        >
          {{ t('title') }}
        </DialogTitle>

        <UiInput
          v-model="folderName"
          class=""
        />

        <div class="flex justify-end">
          <DialogClose as-child>
            <UiButton
              class="hover:text-primary hover:border-primary focus:border-primary focus:shadow-primary h-9 items-center justify-center rounded px-3 font-semibold leading-none focus:shadow focus:outline-none"
              @click="onCreateFolder"
            >
              {{ t('confirm') }}
            </UiButton>
          </DialogClose>
        </div>
        <DialogClose
          class="text-slate-600 hover:text-primary focus:shadow-slate-500 absolute top-0 right-[10px] inline-flex size-6 items-center justify-center rounded-full focus:outline-none"
          :aria-label="t('close')"
        >
          <UiIcon icon="i-[ph--x-bold]" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
const show = defineModel({ type: Boolean, default: true });

const { add } = useSnackbar();
const { createFolderAsync, syncFoldersAsync } = useFolderStore();
const { currentFolderId } = storeToRefs(useFolderStore());
const { t } = useI18n();
const folderName = ref('');

const onCreateFolder = async () => {
  try {
    await createFolderAsync({
      name: folderName.value,
      parent: currentFolderId.value,
    });
    await syncFoldersAsync();
  } catch (error) {
    add({ type: 'error', text: JSON.stringify(error) });
  }
};
</script>

<i18n lang="json">
{
  "de": {
    "title": "Ordner anlegen",
    "abort": "Abbrechen",
    "confirm": "Anlegen",
    "close": "Schließen"
  },

  "en": {
    "title": "Create Folder",
    "abort": "Abort",
    "confirm": "Create",
    "close": "Close"
  }
}
</i18n>
