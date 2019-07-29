<template>
  <div>
    <!-- @tab-click="handleClick" -->
    <el-tabs v-model="activeName" type="card" class="dis">
      <el-tab-pane label="个性好礼" name="first">个性好礼</el-tab-pane>
      <el-tab-pane label="创意定制" name="second">创意定制</el-tab-pane>
      <el-tab-pane label="礼品卡券" name="third">礼品卡券</el-tab-pane>
      <el-tab-pane label="健康生活" name="fourth">健康生活</el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="addPro">添加商品</el-button>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column fixed prop="name" label="名称"></el-table-column>
      <el-table-column prop="sort" label="所属分类"></el-table-column>
      <el-table-column prop="tag" label="标签"></el-table-column>
      <el-table-column prop="heka" label="贺卡"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="dialogImageUrl" label="图片"></el-table-column>
      <el-table-column prop="content" label="描述"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteClick(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:20px 0;text-align:right;">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const item = {
      name: "小青柑普洱茶28枚礼盒装",
      sort: "个性好礼",
      tag: "同学",
      price:388,
      heka:'生日贺卡',
      dialogImageUrl: '',
      content: "茶叶闻名 飘香四溢"
    };
    return {
      activeName: "first",
      tableData: Array(8).fill(item)
    };
  },
  mounted(){
    if(this.$store.state.SET_DATA.name){
    this.tableData.unshift(this.$store.state.SET_DATA);
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.$router.push({path:'/addProduct',query:{tablist:row}})
    },
    deleteClick(row) {
      this.$confirm("确定要删除此条记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(
            this.tableData.findIndex(item => item === row),
            1
          );
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    addPro(){
      this.$router.push({path:'/addProduct'});
    }
  }
};
</script>
<style>
</style>
