import { Client, Store, Stronghold } from '@tauri-apps/plugin-stronghold';
import { appDataDir } from '@tauri-apps/api/path';

export const useStronghold = () => {
  return {
    initStronghold,
    insertRecord,
    getRecord,
  };
};

const initStronghold = async (username: string, password: string) => {
  const vaultPath = `${await appDataDir()}/vault.hold`;
  const stronghold = await Stronghold.load(vaultPath, password);

  let client: Client;

  try {
    client = await stronghold.loadClient(`${username}`);
  } catch {
    client = await stronghold.createClient(`${username}`);
  }

  return {
    stronghold,
    client,
  };
};

const insertRecord = async (store: Store, key: string, value: string) => {
  const data = Array.from(new TextEncoder().encode(value));
  await store.insert(key, data);
};

const getRecord = async (
  store: Store,
  key: string
): Promise<string | undefined> => {
  const data = await store.get(key);
  if (data) return new TextDecoder().decode(new Uint8Array(data));
};
