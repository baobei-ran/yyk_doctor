<template>
    <div class="detail">
        
       <div class="box">
            <div class="section"  id='html'>
                <div class="checks " v-show='datalist.flag == 0'>
                    <img src="../../common/img/icon_wsh@2x.png" /> <span>未审核</span>
                </div>
                <div class="checks" v-show='datalist.flag == 1'>
                    <img src="../../common/img/icon_shtg@2x.png" alt="" /> <span>审核通过</span>
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
                                        <ul>
                                            <li>诊断结果：<span>{{ canvasdata.result }}</span></li>
                                        </ul>
                                    </div>
                                    <div class="canvas_drug">
                                        <p>Rp:</p>
                                        <ol v-for='(val,i) in durg' :key='i'>
                                            <li>{{ val.company }} {{val.name}} <span>*{{ val.num }}</span></li>
                                            <li>用法：<b>{{ val.usage }}</b></li>
                                        </ol>
                                        <div class="tshi">
                                            <img :src="$https.baseURL+canvasdata.seal" alt="">
                                        </div>
                                    </div>
                                    <div class="msg">
                                        （以下空白，手写无效）
                                    </div>
                                    <div class="check">
                                        <ul>
                                            <li><span>处方医师：</span><img ref='doctorImg' :src="$https.baseURL+canvasdata.signpic" alt=""></li>
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
                <div class="left"><span>患者手机：</span><span>{{ datalist.result }}</span></div>
                <div class="left"><span>诊断结果：</span><span>{{ datalist.result }}</span></div>
                <div class="left"><span>处理意见：</span><span>{{ datalist.opinion }}</span></div>
            </div>
        </div>
        <div class="recipe">
            <h4>处方中的药品</h4>
            <ul>
                <li v-for='(val,i) in drop' :key='i'>
                    <div> 
                        <img src="../../common/img/img_dtzs.png" alt="" />
                        <dl>
                            <dt><span>{{ val.name }}</span><b>￥{{ val.num }}</b></dt>
                            <dd><span>{{ val.name }}</span><b>x{{ val.num }}</b></dd>
                        </dl>
                    </div>
                    <p>用法用量：{{ val.usage }}</p>
                </li>
            </ul>
        </div>

        
            
        <dl class="dl" v-show='datalist.flag == 1 || datalist.flag == 3'>
            <dt>
                <span>审核药师：</span><img :src="$https.baseURL+datalist.yname_pic" alt="">
            </dt>
            <dd>
                <span>审核时间：</span><span>{{ datalist.flag_time | filterTime }}</span>
            </dd>
            <dd>
                <span>审核说明：</span><span>{{ datalist.flag_time | filterTime }}</span>
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
                    _this.datalist = res.data.data
                    _this.drop = res.data.recipe_eat
                }
            } else {
                _this.datalist = []
                _this.drop = []
            }
        })

        _this.$https.post('/mobile/Doch5/recipe_look',  {'id': this.$route.params.did }, function (res) {
            // console.log(res.data)
            if (res.data.code == 1) {
                _this.canvasdata = res.data.data
                _this.durg = res.data.recipe_eat
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
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    background-color: #F9F9F9;
    font-size: rem(16);
    color: #333;
    padding-bottom: rem(22);
    
    .box {
        width: 100%;
        -prefix-box-flex: 1; 
        -webkit-box-flex: 1; 
        -webkit-flex: 1; 
        -moz-box-flex: 1; 
        -ms-flex: 1; 
        flex: 1; 
        overflow: auto;
        .section {
        width: 100%;
        > .checks {
            height: rem(88);
            line-height: rem(88);
            padding:0 rem(32);
            background-color: #EDF3FE;
            font-size: rem(32);
            color:#5189F6;
            > img {
                width: rem(40);
                height: rem(40);
                display: inline-block;
                margin-right: rem(22);
                vertical-align: middle;
            }
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
                font-size: rem(20);
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
            padding: rem(20) 0 rem(40);
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
                    // border-left: 3px solid #5189F6;
                    padding-left: rem(23);
                    color: #808080;
                    display: block;
                    width: 26%;
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
                margin-top: rem(40);
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
        .html_content {
        width: 200%;
        height: 100%;
        overflow: hidden;
        font-size: rem(14);
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
                    font-size: rem(8);
                    letter-spacing: rem(1);
                }
            }
        }
        h2 {
            font-size: rem(18);
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
                font-size: rem(8);
                li {
                    width: 33%;
                    height: rem(30);
                    line-height: rem(30);
                    letter-spacing: rem(1.5);
                }
            }
        }
        .canvas_drug {
            width: 100%;
            padding: rem(20) 0;
            position: relative;
            >p {
                font-weight: 550;
                font-size: rem(12);
            }
            >ol {
                margin-top: rem(20);
                font-size: rem(7);
                li {
                    line-height: rem(30);
                    span {
                        margin-left: rem(14);
                    }
                }
            }
            .tshi {
                position: absolute;
                right: rem(30);
                bottom: rem(10);
                font-size: rem(5);
                img {
                    width: rem(100);
                    height: rem(100);
                    border-radius: 50%;
                }
            }
        }
        .msg {
            text-align: center;
            font-size: rem(7);
            line-height: rem(14);
            padding-bottom: rem(30);
        }
        .check {
            margin-top: rem(30);
            width: 100%;
            font-size: rem(8);
            overflow: hidden;
           > ul {
                           
                display: -webkit-box;      
                display: -moz-box;       
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                li {
                    width: 50%;
                                
                    display: -webkit-box;      
                    display: -moz-box;       
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;
                    > img {
                        max-width: rem(40);
                        height: rem(25);
                        display: block;
                    }
                }
            }
        }
        
    }
    }
    
    
}

</style>
