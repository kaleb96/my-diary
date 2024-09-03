import { openDB } from 'idb';

// Constants
const DB_NAME = 'user_data';
const DB_VERSION = 1;
const LOGIN_STORE = 'login_info';

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

// Functions
// 로그인 DB 전체 조회
export async function getLoginInfoAll() {
  const db = await initLoginDB();
  return db.getAll(LOGIN_STORE);
}
// 로그인 조회
export async function getLoginInfo(loginData: loginInfo) {
  const db = await initLoginDB();
  try {
    return await db.get(LOGIN_STORE, loginData.user_contact);

  } catch (error) {
    console.log('로그인 정보 조회 실패', error);
  }
}
// 회원가입
export async function registerUser(user: userInfo) {
  const db = await initLoginDB();
  try {
    return db.add(LOGIN_STORE, user);

  } catch (error) {
    console.log('회원 가입 실패', error)
  }
}