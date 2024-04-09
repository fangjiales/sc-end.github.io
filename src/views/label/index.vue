<template>
  <div class="label">
    <el-button type="primary" size="small">添加标签</el-button>
    <div class="label-list">
      <el-table :data="labelList" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="color" label="颜色" align="left">
          <template slot-scope="scope">
            <div :style="{ float: 'left', width: '100px', height: '30px', lineHeight: '30px' }">
              {{ scope.row.color }}
            </div>
            <div
              :style="{
                backgroundColor: scope.row.color,
                width: '100px',
                height: '30px',
                float: 'left'
              }"
            ></div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small">编辑标签</el-button>
            <el-button type="danger" size="small">删除标签</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Label',
  data() {
    return {
      labelList: [
        {
          name: 'redis',
          color: 'red'
        },
        {
          name: 'mysql',
          color: '#008383'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  padding: 10px;

  .label-list {
    margin-top: 10px;
  }
}
</style>
