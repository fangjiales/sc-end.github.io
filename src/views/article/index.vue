<template>
  <div>
    <div id="editor"></div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'

import Editor from '@toast-ui/editor'

import '@toast-ui/editor/dist/i18n/zh-cn'

export default {
  name: 'Article',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    const editor = new Editor({
      el: document.querySelector('#editor'),
      height: '600px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      language: 'zh-CN'
    })
    editor.getMarkdown()
  }
}
</script>

<style lang="scss" scoped>
</style>
