<template>
  <div>
    <h1>article</h1>
    <div ref="editor"></div>
  </div>
</template>

<script>
import Editor from '@toast-ui/editor'

export default {
  name: 'Article',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    const editor = new Editor({
      el: this.$refs.editor,
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical'
    })
    editor.getMarkdown()
  }
}
</script>

<style lang="scss" scoped>
</style>
