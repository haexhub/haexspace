<template>
  <DialogRoot
    v-model:open="show"
    @update:open="onUpdateShow"
  >
    <DialogPortal>
      <DialogOverlay
        class="bg-slate-300/60 dark:bg-slate-800/60 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        :aria-describedby="undefined"
        class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg dark:bg-slate-800 bg-slate-100 p-6 shadow-lg z-[100] flex flex-col space-y-4"
      >
        <DialogTitle
          class="text-slate-700 dark:text-slate-300 text-lg font-semibold"
        >
          {{ t('title') }}
        </DialogTitle>

        <form @submit.prevent="onCreateFolderAsync">
          <UiInput
            v-model.trim="folderName"
            :checkInput
            :rules="
              zod
                .string()
                .regex(/^[a-zA-Z0-9 ]+$/, t('message.onlyAlphanumericValues'))
                .min(1)
            "
            v-model:errors="errors"
          />

          <div class="flex justify-end mt-4">
            <UiButton
              class="dark:text-slate-200 bg-primary border border-primary hover:text-primary hover:bg-primary/10 hover:ring items-center justify-center rounded px-4 py-2 font-semibold"
              type="submit"
            >
              {{ t('confirm') }}
            </UiButton>
          </div>
        </form>

        <DialogClose
          class="text-slate-600 hover:text-red-600 focus:shadow-slate-500 absolute top-0 right-[10px] inline-flex size-6 items-center justify-center rounded-full focus:outline-none"
          :aria-label="t('close')"
        >
          <UiIcon icon="i-[ph--x-bold]" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import * as zod from 'zod';

const show = defineModel({ type: Boolean, default: true });
const errors = ref([]);
const folderName = ref('');
const checkInput = ref(false);

const { add } = useSnackbar();
const { createFolderAsync, readAllFoldersAsync } = useDirectusFolders();
const { currentFolderId } = storeToRefs(useDirectusFolders());
const { t } = useI18n();

const onCreateFolderAsync = async () => {
  try {
    checkInput.value = true;
    //checkInput.value = false;
    if (!folderName.value || errors.value?.length) return;
    console.log('create folder', currentFolderId.value);

    await createFolderAsync({
      name: folderName.value,
      parent: currentFolderId.value,
    });

    await readAllFoldersAsync();

    show.value = false;
    errors.value = [];
    folderName.value = '';
  } catch (error) {
    add({ type: 'error', text: JSON.stringify(error) });
  }
};

const onUpdateShow = (open: boolean) => {
  if (!open) {
    errors.value = [];
    folderName.value = '';
  }
};
</script>

<i18n lang="json">
{
  "de": {
    "title": "Ordner anlegen",
    "abort": "Abbrechen",
    "confirm": "Anlegen",
    "close": "Schließen",
    "message": {
      "onlyAlphanumericValues": "Es sind nur alphanumerische Zeichen erlaubt (a-z, A-Z, 0-9)"
    }
  },

  "en": {
    "title": "Create Folder",
    "abort": "Abort",
    "confirm": "Create",
    "close": "Close",
    "message": {
      "onlyAlphanumericValues": "Only alphanumeric values are allowed (a-z, A-Z, 0-9)"
    }
  }
}
</i18n>
