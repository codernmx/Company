<template>
	<div class="page">
		<div class="loginBox">
			<el-card class="box-card">
				<h3 class="center top">基本信息</h3>
				<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left" label-width="110px" class="top">
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="供方名称" prop="supName">
								<el-input v-model="ruleForm.supName"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="税号" prop="taxNum">
								<el-input v-model="ruleForm.taxNum"/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="昵称" prop="nickName">
								<el-input v-model="ruleForm.nickName"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机号" prop="phoneNum">
								<el-input v-model="ruleForm.phoneNum"/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="验证码" prop="yzCode">
								<div style="display: flex">
									<el-input v-model="ruleForm.yzCode" autocomplete="new-password" style="margin-right: 5px"/>
									<el-button type="primary" plain>{{ buttonName }}
									</el-button>
								</div>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input v-model="ruleForm.password" show-password type="password" autocomplete="new-password"/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="确认密码" prop="passwordCofirm">
								<el-input v-model="ruleForm.passwordCofirm" show-password type="password"/>
							</el-form-item>
						</el-col>
						<el-col :span="12"/>
					</el-row>
					<h3 class="center">其他信息</h3>
					<el-row :gutter="20" class="top">
						<el-col :span="12">
							<el-form-item label="重点业务" prop="keyBusiness">
								<el-select v-model="ruleForm.keyBusiness" multiple clearable class="dttInput" collapse-tags
									placeholder="请选择" style="width: 100%">
									<el-option v-for="item in keyBusinessOptions" :key="item.value" :label="item.fLabel"
										:value="item.value"/>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="新业务关注点">
								<el-select v-model="ruleForm.businessFocus" class="dttInput" collapse-tags clearable multiple
									placeholder="请选择" style="width: 100%">
									<el-option v-for="item in businessFocusOptions" :key="item.value" :label="item.fLabel" :value="item.value"/>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="部门职位" prop="departmentPosition">
								<el-input v-model="ruleForm.departmentPosition"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系人" prop="contact">
								<el-input v-model="ruleForm.contact"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系方式" prop="contactTell">
								<el-input v-model="ruleForm.contactTell"/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="center">
						<el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
					</el-row>
				</el-form>
				<div class="bottom-btn" @click="login">返回登录</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import {baseUrl} from '@/config/index'
import {
    login,
    sendMobileVerifyCode,
    compareVerifycode,
    resetpass,
    register,
    getSignTypeList,
    zcDelectFile,
} from "@/api/user";

export default {
    name: 'register',
    components: {},
    props: {},
    watch: {},
    data() {
        var validatePass = (rule, value, callback) => {
            if (value == "") {
                callback(new Error("请输入密码"));
            } else {
                const reg = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).{8,}/;
                if (reg.test(value)) {
                    if (this.ruleForm.passwordCofirm !== "") {
                        // this.$refs.ruleForm.validateField('checkPass');
                        callback();
                    }
                } else {
                    callback(new Error("密码必须为8位以上包含大小写字母、特殊字符"));
                }
            }
        };
        return {
            ruleForm: {},
            fileList: [],
            baseUrl,
            buttonName: "发送验证码",//按钮初始化文字
            rules: {
                supName: [
                    {required: true, message: "请输入供方名称", trigger: "change"},
                ],
                taxNum: [{required: true, message: "请输入税号", trigger: "change"}],
                nickName: [
                    {required: true, message: "请输入昵称", trigger: "change"},
                ],
                phoneNum: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {
                        pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                        message: "请输入正确的手机号码"
                    }
                ],
                yzCode: [
                    {required: true, message: "请输入验证码", trigger: "change"},
                ],
                billingInformation: [
                    {required: true, message: "请输入开票信息", trigger: "change"},
                ],
                keyBusiness: [
                    {required: true, message: "请选择重点业务", trigger: "blur"},
                ],
                serviceProviders: [
                    {required: true, message: "请选择公司", trigger: "change"},
                ],
                departmentPosition: [
                    {required: true, message: "请输入部门职位", trigger: "change"},
                ],
                contact: [
                    {required: true, message: "请输入联系人信息", trigger: "change"},
                ],
                contactTell: [
                    {required: true, message: "请输入联系方式", trigger: "change"},
                ],
                password: [
                    {validator: validatePass, required: true, trigger: "change"},
                ],
                passwordCofirm: [
                    {validator: validatePass, required: true, trigger: "change"},
                ],
            },
            keyBusinessOptions: [],
            businessFocusOptions: [],
        };
    },

    mounted() {

    },
    created() {

    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const password = this.$md5(this.ruleForm.password)
                    const passwordCofirm = this.$md5(this.ruleForm.passwordCofirm)
                    const param = {
                        param: this.ruleForm.phoneNum,
                        code: this.ruleForm.yzCode,
                    };
                    this.compareVerifycode(param, 0);
                    this.ruleForm.businessLicense = this.fileList.map((e) => e.id);

                    this.ruleForm.operationCertificate = [];
                    this.ruleForm.qualificationCertificate = [];

                    console.log(this.ruleForm, "submit");
                    setTimeout(() => {
                        this.register({
                            ...this.ruleForm,
                            password,
                            passwordCofirm,
                            serviceProviders: ''
                        });
                    }, 0);
                } else {
                    this.$message.error('请填写必填项~')
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        async register(param) {
            try {
                const res = await register(param);
                if (res.status == 0) {
                    this.$notify({
                        title: '提示信息',
                        type: 'success',
                        message: res.body,
                        duration: 0
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path: '/login'
                        })
                    }, 1000)
                } else {
                    this.$message.error(res.message);
                }
            } catch (error) {
                console.log(error);
            }
        },
        login() {
            this.$router.push({
                path: '/login'
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;

  .loginBox {
    width: 100%;
    height: 100%;
    background-image: url(../../assets/1127.jpg);
    background-size: cover;
    background-position: 50%;
    position: relative;
  }

  .box-card {
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 50%;
    //position: relative;
    margin-left: -500px;
    margin-top: -20%;

    .bottom-btn {
      font-size: 14px;
      margin-top: 5px;
    }
  }
}


</style>
