<template>
<!-- 患者处方 -->
    <div class="detail">
       <div class="box">
            <div class="section_head" >
                <div class="shou" v-if="datalist.drug_type == 2">
                    <div class="checks blues" v-show='datalist.status == 1'>
                        <img src="../../common/img/icon_shtg@2x.png" alt="" /> <span>处方已开具</span>
                    </div>
                    <div class="checks oranges" v-show='datalist.status == 2'>
                        <img src="../../common/img/icon_cfygq@2x.png" alt="" /> <span>处方已过期</span>
                    </div>
                </div>
                <div class="drugstore" v-if="datalist.drug_type == 1">
                    <div class="checks blues" v-show='datalist.drug_autdit == 0'>
                        <img src="../../common/img/icon_shtg@2x.png" alt="" /> <span>处方未审核</span>
                    </div>
                    <div class="checks blues" v-show='datalist.drug_autdit == 1'>
                        <img src="../../common/img/icon_shtg@2x.png" alt="" /> <span>药师审核通过</span>
                    </div>
                    <div class="checks oranges" v-show='datalist.drug_autdit == 2'>
                        <img src="../../common/img/icon_cfygq@2x.png" alt="" /> <span>药师审核未通过</span>
                    </div>
                </div>
            <div class="bg_f">
                <div class="canvas">
                    <div class='html_content' ref='html_content' id='htmls'>
                        <div class="canvas_head">
                            <ul>
                                <li>处方编号：<span>{{ canvasdata.number }}</span></li>
                                <li>处方生成时间：<span>{{ canvasdata.start_time | filterTime }}</span></li>
                                <li>处方有效时间：<span>{{ canvasdata.undue_time | filterTime }}</span></li>
                            </ul>
                        </div>
                        <h2>云医康互联网药店电子处方</h2>
                        <div class="canvas_user">
                            <ul>
                                <li>姓名：<span>{{ canvasdata.name }}</span></li>
                                <li>性别：
                                    <span v-show='canvasdata.sex == 1'>男</span>
                                    <span v-show='canvasdata.sex == 2'>女</span>
                                </li>
                                <li>年龄：<span>{{ canvasdata.age }}</span></li>
                            </ul>
                            <ul>
                                <li>肝功能：<span v-text='canvasdata.liver != "" ?canvasdata.liver: "正常" '></span></li>
                                <li>肾功能：<span v-text='canvasdata.kidney != "" ?canvasdata.kidney: "正常" '></span></li>
                                <li>备孕情况：<span v-text='canvasdata.yun != "" ?canvasdata.yun: "无" '></span></li>
                            </ul>
                            <ul>
                                <li>过敏史：<span v-text='canvasdata.allergy != "" ?canvasdata.allergy: "无" '></span></li>
                                <li>过往病史：<span v-text='canvasdata.ago != "" ?canvasdata.ago: "无" '></span></li>
                            </ul>
                            <ul>
                                <li style="width: 100%;">诊断结果：<span style="display:inline-block;width: 80%;">{{ canvasdata.result }}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <span @click='outImg'>查看完整处方</span>
            </div>
        <div class="detail_con" >        
            <ul>
                <li><span >开具医生：</span><span>{{ datalist.true_name }}</span></li>
                <li><span>处方单号：</span><span>{{ datalist.number }}</span></li>
                <li><span>开具时间：</span><span>{{ datalist.start_time | filterTime }}</span></li>
            </ul>
            <div class="msg">
                <div class="left"><span >患者信息：</span><span>{{ datalist.name }} <b>|</b> <i v-text='datalist.sex ==1? "男" : datalist.sex == 0 ? "女": ""' ></i> <b>|</b> {{ datalist.age }}</span></div>
                <div class="left"><span>患者主诉：</span><span>{{ datalist.opinion }}</span></div>
                <div class="left"><span>诊断结果：</span><span>{{ datalist.result }}</span></div>
                
            </div>
        </div>
        <div class="recipe" v-if="datalist.drug_type == 2">
            <h4>处方中的药品</h4>
            <ul>
                <li v-for='(val,i) in drop' :key='i'>
                    <div> <span>{{ val.name }} <i v-if='val.gg'>({{ val.gg }})</i> </span><b>x{{ val.num }}</b></div>
                    <p>用法用量：{{ val.usage }}</p>
                </li>
            </ul>
        </div>
        <div class="recipedrug" v-if="datalist.drug_type == 1">
            <h4>{{ datalist.hname }}</h4>
            <div class="druglist" v-for='(val,i) in drop' :key='i+"_2"'>
                <div class="dis_f">
                    <img :src="val.img?$https.baseURL+val.img:''" alt="" />
                    <dl class="flex1">
                        <dt class="dis_f dis_sb"><span>{{ val.name }}</span> <span>x{{val.num}}</span> <span>￥{{val.money}}</span></dt>
                        <dd>{{ val.company }}</dd>
                    </dl>
                </div>
                <p>用法用量：{{ val.usage }}</p>
            </div>
        </div>
        <ul class="drugAudit" v-if="datalist.drug_type == 1 && datalist.drug_autdit == 1">
            <li><span>审核药师</span><span>{{ datalist.yname }}</span></li>
            <li><span>审核时间</span><span>{{ datalist.drug_audit_time | filterTime }}</span></li>
            <li v-show="datalist.drug_audit_reason"><span>审核说明</span><span>{{ datalist.drug_audit_reason }}</span></li>
        </ul>
        </div>
       </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            datalist: {
                true_name: '',
                number: '',
                start_time: '',
                name: '',
                age: '',
                sex: '',
                result: '',
                opinion: '',
                status: ''
            },
            drop: [],
            imgUrl: '',
            userId: '',
            canvasdata: {},
            durg: [],
            ti: '',
            imgUrl: '',
        }
    },
    mounted () {
        var _this = this;
        this.userId = this.$route.params.did
        this.$https.post('/mobile/doch5/user_recipe_detail', {'id': this.$route.params.did }, function (res) {
            console.log(res.data)
            if (res.data.code == 1) {
                if (res.data) {
                    _this.datalist = res.data.data
                    _this.drop = res.data.drug
                    _this.canvasdata = res.data.data
                    _this.durg = res.data.drug
                }
            } else {
                _this.datalist = []
            }
        })

    },
   methods: {       
       outImg () {
           this.$router.push({ name: 'download', params: { 'id': this.userId }})
       }
   }
   
}
</script>
<style lang='scss' scoped>
@function rem($px) {
    @return $px / 100 + rem;
}
$color: #333;

.detail {
    width: 100%;
    height: 100%;
    color: $color;
    background-color: #F9F9F9;
    font-size: rem(16);
    color: #333;
    padding-bottom: rem(22);
    .box {
        width: 100%;
        .section_head {
            width: 100%;
            .checks {
                width: 100%;
                font-size: rem(32);
                font-weight:550;
                height: rem(88);
                padding: 0 rem(32);
                line-height: rem(88);
                > img {
                    width: rem(40);
                    height: rem(40);
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: rem(-5);
                    margin-right: rem(20);
                }
            }
            
        .oranges {
            background-color: #FFFDF2EE;
            color: #EC8158FF;
            span {
                color: #EC8158FF;
            }
        }
        
        .blues {
            background-color: #EDF3FE;
            color:#5189F6;
            span {
                color:#5189F6;
            }
        }
        
        .bg_f {
            background-color: #fff;
            padding: rem(30);
            height: rem(360);
            position: relative;
            >.canvas {
                width: 100%;
                height: 100%;
                overflow: hidden;
                border: 1px solid #999;
               
            }
            >span {
                position: absolute;
                bottom: rem(13+32);
                left: 50%;
                display: block;
                font-size: rem(24);
                width: rem(240);
                border-radius: rem(25);
                background: rgb(0,0,0);
                opacity: .5;
                color: #fff;
                text-align: center;
                padding: rem(10) rem(10) rem(12) rem(10);
                -webkit-transform: translateX(-50%); 
                -o-transform: translateX(-50%); 
                -ms-transform: translateX(-50%); 
                -moz-transform: translateX(-50%); 
                transform: translateX(-50%); 
            }
        }
       
        


        .detail_con {
            font-size: rem(26);
            margin-top: rem(22);
            
            .blue {
                border-left: 3px solid #5189F6;
            }
            ul {
                font-weight: 400;
                width: 100%;
                padding: rem(20) rem(10);
                background: #fff;
                li {
                    width: 100%;
                    padding:rem(15) 0;
                    display: -webkit-flex;
                    display: flex;
                    span:first-child {
                        color: #808080;
                        display: block;
                        width: 26%;
                        padding-left: rem(20);
                    }
                    span:last-child {
                        color: #333;
                    }
                }
            }
            
            .msg {
                width: 100%;
                background: #fff;
                margin-top: rem(20);
                > div {
                    padding: rem(15) rem(30);
                    overflow: hidden;
                    line-height:rem(44);
                    span:first-child {
                        color: #808080;
                        display: block;
                        float: left;
                        width: 26%;
                    }
                    span:last-child {
                        color: #333;
                        float: left;
                        b {
                            color: #E0E0E0;
                        }
                    }
                }
            }

        }
        .recipe {
                width: 100%;
                margin-top: rem(22);
                background: #fff;
                padding-top: rem(36);
                h4 {
                    line-height: rem(42);
                    padding:0 rem(30);
                    font-size: rem(27);
                    font-weight: 500;
                    padding-bottom: rem(20);
                    border-bottom: 1px solid #eee;
                }
                ul {
                    padding: 0 rem(30);
                    li {
                        padding: rem(30) 0;
                        border-bottom:1px solid #F0F2F6;
                        font-size: rem(25);
                        div {
                            line-height: rem(30);
                           span {
                               display: inline-block;
                               width: 90%;
                           }
                           b {
                               float: right;
                               color:#808080;
                           }
                        }
                        p {
                            font-size: rem(23);
                            margin-top: rem(18);
                            color: #808080;
                            line-height: rem(40);
                        }
                    }
                }
            }
            .recipedrug {
                margin-top: rem(15);
                background-color: #FFF;
                padding: rem(20);
                font-size: rem(26);
                >h4 {
                    padding-bottom: rem(20);
                }
                .druglist {
                    padding: rem(15);
                    border-bottom: 1px solid #F0F2F6;
                    > div {
                        
                        img {
                            width: rem(80);
                            height: rem(80);
                            display: block;
                        }
                        dl {
                            padding-left: rem(20);
                            margin: 0;
                            dt {
                                span:nth-child(2) {
                                    color: #808080;
                                    margin-top: rem(3);
                                }
                            }
                            dd {
                               margin-top: rem(8);
                               font-size: rem(23);
                               color: #808080;
                            }
                        }
                    }
                    > p {
                        font-size: rem(23);
                        margin-top: rem(10);
                        color: #808080;
                        line-height: rem(40);
                    }
                }
            }
            .drugAudit {
                margin-top: rem(20);
                padding: rem(20);
                background-color: #FFF;
                font-size: rem(26);
                li {
                    line-height: rem(50);
                    span:first-child {
                        color: #808080;
                        margin-right: rem(42);
                    }
                    
                }
            }
        .dl {
            width: 100%;
            margin-top: rem(22);
            background: #fff;
            padding: rem(20) 0 rem(40);
            dt {
                border-left: 3px solid #5189F6;
                display:-webkit-box;
                display:-webkit-flex; 
                display:-moz-box; 
                display:-ms-flexbox; 
                display:flex;
                margin: rem(20) 0;
                padding-left: rem(23);
                span:first-child {
                        color: #808080;
                        display: block;
                        width: 30%;
                    }
                    span:last-child {
                        color: #333;
                    }
            }
            dd {
                display:-webkit-box;
                display:-webkit-flex; 
                display:-moz-box; 
                display:-ms-flexbox; 
                display:flex;
                margin-top: rem(40);
                margin-left: 0;
                padding: 0 rem(23);
                span:first-child {
                        color: #808080;
                        display: block;
                        width: 30%;
                    }
                    span:last-child {
                        color: #333;
                    }
            }
        }
       
    }   
    }
    

    .canvas {
        width: 100%;
        .html_content {
        width: 200%;
        height: 100%;
        overflow: hidden;
        font-size: rem(24);
        padding: rem(13) rem(30);
        zoom: 1;
        -webkit-transform-origin-x: 0;    /*定义元素被置于x轴的何处*/
        -webkit-transform: scale(0.5, 0.8);   /*定义元素被缩放*/
        .canvas_head {
            width: 100%;
            >ul {
                            
                display: -webkit-box;      
                display: -moz-box;       
                display: -ms-flexbox;
                display: -webkit-box;
                display: flex;
                li {
                    width: 33%;
                    font-size: rem(20);
                    letter-spacing: rem(1);
                }
            }
        }
        h2 {
            font-size: rem(28);
            padding: rem(15);
            text-align: center;
            font-weight: 800;
            letter-spacing: rem(5);
        }
        .canvas_user {
            width: 100%;
            border-bottom:1px dashed #ccc;
            padding: rem(10) 0;
            ul {
                           
                display: -webkit-box;      
                display: -moz-box;       
                display: -ms-flexbox;
                display: -webkit-box;
                display: flex;
                font-size: rem(24);
                li {
                    width: 33%;
                    padding: rem(4) 0;
                    letter-spacing: rem(3);
                }
            }
        }
    }
    }
}

</style>
