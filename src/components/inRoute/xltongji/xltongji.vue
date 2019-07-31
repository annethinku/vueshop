<template>
  <div>
    <div>
      <div class="wid">
        <ve-histogram :data="chartData"></ve-histogram>
      </div>
      <div class="wid">
        <ve-funnel :data="chartData2"></ve-funnel>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      chartData2: {
        columns: ["状态", "数值"],
        rows: [
          { 状态: "展示", 数值: 900 },
          { 状态: "访问", 数值: 600 },
          { 状态: "点击", 数值: 300 },
          { 状态: "订单", 数值: 100 }
        ]
      }
    };
  }
};
</script>
<style scoped>
.wid {
  width: 500px;
}

</style>
