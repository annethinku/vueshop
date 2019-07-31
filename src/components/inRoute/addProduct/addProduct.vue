<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{lastname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请填写商品名称"></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="sort">
        <el-select v-model="ruleForm.sort" placeholder="请选择所属分类">
          <el-option label="个性好礼" value="个性好礼"></el-option>
          <el-option label="创意定制" value="创意定制"></el-option>
          <el-option label="礼品卡券" value="礼品卡券"></el-option>
          <el-option label="健康生活" value="健康生活"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-select v-model="ruleForm.tag" filterable placeholder="请选择">
          <el-option
            v-for="item in arr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="贺卡" prop="heka">
        <el-select v-model="ruleForm.heka" filterable placeholder="请选择">
          <el-option
            v-for="item in arr2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input
          v-model.number="ruleForm.price"
          autocomplete="off"
          placeholder="请填写商品价格"
          style="width:200px"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="changeImgs"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="ruleForm.dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="描述" prop="content">
        <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor
          v-model="ruleForm.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        ></quill-editor>

        <!-- Or manually control the data synchronization（或手动控制数据流） -->
        <!-- <quill-editor :content="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lastname:'添加商品',
      editorOption: {
        // some quill options
      },
      dialogVisible: false,
      disabled: false,
      arr: [
        {
          value: "长辈",
          label: "长辈"
        },
        {
          value: "好友",
          label: "好友"
        },
        {
          value: "表白",
          label: "表白"
        },
        {
          value: "同学",
          label: "同学"
        },
        {
          value: "个性",
          label: "个性"
        }
      ],
      arr2: [
        {
          value: "简约植物贺卡",
          label: "简约植物贺卡"
        },
        {
          value: "祝福卡片",
          label: "祝福卡片"
        }
      ],
      ruleForm: {
        fileList:[],
        dialogImageUrl: "",
        content: "",
        name: "",
        sort: "",
        price: null,
        heka: "",
        tag: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "请选择所属分类", trigger: "change" }
        ],
        tag: [{ required: true, message: "请选择标签", trigger: "change" }],
        heka: [
          { required: true, message: "请选择贺卡", trigger: "change" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "价格必须为数字值" }
        ],
        content: [
          { required: true, message: "请输入商品描述", trigger: "blur" }
        ]
      },
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  mounted() {
    // console.log("this is current quill instance object", this.editor);
    if(this.$route.query.tablist){
      this.ruleForm=this.$route.query.tablist;
      this.lastname='修改商品';
    }
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.ruleForm.content = html;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("添加成功!");
          let params = this.ruleForm;
          console.log(params);
          this.$store.commit("setData", params);
          this.$router.push({path:'/product'})
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.ruleForm.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    changeImgs(file, fileList){
     this.ruleForm.fileList=fileList;
    }
  }
};
</script>
<style scoped>
.demo-ruleForm {
  margin-top: 40px;
}
</style>
