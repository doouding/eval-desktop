<template>
  <el-dialog
    title="登陆"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="400px"
    center>
    <el-form ref="form" :rules="rules" :model="form" label-width="50px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="帐号或者邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="login">登陆</el-button>
      <el-button @click="dialogVisible = false" size="small">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as userAPI from '../../api/user.api'
import { signal$ } from '../../store/root'

export default {
  data () {
    return {
      dialogVisible: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show () {
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$refs['form'].resetFields()
      this.$nextTick(done)
    },
    login () {
      userAPI.login(this.form.username, this.form.password)
        .then((user) => {
          this.dialogVisible = false
          signal$.next(['user'])
        })
        .catch(this.$msg.error)
    }
  }
}
</script>

<style lang="sass">
</style>
