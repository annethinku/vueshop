<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="saixuan">
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="input-flex">
        <span>订单号</span>
        <el-input placeholder="请输入订单号" v-model="input" clearable></el-input>
      </div>
      <div class="input-flex">
        <span>会员名</span>
        <el-input placeholder="请输入会员名" v-model="input2" clearable></el-input>
      </div>
      <div class="mlsel">
        <el-select v-model="value" clearable placeholder="全部">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="mlsel">
        <el-select v-model="value2" clearable placeholder="全部">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" icon="el-icon-search" style="margin-left:10px;">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column fixed prop="xuhao" label="序号"></el-table-column>
      <el-table-column prop="ordern" label="订单号"></el-table-column>
      <el-table-column prop="name" label="送礼人"></el-table-column>
      <el-table-column prop="sort" label="送礼类型"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="price" label="订单总价"></el-table-column>
      <el-table-column prop="logo" label="logo价格"></el-table-column>
      <el-table-column prop="time" label="下单时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleClick(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看详情" :visible.sync="dialogTableVisible">
        <ul class="ulsty">
            <li>商品名称：中国古代心理学</li>
            <li>数量：1</li>
            <li>优惠券：未使用</li>
            <li>图片：</li>
            <li>型号：</li>
            <li>材质：</li>
            <li>logo：不需要</li>
            <li>文字</li>
            <li>图片：</li>
        </ul>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    const item = {
      xuhao: "1085",
      ordern: "s2019070500000001",
      name: "杨猪头",
      sort: "自己买",
      status: "结束",
      price: 68,
      logo: 0,
      heka: 0,
      time: "2019-07-05 12:50:35"
    };
    return {
      value1: "",
      input: "",
      input2: "",
      tableData: Array(4).fill(item),
      options: [
        {
          value: "自己买",
          label: "自己买"
        },
        {
          value: "送朋友",
          label: "送朋友"
        },
        {
          value: "群发",
          label: "群发"
        }
      ],
      options2: [
        {
          value: "赠送中",
          label: "赠送中"
        },
        {
          value: "结束",
          label: "结束"
        },
        {
          value: "未赠送",
          label: "未赠送"
        }
      ],
      value: "",
      value2: "",
      dialogTableVisible:false
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
      this.dialogTableVisible=true;
    }
  }
};
</script>
<style scoped>
.saixuan {
  display: flex;
  display: -webkit-flex;
  margin: 40px;
}
.input-flex {
  display: flex;
  display: -webkit-flex;
  font-size: 16px;
  color: #333;
  margin-left: 20px;
  align-items: center;
}
.input-flex span {
  width: 100px;
  display: block;
  text-align: right;
  margin-right: 10px;
}
.mlsel {
  margin-left: 20px;
}
.ulsty{
    list-style: none;
    font-size: 14px;
    color: #333;
    width: 80%;
    margin: 0 auto;
    line-height: 30px;
}
</style>
