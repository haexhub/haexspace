<template>
  <DialogRoot v-model:open="show">
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

        <div class="flex justify-end mt-4">
          <DialogClose>
            <UiButton
              class="dark:text-slate-200 bg-primary border border-primary hover:text-primary hover:bg-primary/10 hover:ring items-center justify-center rounded px-4 py-2 font-semibold"
            >
              {{ t('abort') }}
            </UiButton>
          </DialogClose>

          <UiButton
            class="dark:text-slate-200 bg-red-600 border border-red-600 hover:text-red-600 hover:bg-red-600/10 hover:ring items-center justify-center rounded px-4 py-2 font-semibold"
            @click="onDeleteFileAsync"
          >
            {{ t('confirm') }}
          </UiButton>
        </div>

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
const show = defineModel({ type: Boolean, default: true });

defineProps({
  fileId: String,
});

const { add } = useSnackbar();

const { t } = useI18n();

const onDeleteFileAsync = async () => {
  try {
    show.value = false;
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
