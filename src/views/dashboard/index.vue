<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <img class="avatar" :src="avatar" alt="pig" />
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  methods: {},
  mounted() {
    Message({
      message: 'welcome ' + this.name,
      type: 'success',
      duration: 1000
    })
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.avatar {
  width: 300px;
  height: 300px;
}
</style>
