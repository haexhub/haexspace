<template>
  <UiPage>
    <template #header>
      <div class="flex justify-end h-full items-center space-x-2 w-full px-4">
        <UiButton
          @click="onUpdate"
          icon="i-[ph--check-bold] size-6 mt-1.5"
          className="rounded-full bg-primary size-12 shadow-md hover:ring-2 hover:bg-primary-hover"
        ></UiButton>

        <UiButton
          icon="i-[ph--trash] size-6 mt-1.5 "
          className="rounded-full bg-primary size-12 shadow-md hover:ring-2 hover:bg-primary-hover "
        ></UiButton>
      </div>
    </template>

    <div
      v-if="user"
      class="p-4"
    >
      <DirectusAvatar :user="user" />

      <form
        class="flex flex-col gap-2"
        @submit="onUpdate"
      >
        <div class="flex gap-2 flex-wrap">
          <UiInput
            v-model="user.first_name"
            appendIcon="i-[ph--user-circle]"
            :label="t('firstName')"
          />
          <UiInput
            v-model="user.last_name"
            appendIcon="i-[ph--user-circle]"
            :label="t('lastName')"
          />
        </div>

        <div class="flex gap-2 flex-wrap">
          <UiInput
            v-model="user.email"
            appendIcon="i-[ph--envelope-simple]"
            :label="t('email')"
          />
          <UiInput
            v-model="user.password"
            appendIcon="i-[ph--password]"
            :label="t('password')"
          />
        </div>

        <!-- <div class="flex gap-2 flex-wrap">
          <UiInput v-model="user.language" />
          <UiInput v-model="user.description" />
        </div> -->
      </form>
    </div>
  </UiPage>
</template>

<script setup lang="ts">
import type { DirectusUser } from '~/composables/storageProvider/directus/types';
definePageMeta({
  name: 'test2',
});

const { t } = useI18n();
const { getCurrentUserAsync } = useUserStore();

const onUpdate = async () => {
  //if (user.value) await updateCurrentUserAsync(user.value);
};

const response = await useAsyncData('user', () => getCurrentUserAsync());
const user = toRaw(response.data);
</script>

<i18n lang="json">
{
  "de": {
    "firstName": "Vorname",
    "lastName": "Nachname",
    "password": "Password",
    "email": "E-Mail"
  },
  "en": {
    "firstName": "Firstname",
    "lastName": "Lastname",
    "password": "Password",
    "email": "E-Mail"
  }
}
</i18n>
