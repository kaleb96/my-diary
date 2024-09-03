<template>
    <div class="d-flex justify-space-between pa-1 mb-1">
      <div 
        class="editor-outter-button"
        @click="emit('showEditor', true)"
      >< Back</div>
      <div>
        <v-icon 
          class="editor-outter-button"
          icon="mdi-pencil"
          @click="saveContents()"
        />
        </div>
    </div>
    <div>
      <div ref="editorRef" class="editor-theme"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps, watch } from 'vue'
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { editorContentsType, getSelectedDates, saveEditorContents } from '@/assets/databases/workspace';
import { formatDate } from '@/assets/scripts/util';

// Refs
const editor = ref('');
const editorRef = ref(null);

// Props
const props = defineProps<{
  selectedDate: string;
}>()

// Emits
const emit = defineEmits<{
  (e: 'saveData', value: boolean): void,
  (e: 'showEditor', value: boolean): void
}>()

// NOTE: 데이터 DB 저장
/*
 * TODO: 잘못된 DB 설계로 인해서 개선해야함!
 * 단일 항목에 대한 저장은 가능하나 db Update는 가능하나 하나의 content만 ? 적용됨
 */
async function saveContents() {
  // 유저 정보 불러오기
  const loginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
  const userId = loginInfo.user_id;

  // 선택된 날짜 불러오기
  const formatedData = formatDate(props.selectedDate);

  // 에디터 컨텐츠 불러오기
  const editorContents = JSON.stringify(editor.value.getContents().ops);

  // // DB에 저장
  const saveEditorData: editorContentsType = {
    user_id: userId,
    selected_date: [formatedData],
    editor_content:editorContents
  }
  await saveEditorContents(saveEditorData);
  emit('saveData', true);
}

// Editor Toolbar
const toolbarOptions = [
  [{'header': [1, 2, 3, 4, 5, 6]}],
  [{'font': []}],
  [{'color': []}, {'background': []}],
  [{'align': []}],
  [{'indent': '-1'}, {'indent': '+1'}],
  ['bold', 'italic', 'underline', 'strike']
]

// LifeCycle
onMounted(() => {
  // NOTE: 에디터 등록
  editor.value = new Quill(editorRef.value, {
    theme: 'snow',
    placeholder: '이야기를 입력하세요.',
    modules: {
      toolbar: toolbarOptions
    }
  })
})
</script>

<style scoped>
.editor-theme {
  height: 400px;
  background-color: #FAFAFA;
}
.editor-outter-button {
  cursor: pointer;
}
</style>