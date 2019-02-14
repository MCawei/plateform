<template>
    <div class="container">
      <div class="header">
        <img src="../assets/images/logo01.png" alt="">
      </div>
      <div class="content">
        <div class="logo2">
          <div class="plate-desc">
            <img src="../assets/images/title.png" alt="">
          </div>
        </div>
        <div class="login">
          <div class="form">
            <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="login-Form">
              <p class="title">登 录</p>
              <el-form-item prop="username">
                <el-input
                  placeholder="邮箱/用户名"
                  autocomplete="on"
                  v-model.number="loginForm.username">
                  <i slot="prefix" class="el-input__icon iconfont icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  placeholder="密码"
                  autocomplete="on"
                  v-model="loginForm.password">
                  <i slot="prefix" class="el-input__icon iconfont icon-password"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="yzm">
                <el-input
                  class="yzm-input"
                  placeholder="验证码"
                  autocomplete="on"
                  v-model="loginForm.yzm">
                  <i slot="prefix" class="el-input__icon iconfont icon-password"></i>
                </el-input>
                <span class="yzm-img">222</span>
              </el-form-item>
              <div class="login-row">
                <el-checkbox v-model="passChecked" @change="checkBox">记住密码</el-checkbox>
              </div>
              <div class="login-row">
               <p class="error-info" v-show="showError"><i class="iconfont icon-icon13"></i> {{errorInfo}}</p>
              </div>
              <div class="btn-wra">
                <el-button class="login-btn" :class="{disabled: showError}" @click="submitForm('loginForm')" :disabled="showError">登 录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <p class="bottom-txt">Copyright @ 2016 上海理想信息产业（集团）有限公司  版权所有</p>
    </div>
</template>

<script>
    export default {
        name: "plateLogin",
        data() {
          var userName = (rule, value, callback) => {
            if (value === '') {
                this.showError = true;
                this.errorInfo = "请输入正确的邮箱/用户名";
            } else {
              if(this.loginForm.password==='') {
                this.showError = true;
                this.errorInfo = "请输入正确密码";
                callback();
              } else {
                if(this.loginForm.yzm !=='') {
                  this.showError = false;
                }
                callback();
              }
            }
          };
          var password = (rule, value, callback) => {
            if (value === '') {
                this.showError = true;
                this.errorInfo = "请输入正确密码";
            } else {
              if(this.loginForm.username==='') {
                this.showError = true;
                this.errorInfo = "请输入正确的邮箱/用户名";
                callback();
              } else {
                if(this.loginForm.yzm !=='') {
                  this.showError = false;
                }
                callback();
              }
            }
          };
          var yzm = (rule, value, callback) => {
            if (value === '') {
              this.showError = true;
              this.errorInfo = "请输入验证码";
            } else {
              callback();
              if(this.loginForm.username==='' || this.loginForm.password==='') {
                this.showError = true;
              }else {
                this.showError = false;
                callback();
              }
              }
          };
          return {
            loginForm: {
              password: '',
              username: '',
              yzm:''
            },
            passChecked:true,
            showError: true,
            errorInfo:'请输入邮箱/用户名',

            loginRules: {
              username: [
                { validator: userName, trigger: ['blur', 'change'] }
              ],
              password: [
                { validator: password, trigger: ['blur', 'change'] }
              ],
              yzm: [
                { validator: yzm, trigger: ['blur', 'change'] }
              ]
            }
          };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              sessionStorage.setItem('isLogin', true);
              this.$router.push({
                path: '/home',
              })
            } else {
              this.showError = true;
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        checkBox(v) {
          console.log(v);
        }
      }
    }
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    height: 100%;
    font-size: 14px;
    .header {
      height: 64px;
      line-height: 64px;
      padding-left: 280px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .content {
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("../assets/images/loginBg.png") no-repeat;
      background-size: cover;
      display: flex;
      justify-content: flex-start;

      .logo2 {
        width: 55%;
        background: url("../assets/images/left-bg02.png") no-repeat 100% 100%;
        background-position: 10px 10px;
        position: relative;
        /*img { width: 100%;height: 94%;}*/
        .plate-desc {
          position: absolute;
          right: 12%;
          top: 36%;
        }
      }
      .login {
        width: 45%;

        .form {
          width: 440px;
          height: 460px;
          margin-top: 20%;
          background: url("../assets/images/login.png") no-repeat;
          background-size: cover;
          position: relative;
          .title {
            font-size: 40px;
            font-weight: 500;
            color: #00deff;
            margin-bottom: 20px;
            padding-left: 20px;
          }
          .login-Form {
            width: 340px;
            position: absolute;
            top: 50px;
            left: 50%;
            margin-left: -170px;

            .yzm-img {
              width: 40%;
              float: right;
              height: 40px;
              line-height: 40px;
              background: #fff;
              border-radius: 4px;
            }
            .yzm-input {
              width: 58%;
              float: left;
            }
            .login-row {
              padding: 0 15px;
              line-height: 24px;
            }
            .error-info {
              font-size: 14px;
              line-height: 20px;
              color: #f7ff13;
              text-align: center;
            }
            .btn-wra {
              line-height: 40px;
              margin-top: 20px;
            }
            .login-btn {
              width: 100%;
              line-height: 40px;
              font-size: 18px;
              color: #fff;
              border-radius: 6px;
              background: linear-gradient(to bottom, #19c1e6,#29bfc0,#35bda6);
            }
            .login-btn:hover, .login-btn:active {
              background: linear-gradient(to bottom, #35bda6,#29bfc0,#19c1e6);
            }
            .login-btn.disabled {
              background: #ddd;
            }
          }
        }
      }
    }
    .bottom-txt {
      position: absolute;
      bottom: 30px;
      left: 0;
      right: 0;
      text-align: center;
      color: #fff;
    }
  }
</style>
