import { openDB, } from 'idb';

// Constants
const DB_NAME = 'workspace_data';
const DB_VERSION = 1;
const WORKSPACE_STORE = 'editor';

// Interfaces
export interface editorContentsType {
  user_id: string;
  selected_date: string[];
  editor_content: string;
}

// DB 초기화
export async function initWorkspaceDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if(!db.objectStoreNames.contains(WORKSPACE_STORE)) {
        db.createObjectStore(WORKSPACE_STORE, { keyPath: 'user_id', autoIncrement: true })
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
export async function getSelectedDates(userId: string) {
  const db = await initWorkspaceDB();
  
  try {
    const response = await db.get(WORKSPACE_STORE, userId);
    return response.selected_date;
  } catch (error) {
    console.log('다이어리 날짜 조회 실패', error);
  }
}