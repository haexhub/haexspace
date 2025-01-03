import { load } from '@tauri-apps/plugin-store';

export const useTauriStore = () => {
  const loadStoreAsync = (fileName: string = 'store.json') =>
    load(fileName, { autoSave: false });

  const addAccountAsync = async (username: string) => {
    const store = await load('accounts.json', { autoSave: false });
    const oldAccounts = (await store.get<string[]>('accounts')) ?? [];
    await store.set('accounts', [...new Set([...oldAccounts, username])]);
    await store.save();
  };

  const getAccountsAsync = async () => {
    const store = await load('accounts.json', { autoSave: false });
    return (await store.get<string[]>('accounts')) ?? [];
  };

  const removeAccountAsync = async (account: string) => {
    const store = await load('accounts.json', { autoSave: false });
    const oldAccounts = (await store.get<string[]>('accounts')) ?? [];
    await store.set(
      'accounts',
      oldAccounts.filter((old) => old !== account)
    );
    await store.save();
  };

  return {
    addAccountAsync,
    getAccountsAsync,
    loadStoreAsync,
    removeAccountAsync,
  };
};
