<template>
  <div>
    <!-- 预览文章分类 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateShowDialogBtnFn"
          >添加分类</el-button
        >
      </div>

      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateFn(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="removeFn(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加文章分类对话框 -->
    <el-dialog
      :title="isEdit ? '编辑文章分类' : '添加文章分类'"
      :visible.sync="dialogVisible"
      width="35%"
      @closed="onAddClosedFn"
    >
      <!-- 添加的表单 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            minlength="1"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            minlength="1"
            maxlength="15"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleFn" size="mini">取 消</el-button>
        <el-button type="primary" @click="confirmFn" size="mini"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getArtCateListAPI,
  addArtCateAPI,
  updateArtCateAPI,
  delArtCateAPI
} from '@/api'

export default {
  name: 'ArtCate',
  data() {
    return {
      cateList: [],
      dialogVisible: false,
      addForm: {
        // 添加表单的数据对象
        cate_name: '',
        cate_alias: ''
      },
      addRules: {
        // 添加表单的验证规则对象
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          {
            pattern: /^\S{1,10}$/,
            message: '分类名必须是1-10位的非空字符',
            trigger: 'blur'
          }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: '分类别名必须是1-15位的字母数字',
            trigger: 'blur'
          }
        ]
      },
      editId: '',
      isEdit: false
    }
  },
  created() {
    this.initCateListFn()
  },
  methods: {
    async initCateListFn() {
      const res = await getArtCateListAPI()
      this.cateList = res.data.data
    },
    // 添加分类按钮点击事件
    addCateShowDialogBtnFn() {
      this.editId = '' // 编辑的文章分类id设置无
      this.isEdit = false // 编辑的状态关闭
      this.dialogVisible = true
    },
    // 对话框确定按钮->点击事件
    async confirmFn() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          // 判断是新增还是编辑
          if (this.isEdit) {
            const { data: res } = await updateArtCateAPI({
              id: this.editId,
              ...this.addForm
            })
            if (res.code !== 0) return this.$message.error('更新分类失败')
            this.$message.success('更新分类成功！')
          } else {
            // 新增
            // 调用接口传递数据给后台
            const { data: res } = await addArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error('添加分类失败')
            this.$message.success('添加分类成功！')
          }

          // 重新请求列表数据
          this.initCateListFn()
          // 关闭对话框
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    cancleFn() {
      this.dialogVisible = false
    },
    onAddClosedFn() {
      this.$refs.addRef.resetFields()
    },
    // 修改文章分类
    updateFn(obj) {
      this.editId = obj.id
      this.isEdit = true
      this.dialogVisible = true
      // 设置回显数据
      this.$nextTick(() => {
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 删除文章分类
    async removeFn(id) {
      const { data: res } = await delArtCateAPI(id)
      if (res.code !== 0) return this.$message.error('删除分类失败')
      this.$message.success('删除分类成功')
      // 重新请求列表数据
      this.initCateListFn()
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
