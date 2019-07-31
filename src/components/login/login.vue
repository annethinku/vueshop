<template>
  <div class="login">
    <div class="loginBox">
      <div class="login-title">
        <i class="el-icon-d-arrow-right"></i>
        <span>欢迎登录礼先森后台</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm rulef2"
      >
        <el-form-item label="用户名" prop="username" class="redItem">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" class="redItem">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="btnMt">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码必须大于6位"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        username: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          let params = {
            name: that.ruleForm.username,
            password: that.ruleForm.pass
          };
          if (params.name == "admin" && params.password == "123456") {
            that.$message({
              message: "登录成功",
              type: "success"
            });
            sessionStorage.setItem("nickname", that.ruleForm.username);
            that.$store.commit("setName", that.ruleForm.username);
            that.$router.push({ path: "/index" });
          }else{
             that.$message({
              message: "登录失败",
              type: "error"
            });
          }
          // that.$axios
          //   .post("/Admin/login", that.qs.stringify(params))
          //   .then(function(response) {
          //     if (response.data.indexOf("账号或者密码错误") != -1) {
          //       that.$message.error("账号或者密码错误");
          //     }
          //     if (response.data.indexOf("登录成功") != -1) {
          //       that.$message({
          //         message: "登录成功",
          //         type: "success"
          //       });
          //       sessionStorage.setItem("nickname", that.ruleForm.username);
          //       that.$store.commit("setName", that.ruleForm.username);
          //       that.$router.push({ path: "/index" });
          //     }
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //   });
        } else {
          console.log("用户名或密码不正确!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    // 如果是登录状态就跳转首页
    if (this.$store.state.nickname) {
      this.$router.push({ path: "/index" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login {
  width: 100wh;
  min-height: 100vh;
  background: url("../../../static/images/bg.jpg") no-repeat center;
  background-size: cover;
}
.loginBox {
  width: 800px;
  height: 500px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -400px;
}
.login-title {
  margin: 20px;
  color: white;
  font-weight: bold;
  letter-spacing: 5px;
  padding: 0 0 15px 10px;
  border-bottom: 1px rgba(255, 255, 255, 0.3) solid;
}
.demo-ruleForm.rulef2 {
  width: 510px;
  margin: 80px auto 0;
}
.redItem {
  margin-bottom: 40px;
}
.redItem .el-form-item__label {
  color: white;
}
.btnMt {
  margin-top: 100px;
}
</style>
