<template>
  <div class="label">
    <div class="label-operator">
      <el-button type="success" size="small" @click="addLabel">添加标签</el-button>
    </div>
    <div class="label-list">
      <el-table :data="labelList" style="width: 100%; margin-bottom: 18px">
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
            <el-button type="primary" size="small" @click="editLabel(scope.row.id)"
              >修改标签</el-button
            >
            <el-button type="danger" size="small" @click="removeLabel(scope.row.id)"
              >删除标签</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="pageChangeHandle"
        :current-page.sync="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="labelTotal"
      >
      </el-pagination>
    </div>
    <el-dialog :title="labelDialogTitle" :visible.sync="showLabelDialog" width="40%">
      <el-form :model="currentLabel" label-width="80px">
        <el-form-item prop="id" label="序号">
          <el-input disabled v-model="currentLabel.id"></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="名称"
          :rules="[
            { required: true, trigger: 'blur', message: 'name is requried' },
            { max: 10, trigger: 'blur', message: 'name max length is 10' }
          ]"
        >
          <el-input v-model="currentLabel.name"></el-input>
        </el-form-item>
        <el-form-item prop="color" label="颜色">
          <el-row>
            <el-col :span="3">
              <el-color-picker v-model="currentLabel.color" color-format="hex"></el-color-picker>
            </el-col>
            <el-col :span="21">
              <div
                :style="{ width: '100px', height: '40px', backgroundColor: currentLabel.color }"
              ></div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showLabelDialog = false" size="small">取消</el-button>
        <el-button type="primary" @click="saveOrUpdateLabel" size="small">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
const defaultLabel = () => {
  return {
    id: '',
    name: '',
    color: '#008cc8'
  }
}

export default {
  name: 'Label',
  data() {
    return {
      showLabelDialog: false,
      labelDialogTitle: 'title',
      labelList: [],
      labelTotal: 0,
      currentLabel: defaultLabel(),
      page: 1,
      size: 5
    }
  },
  methods: {
    saveOrUpdateLabel() {
      if (!this.currentLabel.id) {
        this.$store
          .dispatch('label/saveLabel', this.currentLabel)
          .then(res => {
            Message({
              type: 'success',
              message: '添加标签成功',
              duration: 1000
            })
            this.showLabelDialog = false
            this.retrieveLabelList()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '添加标签失败',
              duration: 1000
            })
          })
      } else {
        this.$store
          .dispatch('label/updateLabel', this.currentLabel)
          .then(res => {
            Message({
              type: 'success',
              message: '修改标签成功',
              duration: 1000
            })
            this.showLabelDialog = false
            this.retrieveLabelList()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '修改标签失败',
              duration: 1000
            })
          })
      }
    },
    removeLabel(id) {
      MessageBox.confirm('提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        type: 'info',
        message: '您确认要删除此标签吗?'
      }).then(() => {
        this.$store
          .dispatch('label/removeLabel', id)
          .then(res => {
            this.page = 1
            Message({
              type: 'success',
              message: '删除标签成功',
              duration: 1000
            })
            this.retrieveLabelList()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '删除标签失败',
              duration: 1000
            })
          })
      })
    },
    addLabel() {
      this.showLabelDialog = true
      this.labelDialogTitle = '添加标签'
      this.currentLabel = defaultLabel()
    },
    editLabel(id) {
      this.$store
        .dispatch('label/getById', id)
        .then(res => {
          Object.assign(this.currentLabel, res.data)
          this.showLabelDialog = true
          this.labelDialogTitle = '修改标签'
        })
        .catch(reason => {
          Message({
            type: 'error',
            message: reason.message,
            duration: 1000
          })
        })
    },
    retrieveLabelList() {
      this.$store
        .dispatch('label/getLabelList', { page: this.page, size: this.size })
        .then(res => {
          this.labelList = res.data.records
          this.labelTotal = res.data.total
          this.page = res.data.current
          this.size = res.data.size
          // console.log(res.data)
          Message({
            type: 'success',
            message: 'retrieve label list success',
            duration: 1000
          })
        })
        .catch(reason => {
          Message({
            type: 'error',
            message: 'retrieve label list fail',
            duration: 1000
          })
        })
    },
    sizeChangeHandle(val) {
      this.size = val
      this.retrieveLabelList()
    },
    pageChangeHandle(val) {
      this.page = val
      this.retrieveLabelList()
    }
  },
  mounted() {
    this.retrieveLabelList()
  }
}
</script>

<style lang="scss" scoped>
.label {
  padding: 10px;

  .label-list,
  .label-operator {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
