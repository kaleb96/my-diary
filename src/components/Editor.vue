<template>
    <div>
      <div ref="editorRef" style="height: 400px"></div>
    </div>
</template>
<script setup lang="ts">

import { ref, onMounted, watch} from 'vue'
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

// Refs
const editor = ref('');
const editorRef = ref(null);

const toolbarOptions = [
  [{'header': [1, 2, 3, 4, 5, 6]}],
  [{'font': []}],
  [{'color': []}, {'background': []}],
  [{'align': []}],
  [{'indent': '-1'}, {'indent': '+1'}],
  ['bold', 'italic', 'underline', 'strike']
]

onMounted(() => {
  editor.value = new Quill(editorRef.value, {
    theme: 'snow',
    placeholder: '이야기를 입력하세요.',
    modules: {
      toolbar: toolbarOptions
    }
  })
})
</script>