<template>
  <div class="login-page">
    <!-- 左侧插画区域 -->
    <div class="login-illustration">

    </div>
    <!-- 右侧登录面板 -->
    <div class="login-panel">
      <!-- 顶部Logo和标题 -->
      <div class="panel-header">
        <div class="title">登陆中心</div>
      </div>
      <el-divider></el-divider>
      <!-- 账号登录表单 -->
      <div class="login-form-wrapper">
        <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            class="account-form"
            label-position="right"
        >
          <!-- 用户名 -->
          <el-form-item prop="loginId">
            <el-input
                v-model="loginForm.loginId"
                placeholder="用户名"
                prefix-icon="User"
                autocomplete="loginId"
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="loginPwd">
            <el-input
                v-model="loginForm.loginPwd"
                type="loginPwd"
                placeholder="密码"
                prefix-icon="Lock"
                show-loginPwd
                autocomplete="current-loginPwd"
            />
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
                style="width: 100%;"
                type="primary"
                size="large"
                @click="handleLogin"
                :loading="isLoading"
                block
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 底部版权（去掉语言切换） -->
      <div class="panel-footer">
        <div class="copyright">©权威认证</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import {ElForm, ElFormItem, ElInput, ElButton, ElMessage} from 'element-plus'
import {$Login} from "../api/admin.ts";

// 表单引用
const loginFormRef = ref<InstanceType<typeof ElForm>>()

// 加载状态
const isLoading = ref<boolean>(false)


// 登录表单数据
const loginForm = reactive({
  loginId: '',
  loginPwd: '',
  factory: '', // 厂别
  captcha: '' // 验证码
})

// 表单验证规则
const loginRules = reactive({
  loginId: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur'}
  ],
  loginPwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
  ],


})


// 登录处理函数
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    const valid = await loginFormRef.value.validate()
    if (valid) {
      isLoading.value = true
      setTimeout(() => {
        $Login(loginForm)
        ElMessage.success('登录成功！')
        isLoading.value = false
        // 登录成功后跳转逻辑
        // router.push('/home')
      }, 1500)
    }
  } catch (error) {
    ElMessage.error('表单验证失败，请检查输入！')
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;

  // 左侧插画区域（匹配参考图的蓝色渐变+插画）
  .login-illustration {
    width: 75%;
    height: 100%;
    //background: linear-gradient(135deg, #4a80ff 0%, #1e57d9 100%);
    background-image: url('../image/login.png'); // 替换为实际插画
    background-size: cover;
    background-position: center;
  }

  // 右侧登录面板
  .login-panel {
    display: flex;
    justify-content: space-evenly;
    width: 25%;
    height: 100%;
    padding: 20% 50px;
    box-sizing: border-box;
    flex-direction: column;

    // 顶部Logo和标题
    .panel-header {

      .title {
        font-size: 35px;
        text-align: center;
        font-weight: 600;
      }
    }

    // 登录表单容器
    .login-form-wrapper {
      margin-top: 5%;

      .account-form {
        :deep(.el-form-item) {
          margin-bottom: 20px;
        }

        // 验证码项布局
        .captcha-item {
          display: flex;
          align-items: center;
          gap: 10px;

          :deep(.el-form-item__content) {
            width: 100%;
            display: flex;
            gap: 10px;
          }
        }

        // 验证码图片样式
        .captcha-img {
          width: 100px;
          height: 40px;
          background: #f5f5f5;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          user-select: none;
        }

        // 输入框样式
        :deep(.el-input__wrapper),
        :deep(.el-select__wrapper) {
          border-radius: 4px;
          border: 1px solid #ddd;
        }

        // 登录按钮样式
        :deep(.el-button) {
          height: 44px;
          font-size: 16px;
          border-radius: 4px;
          background: #1e57d9;
          border: none;

          &:hover {
            background: #1a4dc7;
          }
        }
      }
    }

    // 底部版权（去掉语言切换）
    .panel-footer {
      .copyright {
        font-size: 12px;
        color: #999;
        text-align: center;
      }
    }
  }
}

// 响应式适配
@media (max-width: 992px) {
  .login-page {
    flex-direction: column;

    .login-illustration {
      width: 100%;
      height: 30%;
    }

    .login-panel {
      width: 100%;
      height: 70%;
      padding: 30px;
    }
  }
}
</style>
