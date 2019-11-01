<template>
    <div class="doc-reg">
         <div class="root-content">
            <div class="doc-msg">
                <h2>
                    <b id='docname' ref='docName'>{{name}}医生</b>
                    <span :style='{ width: is_w }'></span>
                </h2>
            </div>
            <div class="doc-register">
                <form>
                    <div class="doc-pic"><img src="../../common/img/bg_ys@2x.png" alt="" /></div>
                    <h3><img src="../../common/img/bg_ys3.png" alt=""/> <span>注册手机号</span></h3>
                    <ul>
                        <li>
                            <span>手机号</span>
                            <input v-model='docPhone' type="text" id="" />
                        </li>
                        <li>
                            <span>验证码</span>
                            <input v-model='docCode' type="number" id="" />
                            <b :class="{'color-gray': is_code }" @click='handleClickCode'>{{ codeName }}</b>
                        </li>
                    </ul>
                    <div class="btn">
                        <button @click.prevent='handleSbumit' :disabled='disabled'></button>
                        <p>注册即代表你同意<span @click='$router.push("/Agreement")'>《云医康注册使用协议》</span></p>
                    </div>
                </form>
            </div>
            <div class="doc-footer">
                <ul>
                    <li>1、注册手机号</li>
                    <li>2、下载“云医康医生版” APP</li>
                    <li>3、进入"云医康医生版"APP 填写认证资料，平台将在3个工作日内完成审核</li>
                </ul>
            </div>
       </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            docPhone: '',
            docCode: '',
            is_w: '2rem',
            codeName: '获取验证码',
            flag: false,
            did: this.$route.params.did,
            type: this.$route.params.type || 1,
            disabled: false,
            name: '',
            is_code: false,
        }
    },
    mounted () {
        var vm = this;
        this.$https.post('/mobile/doch5/doctor_data', { did: this.did }, function (res) {
            // console.log(res)
            if (res.data.code == 200) {
                vm.name = res.data.data.name;
                vm.$nextTick(() => {
                    var dom = vm.$refs.docName;
                    vm.is_w = dom.offsetWidth + 'px';
                })  
            }
        })
        this.$nextTick(() => {
            var dom = vm.$refs.docName;
            this.is_w = dom.offsetWidth + 'px';
        })  
    },
    methods: {
        handleSbumit: function (e) {
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
            if (!isMobile) {
                this.$toast('请在手机端打开本页面，然后进行注册')
                return;
            }
            var self = this;
            var isphone = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号验证
            if (!isphone.test($.trim(self.docPhone))) {
                this.$toast('请输入正确手机号')
                return;
            }
            if (!self.docCode) {
                this.$toast('请输入验证号')
                return;
            }
            this.disabled = true;
            var obj = { phone: self.docPhone, code: self.docCode, did: self.did, type: self.type };
            console.log(obj)
            self.$https.post('/mobile/doch5/register', obj, function (res) {
                console.log(res)
                var ts = setTimeout(() => {
                    self.disabled = false;
                    clearTimeout(ts)
                }, 200)
                if (res.data.code == 200) {
                    self.$toast('注册成功！')
                    setTimeout(() => {
                        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                            var tis = setTimeout(() => {
                                window.location.href = 'https://apps.apple.com/cn/app/%E4%BA%91%E5%8C%BB%E5%BA%B7%E5%8C%BB%E7%94%9F%E7%89%88/id1439312511';
                                clearTimeout(tis)
                            }, 100);
                        } else if (/(Android)/i.test(navigator.userAgent)) {
                            window.location.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.yyk.doctorend'
                        } else {
                            self.$toast('请在手机端打开本页面')
                        }
                    }, 500)
                } else {
                    self.$toast(res.data.msg)
                }
            })
        },
        handleClickCode: function () {
            var self = this;
            var isphone = /^1(3|4|5|6|7|8|9)\d{9}$/;//手机号验证
            if (self.flag) {
                return;
            }
            if (!isphone.test($.trim(self.docPhone))) {
                this.$toast('请输入正确手机号')
                return;
            }
            self.flag = true;
            self.$https.post('/shv2/Alidayu/sendSMS', { telphone: self.docPhone }, function (res) {
                console.log(res)
                if (res.data.code == 1) {
                    var num = 60;
                    var t = setInterval(function () {
                        if (num <= 0) {
                            self.codeName = '重新获取';
                            self.flag = false;
                            self.is_code = false
                            clearInterval(t)
                            return;
                        }
                        self.flag = true;
                        self.is_code = true;
                        num --;
                        if (num < 10) {
                            num = '0'+num
                        }
                        self.codeName = num+'后重获'
                    }, 1000)
                } else {
                    self.flag = false;
                    self.$toast('获取验证码失败')
                }
            })
        }
            
    }
}
</script>
<style lang="scss" scoped>
input[type=number] {  
    -moz-appearance:textfield;  
}  
input[type=number]::-webkit-inner-spin-button,  
input[type=number]::-webkit-outer-spin-button {  
    -webkit-appearance: none;  
    margin: 0;  
}  
.doc-reg {
    width: 100%;
    font-size: 0.28rem;
    min-height: 821px;
    color: #333;
    padding: 0.6rem 0.4rem 1rem;
    background: url('../../common/img/bg-doc.jpg') no-repeat;
    background-size: 100% 100%;
    .root-content {
            width: 100%;
        }
        .root-content .doc-msg {
            margin-top: 0.4rem;
        }
        .root-content .doc-msg h2 {
            color: #FFF;
            font-size: 0.4rem;
            font-weight:600;
            padding-left: 0.2rem;
        }
        .root-content .doc-msg h2 span{
            display: block;
            width: 1rem;
            height: 0.2rem;
            background: #F5CC70;
            margin-top: -0.2rem;
        }
        
        .root-content .doc-register {
            width: 100%;
            margin-top: 4.6rem;
        }
        .root-content .doc-register form {
            background: #fff;
            box-shadow:3px 16px 26px 0px rgba(85,140,247,0.2);
            border-radius: 0.3rem;
            padding: 0.4rem;
            position: relative;
        }
        .root-content .doc-register form .doc-pic {
            position: absolute;
            right: -0.32rem;
            top: -3.5rem;
            width: 60%;
        }
        .root-content .doc-register form .doc-pic img {
            width: 100%;
        }
        .root-content .doc-register form h3 {
            width: 100%;
            text-align: center;
            color: #333;
            font-size: 0.32rem;
            font-weight:600;
        }
        .root-content .doc-register form h3 img {
            display: inline-block;
            width: 0.8rem;
            height: 0.8rem;
            vertical-align: middle;
            margin-right: 0.15rem;
        }
        .root-content .doc-register form ul {
            width: 100%;
            margin-top: 0.51rem;
        }
        .root-content .doc-register form ul li {
            width: 100%;
            margin-top: 0.4rem;
        }
        .root-content .doc-register form ul li span{
            display: inline-block;
            width: 0.88rem;
            margin-right: 0.15rem;
        }  
        .root-content .doc-register form ul li input {
            display: inline-block;
            height: 0.82rem;
            -webkit-border-radius: 0.1rem;
            border-radius: 0.1rem;
            border: 1px solid #DDDDDD;
            padding: 0.1rem;
            width: 80%;
            outline: none;
            line-height: 0.5rem;
            -webkit-appearance: none;
        }   
        .root-content .doc-register form ul li:last-child input {
            width: 50%;
        }
        .root-content .doc-register form ul li:last-child b {
            display: inline-block;
            font-size: 0.28rem;
            font-weight: 500;
            color: #5189F6;
            margin-left: 0.28rem;
        }
        .root-content .doc-register form ul li:last-child .color-gray {
            color: #808080;
        }
        .root-content .doc-register form .btn {
            width: 100%;
            margin-top: 0.4rem;
            text-align: center;
        }
        .root-content .doc-register form .btn button {
            width: 88%;
            height: 1rem;
            border: 0;
            background: url('../../common/img/bg_btn.png') no-repeat;
            background-size: 100% 100%;
        }
        .root-content .doc-register form .btn p {
            margin-top: 0.2rem;
            font-size: 0.24rem;
            color: #333333;
        }
        .root-content .doc-register form .btn p span {
            color: #5189F6;
        }
        .root-content .doc-footer {
            width: 100%;
            padding-top: 0.3rem;
            padding-bottom: 0.3rem;
        }
        .root-content .doc-footer ul li {
            font-size: 0.26rem;
            color: #3D4886;
            margin-top: 0.3rem;
            line-height: 0.4rem;
        }
}
</style>