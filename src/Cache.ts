import {deleteDB, IDBPDatabase, openDB} from 'idb';

export const dbSettings = Object.freeze({
  Version: 1,
  Name: "mmoa-viewer",
  KeyStore: "actions"
});

async function getDB() : Promise<IDBPDatabase<unknown>>    {
  return await openDB(dbSettings.Name, dbSettings.Version, {
    upgrade(db) {
      db.createObjectStore(dbSettings.KeyStore, {autoIncrement: true});
    }
  });
}

export async function save(inputValue: unknown, id: number) : Promise<IDBValidKey | undefined> {
  try {
    const db = await getDB();    
    const tx = db.transaction(dbSettings.KeyStore, 'readwrite');
    const store = tx.objectStore(dbSettings.KeyStore);
    const addResult = await store.put(inputValue, id);
    await tx.done;
    db.close();
    return addResult;
  } catch (exc) {
    console.trace(`Failed dataStore.save ${exc}`);
  }
  return undefined;
}

export async function get(id: number) : Promise<unknown> {
  try {
    const db = await getDB();
    const tx = db.transaction(dbSettings.KeyStore, 'readonly');
    const store = tx.objectStore(dbSettings.KeyStore);
    const findResult = await store.get(id);
    await tx.done;
    db.close();
    return findResult;
  } catch (exc) {
    console.trace(`Failed dataStore.get ${exc}`);
  }
  return null;
}

export async function initializeCache(): Promise<void> {
  await deleteDB(dbSettings.Name);
}
