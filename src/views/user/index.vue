<template>
  <div class="user-container">
    <div class="user-search user-item">
      <el-input
        placeholder="请输入关键字查询"
        v-model="keyword"
        :maxlength="200"
        size="small"
        :clearable="true"
        prefix-icon="el-icon-search"
        @clear="getUserInfo"
        class="user-keyword-input"
      ></el-input>
      <el-button type="primary" class="query-key-btn" size="small" @click="queryHandle"
        >查询</el-button
      >
      <el-button type="warning" class="reset-key-btn" size="small" @click="resetHandle"
        >重置</el-button
      >
    </div>
    <div class="user-operator user-item">
      <el-button type="success" size="small" @click="addUser">新增</el-button>
      <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button>
    </div>
    <div class="user-list user-item">
      <el-table
        style="width: 100%"
        :data="userInfo.records"
        class="user-table"
        @select="tableSelectHandle"
        @select-all="tableAllSelectHandle"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column
          prop="username"
          label="用户名"
          width="100"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="avatar" label="头像" width="120" align="center">
          <template slot-scope="scope">
            <!-- <img class="user-avatar" :src="scope.row.avatar" /> -->
            <el-image
              class="user-avatar"
              fit="fill"
              :src="scope.row.avatar"
              :preview-src-list="avatarList"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex ? '女' : '男' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-switch :value="!!scope.row.status" @change="updateStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="email"
          label="邮箱"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="introduction"
          label="描述"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="removeUser(scope.row)">删除</el-button>
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
        :total="userInfo.total"
      >
      </el-pagination>
    </div>
    <div class="dialogs">
      <el-dialog
        :title="editUserDialogTitle"
        :visible.sync="showEditUserDialog"
        width="40%"
        :before-close="editUserDialogCloseHandle"
      >
        <el-form :model="user" :rules="userRules" size="small" label-width="80px" ref="userForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="user.username" placeholder="请输入您的用户名" />
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:9966/file/upload"
              :headers="{ token }"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="user.avatar" :src="user.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="user.sex" placeholder="请选择您的性别">
              <el-option label="男" :value="0"></el-option>
              <el-option label="女" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-switch :value="!!user.status" @change="triggerStatus(user.status)"></el-switch>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input type="text" v-model="user.phone" placeholder="请输入您的电话" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="user.email" placeholder="请输入您的邮箱" />
          </el-form-item>
          <el-form-item label="描述" prop="introduction">
            <el-input type="textarea" v-model="user.introduction" placeholder="请输入您的描述" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogCloseHandle">取消</el-button>
          <el-button type="primary" @click="confirmSubmit">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState, mapGetters } from 'vuex'
import userRules from './userRules'

const defaultUser = () => {
  return {
    id: '',
    username: '',
    avatar: undefined,
    sex: 0,
    status: 1,
    phone: '',
    email: '',
    introduction: ''
  }
}

export default {
  name: 'User',
  data() {
    return {
      keyword: '',
      page: 1,
      size: 10,
      showEditUserDialog: false,
      editUserDialogTitle: '',
      user: defaultUser(),
      userRules,
      selectList: []
    }
  },
  methods: {
    getUserInfo() {
      this.$store
        .dispatch('admin/getUserInfo', { page: this.page, size: this.size, keyword: this.keyword })
        .then(res => {
          console.log(res)
          Message({
            type: 'success',
            message: 'retrieve user list success',
            duration: 1000
          })
        })
        .catch(reason => {
          Message({
            type: 'error',
            message: reason.message || '获取用户信息失败',
            duration: 1000
          })
        })
    },
    saveOrUpdateUser(user) {
      // console.log(user)
      if (!user.id) {
        // console.log('add')
        user.password = '123456'
        this.$store
          .dispatch('admin/saveUser', user)
          .then(res => {
            Message({
              type: 'success',
              message: '添加用户成功',
              duration: 1000
            })
            this.getUserInfo()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '添加用户失败',
              duration: 1000
            })
          })
      } else {
        this.$store
          .dispatch('admin/updateUser', user)
          .then(res => {
            Message({
              type: 'success',
              message: '修改用户信息成功',
              duration: 1000
            })
            this.getUserInfo()
          })
          .catch(reason => {
            Message({
              type: 'error',
              message: '修改用户信息失败',
              duration: 1000
            })
          })
      }
      this.showEditUserDialog = false
      this.user = defaultUser()
    },
    confirmSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.saveOrUpdateUser(this.user)
        } else {
          Message({
            type: 'error',
            message: '数据格式不匹配',
            duration: 1000
          })
        }
      })
    },
    batchDelete() {
      // console.log(this.selectList)
      if (this.selectList.length < 1) {
        Message({
          type: 'error',
          message: '请先选择要删除的用户',
          duration: 1000
        })
        return
      }
      this.$confirm('您确认要删除吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(val => {
          this.$store
            .dispatch('admin/batchDelete', this.selectList)
            .then(res => {
              this.page = 1
              Message({
                type: 'success',
                message: '删除成功',
                duration: 1000
              })
              this.getUserInfo()
            })
            .catch(reason => {
              Message({
                type: 'error',
                message: '删除失败',
                duration: 1000
              })
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addUser() {
      this.editUserDialogTitle = '添加用户'
      this.showEditUserDialog = true
    },
    editUser(user) {
      this.$store
        .dispatch('admin/getById', user.id)
        .then(res => {
          this.user = res.data
          this.editUserDialogTitle = '修改用户'
          this.showEditUserDialog = true
        })
        .catch(reason => {
          Message({
            type: 'error',
            message: reason.message,
            duration: 1000
          })
        })
    },
    removeUser(user) {
      this.selectList = [user.id]
      this.batchDelete()
    },
    updateStatus(user) {
      this.$store
        .dispatch('admin/updateUser', user)
        .then(res => {
          user.status = 1 - user.status
          Message({
            type: 'success',
            message: '修改用户状态成功',
            duration: 1000
          })
        })
        .catch(reason => {
          Message({
            type: 'error',
            message: '修改用户状态失败',
            duration: 1000
          })
        })
    },
    queryHandle() {
      this.getUserInfo()
    },
    resetHandle() {
      this.keyword = ''
      this.getUserInfo()
    },
    sizeChangeHandle(size) {
      this.size = size
      this.getUserInfo()
    },
    pageChangeHandle(page) {
      this.page = page
      this.getUserInfo()
    },
    editUserDialogCloseHandle() {
      this.user = defaultUser()
      this.editUserDialogTitle = ''
      this.showEditUserDialog = false
    },
    handleAvatarSuccess(res, file) {
      this.user.avatar = res.data
    },
    beforeAvatarUpload(file) {
      let type = file.type
      return type.includes('image')
    },
    triggerStatus(status) {
      this.user.status = 1 - status
    },
    tableSelectHandle(val) {
      this.selectList = val.map(x => x.id)
    },
    tableAllSelectHandle(val) {
      this.selectList = val.map(x => x.id)
    }
  },
  computed: {
    ...mapState('admin', ['userInfo']),
    ...mapGetters(['token']),
    avatarList: function () {
      return this.userInfo.records.map(x => x.avatar)
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;

  .user-item {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
  }

  .user-search {
    display: flex;
    flex-direction: row;

    .user-keyword-input {
      width: 300px;
    }

    .query-key-btn,
    .reset-key-btn {
      margin-left: 10px;
    }
  }

  .user-list {
    .user-table {
      margin-bottom: 18px;

      .user-avatar {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}
</style>
