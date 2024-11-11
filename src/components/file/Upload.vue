<template>
  <!-- <div
    class="p-1 rounded-lg bg-teal-200 flex min-h-full items-center justify-center"
  > -->
  <div
    class="p-4 border-dashed border-slate-800 dark:border-slate-100 rounded-lg flex flex-col space-y-2 min-h-full items-center bg-teal-100"
    :class="[isDragging ? 'border-4' : 'border-2']"
    @dragover.prevent="isDragging = true"
    @dragleave="isDragging = false"
    @drop.prevent="onDrop"
  >
    <input
      :accept
      :id
      :multiple
      :name
      @input="onChange"
      ref="fileInput"
      type="file"
    />
    <label
      :for="id"
      class="dark:text-slate-50 text-slate-900 cursor-pointer flex space-x-2"
    >
      <i class="i-[ic--outline-cloud-upload] size-8"></i>
      <p v-if="isDragging">{{ t('drop') }}</p>
      <p v-else>{{ t('drag') }}</p>
    </label>

    <div
      v-show="files.length"
      class="flex flex-wrap gap-1 justify-center md:justify-start h-full"
    >
      <div
        v-for="(file, index) in files"
        :key="file.name + index"
        :title="file.name"
        class="flex w-72 h-20 border border-slate-900 dark:border-slate-100 bg-slate-300 dark:bg-slate-400 border-opacity-50 rounded group gap-2 p-2"
      >
        <div class="w-16 flex items-center">
          <NuxtPicture
            :src="generateURL(file)"
            :title="file.name"
            class=""
          />
        </div>

        <div class="flex flex-col gap-1 truncate w-full relative">
          <UiButton
            :title="t('removeFile')"
            @click="onRemoveFile(files.indexOf(file))"
            class="absolute top-4 right-0 invisible group-hover:visible group-hover:text-red-600 ml-auto"
          >
            <i class="i-[solar--trash-bin-trash-bold] size-5" />
          </UiButton>
          <p class="text-sm">
            {{ file.name }}
          </p>
          <p class="text-xs">{{ readableFileSize(file.size) }}</p>

          <FileProgressBar
            :progress="store?.[file.name]?.progress?.percentage"
          />
        </div>
      </div>
    </div>
  </div>
  <!--  </div> -->
</template>

<script setup lang="ts">
import { readableFileSize } from '~/composables/fileUpload/helper.client';
import { Semaphore } from '~/composables/fileUpload/semaphore';
import { useFileUpload } from '~/composables/fileUpload/upload.client';

const props = defineProps({
  name: {
    type: String,
    default: 'file',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: '',
  },
});

const id = useId();
const { t } = useI18n();
const isDragging = ref(false);
const files = ref<File[]>([]);
const fileInput = ref<HTMLInputElement>();
const directory = ref('');
const overwrite = ref(true);

const { store, handleFileUploadAsync, prepareFileUploadAsync } =
  useFileUpload();

const onChange = async () => {
  console.log('got files', fileInput.value?.files);

  files.value = [];
  if (fileInput.value?.files) {
    if (props.multiple) files.value.push(...fileInput.value?.files);
    else {
      console.log('single file');
      files.value.push(fileInput.value?.files[0]);
    }
    const fileUploads = new Semaphore(2);

    files.value.map(async (file) => {
      await prepareFileUploadAsync(file, directory.value, overwrite.value);
      /* return fileUploads.add(
        prepareFileUploadAsync,
        file,
        directory.value,
        overwrite.value
      ); */

      //console.log('upload response', repsonse);
    });

    //const allSettled = await Promise.allSettled(queuedUploadPromises);
  }
};

const onDrop = (event: DragEvent) => {
  if (!fileInput.value || !event.dataTransfer?.files?.length) return;

  fileInput.value.files = event.dataTransfer.files;
  onChange();
  isDragging.value = false;
};

const onRemoveFile = (index: number) => {
  files.value.splice(index, 1);
};

const generateURL = (file: File) => {
  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedExtensions.exec(file.name)) {
    return '/file.png';
  }
  let fileSrc = URL.createObjectURL(file);
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc);
  }, 1000);
  console.log(fileSrc);
  return fileSrc;
};

const emit = defineEmits<{
  (event: 'upload', files: File[]): void;
}>();
</script>

<i18n lang="json">
{
  "de": {
    "drag": "Zieh deine Datei in das Feld oder klicke hier zum Upload",
    "drop": "Lass die Datei hier fallen",
    "removeFile": "Datei entfernen"
  },

  "en": {
    "drag": "Drop files here or click here to upload",
    "drop": "Release to drop files here",
    "removeFile": "Remove file"
  }
}
</i18n>
