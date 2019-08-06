<template>
  <div>
    <div class="mask" v-if="flag">
      <div class="m-center">
        <div class="titleSty">{{title}}提示</div>
        <slot name="content"></slot>
        <div class="btns">
            <el-button type="primary" @click="cancelMask">确定</el-button>
            <el-button @click="cancelMask">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:['flag','title'],
    methods:{
        cancelMask(){
          this.$emit('rflag',false);
        }
    }
};
</script>
<style scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 22;
  background: rgba(0, 0, 0, 0.5);
}
.m-center{
    width: 400px;
    height: 260px;
    border-radius: 10px;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -130px;
}
.titleSty{
    border-bottom: 1px #e6e6e6 solid;
    padding: 20px;
}
.contentSty{
    text-align: center;
    margin: 40px;
}
.btns{
    display: flex;
    justify-content: space-around;
    margin-top: 70px;
}
</style>
