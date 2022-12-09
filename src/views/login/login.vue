<template>
	<div class="page">
		<div class="loginBox">
			<el-card class="box-card">
				<h3 class="center">欢迎登录</h3>
				<el-form ref="loginForm" :model="loginForm" label-width="80px" class="top">
					<el-input placeholder="请输入账号" v-model="loginForm.username">
						<template slot="prepend">
							<i class="el-icon-user"></i>
						</template>
					</el-input>
					<el-input placeholder="请输入密码" v-model="loginForm.password" type="password" show-password class="top">
						<template slot="prepend">
							<i class="el-icon-lock"></i>
						</template>
					</el-input>
					<el-button type="primary" @click="handleLogin" style="width: 100%;margin-top: 30px">立即登录</el-button>
				</el-form>
				<div class="bottom-btn" @click="register">立即注册</div>
			</el-card>
		</div>

		<el-dialog title="" :visible.sync="overdueDialog" width="50%" :modal="false" center custom-class="dialog-border">
			<div class="center">
				<h2 class="red">当前用户未认证、待激活</h2>
				<h2 class="red">请联系管理员曾波【微信 / 电话: 15202864004】</h2>
				<br/> <img style="width: 200px; height: 280px" src="@/assets/images/weChat.jpg"/>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
    name: 'login',
    components: {},
    props: {},
    watch: {},
    data() {
        return {
            loginForm: {},
            overdueDialog: false,
        };
    },

    mounted() {

    },
    created() {

    },

    methods: {
        handleLogin() {
            const {username, password} = this.loginForm
            if (username && password) {
                const param = {
                    username,
                    password,
                };
                this.$store.dispatch("user/login", param).then(() => {
                    this.$router.push({
                        path: this.redirect || "/",
                        query: this.otherQuery,
                    });
                }).catch((error) => {
                    if (error.status == "999") {
                        this.overdueDialog = true;
                    }
                });
            } else {
                this.$message.warning("账号或密码不能为空！");
                return false;
            }
        },
        register() {
            this.$router.push({
                path: '/register'
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;

  .loginBox {
    width: 100%;
    height: 100%;
    background-image: url(../../assets/login-bg-2.jpg);
    background-size: cover;
    background-position: 50%;
    position: relative;
    display: flex;
    align-items: center;
  }

  .box-card {
    width: 400px;
    position: absolute;
    right: 150px;

    .bottom-btn {
      font-size: 14px;
      margin-top: 5px;
    }
  }
}


</style>

<style>
.dialog-border {
    border-radius: 10px;
}
</style>
