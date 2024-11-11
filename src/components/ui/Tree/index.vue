<template>
  <div>
    <ul>
      <li
        v-for="item in items"
        @click="item.childs = getChildren(item)"
      >
        <span>
          {{ item.name }}
        </span>

        <UiTree :items="item.childs" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: Array as PropType<Record<string, any> | null>,
  getChildren: {
    type: Function as PropType<(item: any) => Promise<string[]>>,
    default: (item: any) => [],
  },
});
</script>
