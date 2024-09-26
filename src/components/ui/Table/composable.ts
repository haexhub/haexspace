export const useTable = () => {
  const selectedItems = ref<Record<string, any>[]>([]);

  return {
    selectedItems,
  };
};
