<template>
    <div class="appbox">
        <div class="doc-msg">
            <ul>
                <li>
                    <img src="../../common/img/bg-left.png" alt="" />
                    <span>我是{{ docInfo.true_name }}医生</span>
                    <img src="../../common/img/bg-right.png" alt="" />
                </li>
            </ul>
           <div class="rwm-box">
                <div class="rwm">
                    <div class="doc-infos">
                        <div class="doc-pic"><img :src="docInfo.picture?$https.baseURL+docInfo.picture:''" alt="" /></div>
                        <p>
                            <span>{{ docInfo.true_name }}</span>
                            <span>{{ docInfo.hospital_name }}</span>
                        </p>
                    </div>
                    <img class="pic" :src="$https.baseURL+docInfo.w_pic" alt="" />
                </div>
                <div class="user-mp-msg" v-if='is_emp'>
                    该医生不存在
                </div>
           </div>
            <div class="user-msg">
                <ul v-if='flag == 2'>
                    <li>
                        <h2>1、长按二维码</h2>
                        <p>长按二维码保存到手机相册</p>
                    </li>
                    <li>
                        <h2>2、打开微信，扫一扫</h2>
                        <p>打开扫一扫 — 右上角从相册选取二维码 — 选择保存二维码</p>
                    </li>
                    <li>
                        <h2>3、关注公众号，并完成身份认证</h2>
                        <p>关注公众号，根据指引注册手机号，认证身份证号即可与{{ docInfo.true_name }}医生在线咨询</p>
                    </li>
                </ul>
                <ul v-if='flag == 1'>
                    <li>
                        <h2>1、长按或扫描上方二维码</h2>
                        <p>长按二维码，前往“全景云医康”公众号</p>
                    </li>
                    <li>
                        <h2>2、关注公众号，并完成身份认证</h2>
                        <p>关注公众号，根据指引注册手机号、认证身份证号； 即可与{{docInfo.true_name}}医生在线咨询</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            docInfo: {},
            did: this.$route.params.did,
            flag: this.$route.params.flag,
            is_emp: false,
        }
    },
    mounted () {
        var self = this;
        if (!this.did || this.did == 0) {
            this.is_emp = true
            return;
        }
        this.is_emp = false
        self.$https.post('/mobile/doch5/doc_wechat', { did: this.did, flag: this.flag }, function (res) {
            console.log(res)
            if (res.data.code == 200) {
                self.docInfo = res.data.data
            } else {
                alert(res.data.msg)
            }
        })
    }
}
</script>
<style lang="scss" scoped>
p, span, h2 {
    -webkit-touch-callout:none; 
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none; 
    user-select:none;
}
.appbox {
    width: 100%;
    font-size: 0.28rem;
    min-height: 821px;
    color: #333;
    background: url('../../common/img/bg-ewm.jpg') no-repeat;
    background-size: 100% 100%;
    .doc-msg {
            width: 100%;
            padding: 0.3rem 0 0.6rem;
        }
        .doc-msg > ul {
            margin-top: 0.5rem;
        }
        .doc-msg > ul li {
            min-height: 0.8rem;
            line-height: 0.6rem;
            font-size: 0.5rem;
            text-align: center;
            color: #fff;
            padding-bottom: 0.2rem;
        }
        .doc-msg > ul li img{
            width: 0.6rem;
            height: 0.04rem;
            display: inline-block;
            vertical-align: 0.15rem;
        }
        .doc-msg > ul li span{
            margin: 0 0.1rem;
        }
        .doc-msg > .rwm-box {
            margin-top: 4.2rem;
            width: 100%;
            padding: 0 0.4rem;
            position: relative;
        }
        .doc-msg > .rwm-box .user-mp-msg {
            position: absolute;
            top: 60%;
            left: 36%;
            font-size: 0.34rem;
        }
        .doc-msg > .rwm-box .rwm {
            width: 100%;
            padding: 0.6rem 0.4rem 0.5rem;
            background: url('../../common/img/bg-con.png') no-repeat;
            background-size: 100% 100%;
            
        }
        
        .doc-msg > .rwm-box .rwm .doc-infos {
            width: 100%;
            padding-left: 0.15rem;
            overflow: hidden;
        }
        .doc-msg > .rwm-box .rwm .doc-infos .doc-pic {
            float: left;
            width: 1.32rem;
            height: 1.32rem;
            -webkit-border-radius: 100%;
            border-radius: 100%;
            vertical-align: middle;
            border: 1px solid #eee;
            margin-right: 0.1rem;
        }
        .doc-msg >.rwm-box .rwm .doc-infos .doc-pic img {
            display: block;
            width: 100%;
            height: 100%;
            -webkit-border-radius: 100%;
            border-radius: 100%;
        }
        .doc-msg >.rwm-box .rwm .doc-infos > p{
            float: left;
            width: 70%;
            vertical-align: middle;
        }
        .doc-msg >.rwm-box .rwm .doc-infos > p span{
            display: block;
            color: #333;
            font-size: 0.3rem;
            width: 100%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .doc-msg >.rwm-box .rwm .doc-infos > p span:first-child{
            font-size: 0.36rem;
            font-weight:600;
            margin-bottom: 0.3rem;
        }      
        .doc-msg >.rwm-box .rwm .pic {
            display: block;
            width: 3rem;
            height: 3rem;
            margin: 0.2rem auto 0;
        }
        .doc-msg > .user-msg {
            width: 100%;
            padding: 0 0.5rem;
            min-height: 4.4rem;
            color: #FFF;
        }
        .doc-msg > .user-msg>ul li {
            padding-top: 0.28rem;
            font-size: 0.28rem;
        }
        .doc-msg > .user-msg>ul li > h2 {
            font-size: 0.28rem;
        }
        .doc-msg > .user-msg>ul li > p {
            color: #FFF;
            font-size: 0.24rem;
            margin-top: 0.1rem;
            padding-left: 0.4rem;
            line-height: 0.4rem;
        }
}
</style>