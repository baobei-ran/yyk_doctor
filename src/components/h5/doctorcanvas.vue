<template>
    <div id='canvas_box' class="dis_f flex_c" >
        <div class="image-box flex1" :class='{"flex":!canvasStatus }'>
        <div class='image' ref='imageBox' id='imgsss'>
        <div class='html_content' :class="{'canvasPic':canvasStatus }" ref='html_content' id='html'>
            <div class="canvas_head">
                <ul>
                    <li>处方编号：<span>{{ canvasdata.order_code }}</span></li>
                    <li>处方生成时间：<span>{{ canvasdata.creatime | filterTime }}</span></li>
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
                
                    <li>肝功能：<span v-text='canvasdata.liver != "" ?canvasdata.liver: "正常" '></span></li>
                    <li>肾功能：<span v-text='canvasdata.kidney != "" ?canvasdata.kidney: "正常" '></span></li>
                    <li>备孕情况：<span v-text='canvasdata.yun != "" ?canvasdata.yun: "无" '></span></li>
                
                    <li>过敏史：<span v-text='canvasdata.allergy != "" ?canvasdata.allergy: "无" '></span></li>
                    <li>过往病史：<span v-text='canvasdata.ago != "" ?canvasdata.ago: "无" '></span></li>
                </ul>
                <ul class="result">
                    <li><span>诊断结果：</span><span>{{ canvasdata.result }}聚餐啥的军电视剧点击SVN的方式均价的发v东方健康SVN京东方女的离开发v那地方发v框架的妇女大富科技女的反馈女地方地方考虑那地方考虑那地方</span></li>
                </ul>
            </div>
            <div class="canvas_drug">
                <p>Rp:</p>
                <ol v-for='(val,i) in durg' :key='i'>
                    <li> {{val.name}}<b v-show="val.gg">({{ val.gg }})</b><span>*{{ val.num }}</span></li>
                    <li>用法：<b>{{ val.usage }}</b></li>
                </ol>
                <div class="tshi" id='seal'>
                    <img ref='chapter' :src="$https.baseURL+canvasdata.zhang_pic" alt="">
                </div>
            </div>
            <div class="msg">
                （以下空白，手写无效）
            </div>
            <div class="check">
                <ul>
                    <li><span>处方医师：</span><img ref='doctorImg' :src="canvasdata.signpic?$https.baseURL+canvasdata.signpic:''" alt="" /></li>
                    <li v-if='canvasdata.yname_pic'><span>审核药师：</span><img ref='pharmacist' :src="$https.baseURL+canvasdata.yname_pic" alt=""/></li>
                </ul>
            </div>
        </div>
        </div>
        </div>
        <div class="btn">
            <button @click='handleClick'>保存处方</button>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
    data () {
        return {
            canvasStatus: true, 
            canvasdata: {},
            durg: [],
            ti: '',
            imgUrl: '',
        }
    },
    beforeCreate () {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
    },
    mounted () {
        var _this = this;
         _this.$https.post('/mobile/Doch5/recipe_look', {'id': this.$route.params.did }, function (res) {
            console.log(res.data)
            if (res.data.code == 1) {
                _this.canvasdata = res.data.data
                _this.durg = res.data.recipe_eat
                var ts = setTimeout(function () {
                    _this.canvasImg()
                    clearTimeout(ts)
                }, 300)  
            } else {

            }
        })
        
    
    },
  methods: {
       handleClick () {   // 调取 android 与 ios
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                android.downLoad(this.imgUrl)
            }
            if (isiOS) {
                window.webkit.messageHandlers.downLoad.postMessage(this.imgUrl);
            }
        },
        canvasImg () {
            var _this = this;
            var shareContent = document.getElementById('html');
            var width = shareContent.offsetWidth ; 
            var height = shareContent.offsetHeight; 
            var canvas = document.createElement("canvas"); 
            var scale = window.devicePixelRatio * 1;
            canvas.width = width * scale; 
            canvas.height = height * scale; 
            canvas.getContext("2d").scale(scale, scale);
            var opts = {
                background:null,
                scale: scale?scale:1,
                canvas: canvas, 
                logging: false, 
                width: width, 
                height: height,
            };
            html2canvas(shareContent, opts).then(function (canvas) {
                var urls = canvas.toDataURL('image/png');
                _this.imgUrl = urls
                shareContent.style['-webkit-transform'] = 'scale(0.5)'
                shareContent.style['-webkit-transform-origin-y'] = 'top'
                document.getElementById('canvas_box').style['background'] = '#000';
                var box = _this.$refs.imageBox;
                var h = window.getComputedStyle(shareContent).height;
                h = h.replace(/px/, '');
                box.style['height'] =  h / 2+'px';
                _this.$indicator.close();
                _this.canvasStatus = false
            });
        }
    },
    beforeDestroy () {
        this.$indicator.close();
    }
}
</script>
<style>
    .mint-indicator-mask {
        background: #000!important;
    }
</style>

<style lang="scss" scoped>

@function rem($px) {
    @return $px / 50 +rem;
}

.canvasPic {
    position: absolute;
    top: 0;
    left: -200%;
}


#canvas_box {
    width: 100%;
    height: 100%;
    color: #333;
    background: #fff;
    position: relative;
    .flex {
        display:-webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items:center;
        -webkit-align-items:center;
        box-align:center;
        -moz-box-align:center;
        -webkit-box-align:center;
        -webkit-box-pack: center;
        -moz-justify-content: center;
        -webkit-justify-content: center;
        justify-content: center;
    }
    .image-box {
        width: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .image {
        width: 100%;
    }
    .html_content {
        background: #fff;
        width: 200%;
        zoom: 1;
        font-size: 18px;
        padding: 20px;
        -webkit-transform-origin-x: 0;    /*定义元素被置于x轴的何处*/
        -webkit-transform: scale(1);   /*定义元素被缩放*/
        transform: scale(1);
        .canvas_head {
            width: 100%;
            >ul {
                            
                display: -webkit-box;      
                display: -moz-box;       
                display: -ms-flexbox;
                display: -webkit-box;
                display: flex;
                
                li {
                    width: 100%;
                    font-size: 13px;
                    line-height: 30px;
                    letter-spacing: 1px;
                }
            }
        }
        h2 {
            font-size: 20px;
            padding: 10px;
            text-align: center;
            letter-spacing:2px;
        }
        .canvas_user {
            width: 100%;
            border-bottom:1px dashed #ccc;
            padding: 10px 0;
           > ul { 
                display: -webkit-box;      
                display: -moz-box;       
                display: -ms-flexbox;
                display: -webkit-box;
                display: flex;
                -webkit-flex-wrap: wrap;
                -moz-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                -o-flex-wrap: wrap;
                flex-wrap: wrap;
                li {
                    width: 33%;
                    padding: rem(4) 0;
                    letter-spacing: 1.5px;
                    font-size: 15px;
                }
            }
            .result {
                li {
                    width: 100%;
                    span {
                        display: inline-block;
                        line-height: rem(24);
                    }
                    span:last-child {
                        width: 80%;
                        vertical-align: top;
                    }
                }
            }
        }
        .canvas_drug {
            width: 100%;
            padding: 20px 0;
            position: relative;
            >p {
                font-weight: 550;
                font-size: 14px;
            }
            >ol {
                margin-top: 10px;
                font-size: 14px;
                // float: left;
                li {
                    padding-left: 20px;
                    line-height: 24px;
                    letter-spacing: 1.5px;
                    span {
                        margin-left: 16px;
                    }
                }
            }
            .tshi {
                position: absolute;
                right: 30px;
                bottom: 10px;
                font-size: 12px;
                width: 100px;
                height: 100px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
        }
        .msg {
            text-align: center;
            font-size: 10px;
            line-height: 14px;
            letter-spacing: 3px;
        }
        .check {
            margin: 20px 0 10px;
            width: 100%;
            font-size: 15px;
            overflow: hidden;
           > ul {
                width: 100%;
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
                    align-items: center;
                    -webkit-align-items: center;
                    -moz-align-items: center;
                    -ms-align-items: center;
                    -o-align-items: center;
                    letter-spacing: rem(1);
                    margin-bottom: 10px;
                    > img {
                        max-width: 50px;
                        height: 30px;
                        display: block;
                        margin-left: 10px;
                    }
                }
            }
        }
        
    }
    .btn {
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: rem(40);
        left: 0;
        z-index: 1000;
        font-size: rem(16);
        > button {
            color: #fff;
            // background: rgba(255,255,255, .4);
            background-color: #999;
            padding: rem(5) rem(10);
            border-radius: rem(3);
        }
    }
}
</style>

