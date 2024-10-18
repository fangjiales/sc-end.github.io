<template>
  <div>
    <mavon-editor v-model="content" class="editor" />
    <div class="tool-btn">
      <el-button type="primary" size="small" @click="submitContent">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  components: {},
  data() {
    return {
      content: ''
    }
  },
  methods: {
    submitContent() {
      console.log(this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
}
.tool-btn {
  margin-top: 16px;
}
</style>
