<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mt">
      <el-button @click="showMask">自定义弹窗1</el-button>
      <el-button type="primary" @click="showMask">自定义弹窗2</el-button>
      <el-button type="success" @click="showMask">自定义弹窗3</el-button>
    </div>
    <my-mask :flag="flag" :title="title" @rflag="rflag">
       <div slot="content" class="contentSty"><i class="el-icon-magic-stick" style="color:red;"></i>{{content}}</div>
    </my-mask>
  </div>
</template>
<script>
import myMask from '../../mask/mask'
export default {
  data(){
    return {
      flag:false,
      title:'',
      content:''
    }
  },
  components:{
    'my-mask':myMask
  },
  methods:{
    rflag(val){
      this.flag=val;
    },
    showMask(e){
      this.flag=true;
      this.title=e.srcElement.innerText;
      this.content=e.srcElement.innerText;
    }
  }
};
</script>
<style scoped>
.mt{
  margin-top: 20px;
}
</style>
