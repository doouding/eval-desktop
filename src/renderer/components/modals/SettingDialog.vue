<template>
  <el-dialog
    class="settting-dialog"
    title="设置"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="600px"
    center>
    <el-row>
      <el-col :span="6">
        <el-menu
          background-color="#F9F9F9"
          default-active="0">
          <el-menu-item index="0">
            <i class="el-icon-edit-outline"></i>
            <span>编辑器设置</span>
          </el-menu-item>
          <el-menu-item index="1">
            <i class="el-icon-sort"></i>
            <span>快捷键设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  },

  methods: {
    show () {
      this.dialogVisible = true
    },
    handleClose () {}
  }
}
</script>

<style lang="sass">
.settting-dialog .el-dialog__body
  padding: 10px 0px 27px !important
</style>
