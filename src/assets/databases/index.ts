import { openDB } from 'idb';

// Constants
const DB_NAME = 'user_data';
const DB_VERSION = 1;
const LOGIN_STORE = 'login_info';
const USER_INFO = 'user_info'

// Interfaces
export interface userInfo {
  id: string;
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
export async function initLoginDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if(!db.objectStoreNames.contains(LOGIN_STORE)) {
        db.createObjectStore(LOGIN_STORE, { keyPath: 'user_contact', autoIncrement: true })
      }
    }
  });
}

// NOTE: 로그인
export async function getLoginInfoAll() {
  const db = await initLoginDB();
  return db.getAll(LOGIN_STORE);
}
export async function getLoginInfo(loginData: loginInfo) {
  const db = await initLoginDB();
  return await db.get(LOGIN_STORE, loginData.user_contact);
}
export async function registerUser(user: userInfo) {

  const db = await initLoginDB();
  return db.add(LOGIN_STORE, user);
}