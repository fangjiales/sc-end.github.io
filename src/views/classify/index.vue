<template>
  <div class="classify">
    <div class="classify-item">
      <el-button type="success" size="small" @click="saveClassify">添加分类</el-button>
    </div>
    <div class="classify-item">
      <el-table :data="classifyList" style="width: 100%; margin-bottom: 18px">
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editClassify(scope.row.id)"
              >修改分类</el-button
            >
            <el-button type="danger" size="small" @click="removeClassify(scope.row.id)"
              >删除分类</el-button
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
        :total="classifyTotal"
      >
      </el-pagination>
    </div>
    <el-dialog :title="classifyDialogTitle" :visible.sync="showClassifyDialog" width="40%">
      <el-form :model="currentClassify" label-width="80px">
        <el-form-item prop="id" label="序号">
          <el-input disabled v-model="currentClassify.id"></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          label="名称"
          :rules="[
            { required: true, trigger: 'blur', message: 'name is requried' },
            { max: 10, trigger: 'blur', message: 'name max length is 10' }
          ]"
        >
          <el-input v-model="currentClassify.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showClassifyDialog = false" size="small">取消</el-button>
        <el-button type="primary" @click="saveOrUpdateClassify" size="small">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
const defaultClassify = () => {
  return {
    id: '',
    name: ''
  }
}

export default {
  name: 'Classify',
  data() {
    return {
      classifyList: [
        {
          id: 1,
          name: '前端'
        },
        {
          id: 2,
          name: '后端'
        }
      ],
      size: 5,
      page: 1,
      classifyTotal: 0,
      classifyDialogTitle: '',
      showClassifyDialog: false,
      currentClassify: defaultClassify()
    }
  },
  methods: {
    retrieveClassify() {
      this.$store
        .dispatch('classify/getClassifyList', { page: this.page, size: this.size })
        .then(res => {
          console.log(res)
          this.size = res.data.size
          this.page = res.data.current
          this.classifyTotal = res.data.total
          this.classifyList = res.data.records
          Message({
            type: 'success',
            message: 'retrieve classify list success',
            duration: 1000
          })
        })
        .catch(reason => {
          Message({
            type: 'error',
            message: reason.message,
            duration: 1000
          })
        })
    },
    saveOrUpdateClassify() {
      if (!this.currentClassify.id) {
        this.$store
          .dispatch('classify/saveClassify', this.currentClassify)
          .then(res => {
            Message({
              type: 'success',
              message: '添加分类成功',
              duration: 1000
            })
            this.showClassifyDialog = false
            this.retrieveClassify()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '添加分类失败',
              duration: 1000
            })
          })
      } else {
        this.$store
          .dispatch('classify/updateClassify', this.currentClassify)
          .then(res => {
            Message({
              type: 'success',
              message: '修改分类成功',
              duration: 1000
            })
            this.showClassifyDialog = false
            this.retrieveClassify()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '修改分类失败',
              duration: 1000
            })
          })
      }
    },
    saveClassify() {
      this.classifyDialogTitle = '添加分类'
      this.showClassifyDialog = true
      this.currentClassify = defaultClassify()
    },
    editClassify(id) {
      this.$store.dispatch('classify/getById', id).then(res => {
        Object.assign(this.currentClassify, res.data)
        this.classifyDialogTitle = '修改分类'
        this.showClassifyDialog = true
      })
    },
    removeClassify(id) {
      MessageBox.confirm('提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确认',
        type: 'info',
        message: '您确认要删除此分类吗?'
      }).then(() => {
        this.$store
          .dispatch('classify/removeClassify', id)
          .then(res => {
            this.page = 1
            Message({
              type: 'success',
              message: '删除分类成功',
              duration: 1000
            })
            this.retrieveClassify()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '删除分类失败',
              duration: 1000
            })
          })
      })
    },
    sizeChangeHandle(val) {
      this.size = val
      this.retrieveClassify()
    },
    pageChangeHandle(val) {
      this.page = val
      this.retrieveClassify()
    }
  },
  mounted() {
    this.retrieveClassify()
  }
}
</script>

<style lang="scss" scoped>
.classify {
  padding: 10px;

  .classify-item {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>
