<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue';
</script>

<template>
  <DialogRoot>
    <DialogTrigger>Click</DialogTrigger>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent
        class="dark:bg-slate-800 bg-slate-100 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md p-8 shadow-lg z-[100]"
      >
        <DialogTitle>Title</DialogTitle>
        <DialogDescription />
        <DialogClose />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
