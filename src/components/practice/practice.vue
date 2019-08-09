<template>
  <div>
    <h2>计算属性vs侦听属性</h2>
    <div>
      <ul>
        <li>计算属性(同步)： {{message}}</li>
        <li>
          侦听属性(异步)：
          <input type="text" v-model="time" />
        </li>
      </ul>
    </div>
    <h2>class与style绑定</h2>
    <div>
      <ul>
        <li>
          对象语法：
          <span :class="classObj">我是变换的文字</span>
        </li>
        <li>
          数组语法：
          <span :class="[active,isfont]">我是变换的文字2</span>
        </li>
        <li>用在组件上:{{html}}</li>
        <li>
          列表渲染：注意事项
          <p>vm.item[1]='x' //不是响应式</p>
          <p>vm.item[1]='x'//不是响应式</p>可以使用：
          <p>Vue.set(vm.items,indexOfItem,newValue)</p>
          <p>vm.items.splice(indexOfItem,1,newValue)</p>
          <p>vm.$set(vm.items,indexOfItem,newValue)</p>
          <p>vm.items.splice(newLength)</p>
        </li>
        <li>
          事件修饰符： <br/>
          .stop .prevent .capture .self .once .passive <br/>
          阻止单击事件继续传播 v-on:click.stop="dothis" <br/>
          提交事件不再重载页面 v-on:submit.prevent="" <br/>
          修饰符可以串联：v-on:click.stop.prevent="" <br/>
          添加事件监听器时使用事件捕获模式 <br/>
          即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 <br/>
          v-on:click.capture="doThis" <br/>
          只当在 event.target 是当前元素自身时触发处理函数 <br/>
          即事件不是从内部元素触发的 <br/>
          v-on:click.self="doThat"
        </li>
        <li>
          按键修饰符：
          v-on:keyup.enter
          v-on:keyup.page-down <br/>
          .tab .delete  .esc .space .up
          .down .left .right <br/>
          你还可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "Hello",
      time: 0,
      active: "active",
      isfont: "isfont",
      html: ' <my-component v-bind:class="{ active: isActive }"></my-component>'
    };
  },
  computed: {
    message: {
      get: function() {
        //   getter
        return this.msg
          .split("")
          .reverse()
          .join("");
      },
      set: function(newval) {
        //   未执行setter 不知为何
        this.msg = "set改变了" + newval;
      }
    },
    classObj() {
      return {
        active: true,
        isfont: false
      };
    }
  },
  watch: {
    time() {
      setTimeout(() => {
        this.time = new Date();
      }, 1000);
    }
  }
};
</script>
<style scoped>
ul li {
  margin: 20px;
}
.active {
  color: red;
  font-weight: bold;
}
.isfont {
  font-size: 20px;
}
</style>

