import { openDB, } from 'idb';

// Interfaces
export interface editorContentsType {
  code: string;
  user_id: string;
  date: string;
  contents: string[];
}

// Constants
const DB_NAME = 'workspace_data';
const DB_VERSION = 1;
const WORKSPACE_STORE = 'editor';

// DB 초기화
export async function initWorkspaceDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if(!db.objectStoreNames.contains(WORKSPACE_STORE)) {
        const objectStore = db.createObjectStore(WORKSPACE_STORE, { keyPath: 'code' , autoIncrement: true })
        objectStore.createIndex('user_id', 'user_id', { unique: false})
      }
    }
  });
}

// NOTE: 작성 내용 저장
export async function saveEditorContents(editorContents: editorContentsType) {
  const db = await initWorkspaceDB();
  try {
    // TODO: 신규 저장/ 업데이트 구분필요
    return db.put(WORKSPACE_STORE, editorContents);
  } catch (error) {
    console.log('작성 내용 저장 실패', error)
  }
}

// NOTE: 다이어리 날짜 조회
export async function getDates(user_id: string) {
  const db = await initWorkspaceDB();
  try {
    const transaction = db.transaction(WORKSPACE_STORE, 'readonly');
    const objectStore = transaction.objectStore(WORKSPACE_STORE);
    const index = objectStore.index('user_id');
    const selecteDates = await index.getAll(user_id);
    return selecteDates;
  } catch (error) {
    console.log('다이어리 날짜 조회 실패', error);
  }
}