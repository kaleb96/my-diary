import { openDB } from 'idb';

// Constants
const DB_NAME = 'user_data';
const DB_VERSION = 1;
const STORE_NAME = 'users';

// Interfaces
export interface userInfo {
  id: number;
  user_contact: string;
  user_name: string;
  user_nickname: string;
  user_password: string;
}
export interface loginInfo {
  user_contact: string;
  user_password: string;
}

// DB 초기화
export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if(!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'user_contact', autoIncrement: true })
      }
    }
  });
}

export async function getAllUsers() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
export async function getUsers(loginData: loginInfo) {
  const db = await initDB();
  return await db.get(STORE_NAME, loginData.user_contact);
}
export async function addUser(user: userInfo) {
  const db = await initDB();
  return db.add(STORE_NAME, user);
}