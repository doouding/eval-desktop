<template>
  <el-dialog
    title="注册"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="400px"
    center>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="用于登陆和找回密码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_password">
        <el-input v-model="form.re_password" type="password" placeholder="密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="small" @click="register">注册</el-button>
      <el-button @click="dialogVisible = false" size="small">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import * as userAPI from '../../api/user.api'

export default {
  data () {
    let repasswordValidate = (rule, value, callback) => {
      let errors = []
      if (value !== this.form.password) {
        errors.push(new Error('两次输入密码不一致'))
      }
      callback(errors)
    }
    return {
      dialogVisible: false,
      form: {
        email: '',
        username: '',
        password: '',
        re_password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        re_password: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: repasswordValidate, trigger: 'blur' }
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
    register () {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        userAPI.register(this.form.email, this.form.username, this.form.password)
          .then(() => {
            this.$confirm('注册成功，请进入邮箱查看邮件激活帐号', '注册成功', {
              confirmButtonText: '确定',
              showCancelButton: false,
              center: true,
              type: 'success'
            })
              .then(() => {
                this.dialogVisible = false
              })
          })
          .catch(this.$msg.error)
      })
    }
  }
}
</script>
