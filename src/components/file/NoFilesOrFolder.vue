<template>
  <div class="h-full flex flex-col items-center justify-center gap-3">
    <h3 class="text-xl font-bold">{{ t('noFiles') }}</h3>

    <p class="text-sm">{{ t('noFilesDescription') }}</p>
    <div class="flex gap-4">
      <UiButton
        class="flex flex-col size-44 bg-primary text-slate-100 hover:ring-2 hover:scale-105"
        @click="onChange(true)"
      >
        <UiIcon
          icon="i-[ph--folder-notch-duotone]"
          class="size-24 shrink-0"
        />
        <p>{{ t('addFolder') }}</p>
      </UiButton>

      <UiButton
        class="flex flex-col size-44 bg-primary text-slate-100 hover:ring-2 hover:scale-105"
        @click="onChange()"
      >
        <UiIcon
          class="size-24"
          icon="i-[ph--file]"
        />
        <p>{{ t('addFile') }}</p>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';

const emit = defineEmits<{ (e: 'change', files: FileList | null): void }>();

const { t } = useI18n();

const asDirectory = ref(false);

const fileDialog = computed(() =>
  useFileDialog({ directory: asDirectory.value })
);

const onChange = (directory: boolean = false) => {
  asDirectory.value = directory;
  fileDialog.value.reset();
  fileDialog.value.open();

  fileDialog.value.onChange((files) => {
    console.log('that works', files);
    if (files) emit('change', files);
  });
};
</script>

<i18n lang="json">
{
  "de": {
    "addFile": "Datei hinzufügen",
    "addFolder": "Ordner hinzufügen",
    "noFiles": "Keine Dateien",
    "noFilesDescription": "Keine Dateien vorhanden"
  },
  "en": {
    "addFile": "Add File",
    "addFolder": "Add Folder",
    "noFiles": "No Files",
    "noFilesDescription": "There are no files here"
  }
}
</i18n>
