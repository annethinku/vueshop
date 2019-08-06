<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside
        :width="isCollapse?'80px':'200px'"
        style="background-color: rgb(238, 241, 246);padding:0 10px;overflow-x:hidden;"
      >
        <div style="width:100%;text-align:center;padding:20px 0;">
          <img src="../../../static/images/logo.png" alt="logo" width="60px" />
        </div>
        <el-menu
          :default-openeds="['1']"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="this.$route.path"
          router
        >
          <el-submenu :index="(index+1).toString()" v-for="(item,index) in navAll" :key="index">
            <template slot="title">
              <i :class="item.titleIcon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group v-for="(item2,index2) in item.conts" :key="index2">
              <template slot="title">{{item2.title}}</template>
              <el-menu-item
                :index="item3.path"
                v-for="(item3,index3) in item2.conts"
                :key="index3"
              >{{item3.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <!-- <el-menu
          :default-openeds="['2']"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="false"
          default-active="2-1"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>消息管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">模板消息</template>
              <el-menu-item index="1-1">召回模板消息</el-menu-item>
              <el-menu-item index="1-2">发送成功模板消息</el-menu-item>
              <el-menu-item index="1-3">地址模板消息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">商品管理</template>
              <el-menu-item index="2-1" :route="{path:'/product'}">商品管理</el-menu-item>
              <el-menu-item index="2-2" :route="{path:'/psort'}">商品分类管理</el-menu-item>
              <el-menu-item index="2-3">标签分类管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="贺卡管理">
              <el-menu-item index="2-4">贺卡管理</el-menu-item>
              <el-menu-item index="2-5">贺卡主题管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="订单管理">
              <el-menu-item index="2-6">送礼订单管理</el-menu-item>
              <el-menu-item index="2-7">订单管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="其他">
              <el-menu-item index="2-8">会员管理</el-menu-item>
              <el-menu-item index="2-9">充值管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设置</span>
            </template>
            <el-menu-item-group title="系统设置">
              <el-menu-item index="3-1">系统设置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="统计">
              <el-menu-item index="3-2">来源统计</el-menu-item>
              <el-menu-item index="3-3">销量统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>-->
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div style="float:left;font-size:30px;display:inline-block;" @click="toggleNav">
            <i class="el-icon-s-fold"></i>
          </div>
          <el-dropdown @command="exitLogin">
            <i class="el-icon-setting" style="margin-right: 15px;color:#fff"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updatePass">修改密码</el-dropdown-item>
              <el-dropdown-item command="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{nickname}}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogTableVisible">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldpass">
          <el-input v-model="ruleForm.oldpass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    var oldpass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("旧密码不能为空"));
      } else {
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const navs = [
      {
        title: "商品管理",
        titleIcon: "el-icon-menu",
        conts: [
          {
            title: "商品管理",
            conts: [
              {
                title: "商品管理",
                path: "/product"
              },
              {
                title: "商品分类管理",
                path: "/psort"
              },
              {
                title: "标签分类管理",
                path: "/tagsort"
              }
            ]
          },
          {
            title: "贺卡管理",
            conts: [
              {
                title: "贺卡管理",
                path: "/heka"
              },
              {
                title: "贺卡主题管理",
                path: "/hekahome"
              }
            ]
          },
          {
            title: "订单管理",
            conts: [
              {
                title: "送礼订单管理",
                path: "/slorder"
              },
              {
                title: "订单管理",
                path: "/order"
              }
            ]
          },
          {
            title: "其他",
            conts: [
              {
                title: "会员管理",
                path: "/huiyuan"
              },
              {
                title: "充值管理",
                path: "/chongzhi"
              }
            ]
          }
        ]
      },
      {
        title: "消息管理",
        titleIcon: "el-icon-message",
        conts: [
          {
            title: "模板消息",
            conts: [
              {
                title: "召回模板消息",
                path: "/zhaohui"
              },
              {
                title: "发送成功模板消息",
                path: "/success"
              },
              {
                title: "地址模板消息",
                path: "/address"
              }
            ]
          }
        ]
      },
      {
        title: "设置",
        titleIcon: "el-icon-setting",
        conts: [
          {
            title: "系统设置",
            conts: [
              {
                title: "系统设置",
                path: "/stystem"
              }
            ]
          },
          {
            title: "统计",
            conts: [
              {
                title: "来源统计",
                path: "/lytongji"
              },
              {
                title: "销量统计",
                path: "/xltongji"
              }
            ]
          }
        ]
      }
    ];

    return {
      nickname: "",
      isCollapse: false,
      navAll: navs,
      dialogTableVisible: false,
      ruleForm: {
        pass: "",
        checkPass: "",
        oldpass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpass: [{ validator: oldpass, trigger: "blur" }]
      }
    };
  },
  components: {

  },
  mounted() {
    //   未登录状态跳转登录
    if (!this.$store.state.nickname) {
      this.$router.push({ path: "/" });
    } else {
      this.nickname = this.$store.state.nickname;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    toggleNav() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },
    exitLogin(command) {
      if (command == "exitLogin") {
        this.$confirm("确定要退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            sessionStorage.removeItem("nickname");
            this.$store.commit("setName", "");
            this.$router.push({ path: "/" });
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          });
      } else if (command == "updatePass") {
        this.dialogTableVisible = true;
      }
    }
  }
};
</script>
<style>
.el-header {
  background-color: #20407b;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  color: #fff;
}
.dis .el-tabs__content {
  display: none;
}
</style>
