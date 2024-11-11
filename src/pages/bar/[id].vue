<template>
  <div>
    bar
    <div>
      {{ useRoute().fullPath }}
    </div>
    <div>
      {{ decodeURIComponent(useRoute().params.id) }}
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'bar',
});
</script>
