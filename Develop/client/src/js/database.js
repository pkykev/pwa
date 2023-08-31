import { openDB } from 'idb';

const DB_NAME = 'jate'

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB(DB_NAME, 1);
  const tx = jateDB.transaction(DB_NAME, 'readwrite');
  const storeDB = tx.objectStore(DB_NAME);

  const request = storeDB.put({id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB(DB_NAME, 1);
  const tx = jateDB.transaction(DB_NAME, 'readonly');
  const storeDB = tx.objectStore(DB_NAME);
  const request = storeDB.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};


initdb();
