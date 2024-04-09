<template>
  <div>
    <mavon-editor v-model="content" class="editor" />
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.editor {
  height: 100%;
}
</style>
