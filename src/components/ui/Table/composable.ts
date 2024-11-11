import type { ITableFile } from './table';

export const useTable = () => {
  const selectedItems = ref<Record<string, any>[]>([]);

  const deleteItem = (item: ITableFile) => {
    if (item.type === 'folder') {
      console.log('remove folder', item);
    } else {
      console.log('remove file', item);
    }
  };

  return {
    deleteItem,
    selectedItems,
  };
};
