<template>
<!-- 药店处方 -->
    <div class="detail">
       <div class="box">
            <div class="section"  id='html'>
                <div class="checks blue" v-show='datalist.flag == 0'>
                    <img src="../../common/img/icon_wsh@2x.png" /> <span>处方未审核</span>
                </div>
                <div class="checks blue" v-show='datalist.flag == 1'>
                    <img src="../../common/img/icon_shtg@2x.png" alt="" /> <span>药师审核通过</span>
                </div>
                <div class="checks oringes" v-show='datalist.flag == 2'>
                   <img src="../../common/img/icon_shwtg@2x.png" alt="" /> <span>药师审核未通过</span>
                </div>
                <div class="checks oringes" v-show='datalist.flag == 3'>
                    <img src="../../common/img/icon_cfygq@2x.png" alt="" /> <span>处方已过期</span>
                </div>
            <div class="bg_f">
                <div class="canvas">
                    <div class='html_content' ref='html_content' id='htmls'>
                            <div class="canvas_head">
                                <ul>
                                    <li>处方编号：<span>{{ canvasdata.order_code }}</span></li>
                                    <li>处方生成时间：<span>{{ canvasdata.start_time | filterTime }}</span></li>
                                    <li>处方有效时间：<span>{{ canvasdata.undue_time | filterTime }}</span></li>
                                </ul>
                            </div>
                            <h2>云医康互联网药店电子处方</h2>
                            <div class="canvas_user">
                                <ul>
                                    <li>姓名：<span>{{ canvasdata.name }}</span></li>
                                    <li>性别：
                                        <span v-show='canvasdata.sex == 0'>男</span>
                                        <span v-show='canvasdata.sex == 1'>女</span>
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
                                <ul class="result">
                                    <li><span>诊断结果：</span><span>{{ canvasdata.result }}</span></li>
                                </ul>
                            </div>
                    </div>
                </div>
                <span @click='outImg'>查看完整处方</span>
            </div>

        <div class="detail_con" >        
            <ul>
                <li><span>处方单号：</span><span>{{ datalist.number }}</span></li>
                <li><span>开具时间：</span><span>{{ datalist.creatime | filterTime }}</span></li>
                <li><span>开具医生：</span><span>{{ datalist.true_name }}</span></li>
            </ul>
            <div class="msg">
                <div><span >患者信息：</span><span>{{ datalist.name }} <b>|</b> <i v-text='datalist.sex ==0? "男" : "女"' ></i> <b>|</b> {{ datalist.age }}</span></div>
                <div class="left"><span>患者手机：</span><span>{{ datalist.phone }}</span></div>
                <div class="left"><span>患者主诉：</span><span>{{ datalist.disease }}</span></div>
                <div class="left"><span>诊断结果：</span><span v-html="datalist.result"></span></div>
                <div class="left"><span>处理意见：</span><span v-html="datalist.opinion"></span></div>
            </div>
        </div>
        <div class="recipe">
            <h4>{{ datalist.hospital_name }}</h4>
            <ul>
                <li v-for='(val,i) in drop' :key='i+"_1"'>
                    <div> 
                        <img :src="val.pic?$https.baseURL+val.pic:''" alt="" />
                        <dl>
                            <dt><span>{{ val.name }}<span v-show="val.gg">({{val.gg}})</span></span><b v-show="val.money > 0">￥{{ val.money }}</b></dt>
                            <dd><span>{{ val.cname }}</span><b>x{{ val.num }}</b></dd>
                        </dl>
                    </div>
                    <p>用法用量：{{ val.usage }}</p>
                </li>
            </ul>
        </div>        
        <!-- 审核药师字段 -->
        <dl class="dl" v-if='datalist.flag > 0'>
            <dt>
                <span>审核药师：</span>
                <!-- <img :src="$https.baseURL+datalist.yname_pic" alt=""> -->
                <span>{{ datalist.yname }}</span>
            </dt>
            <dd>
                <span>审核时间：</span><span>{{ datalist.flag_time | filterTime }}</span>
            </dd>
            <dd v-show="datalist.flag_text">
                <span>审核说明：</span><span>{{ datalist.flag_text }}</span>
            </dd>
        </dl>
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
        this.$https.post('/mobile/Doch5/recipe_look', {'id': this.$route.params.did }, function (res) {
            console.log(res.data)
            if (res.data.code == 1) {
                if (res.data) {
                    _this.datalist = res.data.data;
                    _this.datalist.result = _this.datalist.result.replace(/--/g, '<br />')
                    _this.datalist.opinion = _this.datalist.opinion.replace(/--/g, '<br />')
                    _this.drop = res.data.recipe_eat;
                    _this.canvasdata = res.data.data
                    _this.durg = res.data.recipe_eat
                }
            } else {
                _this.datalist = []
                _this.drop = []
            }
        })
    },
   methods: {       
       outImg () {
           this.$router.push({ name: 'doctordownload', params: { 'id': this.userId }})
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
    font-size: rem(24);
    color: #333;
    padding-bottom: rem(22);
    .box {
        width: 100%;
    .section {
        width: 100%;
        .checks {
            height: rem(88);
            line-height: rem(88);
            padding:0 rem(32);
            font-size: rem(32);
            > img {
                width: rem(40);
                height: rem(40);
                display: inline-block;
                margin-right: rem(22);
                vertical-align: middle;
            }
        }
        .blue {
            background-color: #EDF3FE;
            color:#5189F6;
        }
        .oringes {
            background-color: #FFFDF2EE;
            color: #EC8158FF;
        }
        .bg_f {
            background-color: #fff;
            padding: rem(32) rem(30);
            height: rem(360);
            position: relative;
            >.canvas {
                width: 100%;
                height: 100%;
                overflow: hidden;
                border: 1px solid #999;
                background-color: #fff;
            }
            >span {
                position: absolute;
                bottom: rem(13+32);
                left: 50%;
                display: block;
                width: rem(240);
                font-size: rem(22);
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
            font-size: rem(28);
            .blue {
                border-left: 3px solid #5189F6;
            }
            ul {
                font-weight: 400;
                width: 100%;
                padding: rem(20) rem(10);
                margin-top: rem(22);
                background: #fff;
                li {
                    width: 100%;
                    padding:rem(20) 0;
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
                padding: rem(10) 0;
                margin-top: rem(22);
                background: #fff;
                > div {
                    padding: rem(10);
                    overflow: hidden;
                    line-height:rem(44);
                    
                     span:first-child {
                        color: #808080;
                        display: block;
                        float: left;
                        padding-left: rem(20);
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
                .left {
                    padding: rem(10) rem(30);
                    overflow: hidden;
                    line-height:rem(44);
                    > span:first-child {
                        padding-left:0;
                        width: 25%;
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
                    font-size: rem(26);
                    color: #333;
                    // border-left: 3px solid #5189F6;
                }
                ul {
                    width:100%;
                    li {
                        padding: rem(42) rem(30);
                        font-size: rem(28);
                        border-bottom:1px solid #F0F2F6;
                        > div {
                            width:100%;
                            overflow: hidden;
                           img {
                               width: rem(100);
                               height: rem(100);
                               display: block;
                               float: left;
                               
                           }
                           > dl {
                               width: 80%;
                               float: right;
                               margin: 0;
                               vertical-align: top;
                               padding-right: rem(23);
                               dt {
                                   b {
                                        float: right;
                                        color:#808080;
                                    }
                               }
                               dd {
                                   margin: 0;
                                   margin-top:rem(18);
                                   font-size: rem(22);
                                   color:#808080;
                                   b {
                                        float: right;
                                        color:#808080;
                                    }
                               }
                           }
                           
                        }
                        p {font-size: rem(24);
                            margin-top: rem(20);
                            color: #808080;
                        }
                    }
                }
            }

        
        
        .dl {
            width: 100%;
            margin-top: rem(22);
            background: #fff;
            padding: rem(30) 0 rem(40);
            dt {
                display:-webkit-box;
                display:-webkit-flex; 
                display:-moz-box; 
                display:-ms-flexbox;
                display:flex;
                box-align:center;
                -webkit-align-items:center;
                -moz-box-align:center;
                -webkit-box-align:center;
                align-items:center;
                font-size: rem(28);
                span {
                    padding-left: rem(23);
                    color: #808080;
                    display: block;
                    width: 26%;
                }
                span:last-child {
                    padding-left: 0;
                    color: #333;
                }
                img {
                    margin-left: rem(10);
                    width: 50px;
                    height: 40px;
                    display: block;
                }
            
            }
            dd {
                display:-webkit-box;
                display:-webkit-flex; 
                display:-moz-box; 
                display:-ms-flexbox; 
                display:flex;
                margin-top: rem(20);
                margin-left: 0;
                padding: 0 rem(23);
                font-size: rem(28);
                span:first-child {
                        color: #808080;
                        display: block;
                        width: 26%;
                        
                    }
                    span:last-child {
                        color: #333;
                        display: block;
                        width: 60%;
                    }
            }
        }
      }   
    }
    

    .canvas {
        width: 100%;
        background: rgba(0,0,0, .1);
        font-size: 15px;
        .html_content {
        width: 200%;
        height: 100%;
        overflow: hidden;
        font-size: rem(16);
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
            padding: rem(20);
            text-align: center;
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
                font-size: rem(20);
                li {
                    width: 33%;
                    padding: rem(4) 0;
                    letter-spacing: rem(1.5);
                }
            }
            .result {
                li {
                    width: 100%;
                    span {
                        display: inline-block;
                        line-height: rem(30);
                    }
                    span:last-child {
                        width: 80%;
                        vertical-align: top;
                    }
                }
            }
        }
      }
    }
}

</style>
