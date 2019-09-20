<template>
    <div id='canvas_box' class="dis_f flex_c">
        <div class="image-box flex1">
        <div class="image" ref='imageBox' id='imgsss' :class="{'flex':!isPos}">
        <div class='html_content' :class="{'pos_abs': isPos}" ref='html_content' id='html'>
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
                <ul class="result">
                    <li><span>诊断结果：</span><span>{{ canvasdata.result }}</span></li>
                </ul>
            </div>
            <div class="canvas_drug">
                <p>Rp:</p>
                <ol v-for='(val,i) in durg' :key='i'>
                    <li>{{val.name}}<b v-show="val.gg">({{ val.gg }})</b> <span>*{{ val.num }}</span></li>
                    <li>用法：<b>{{ val.usage }}</b></li>
                </ol>
                <div class="tshi" id='seal'>
                    <img ref='chapter' src="" alt="">
                </div>
            </div>
            <div class="msg">
                （以下空白，手写无效）
            </div>
            <div class="check">
                <ul>
                    <li><span>处方医师：</span><img ref='doctorImg' src="" alt=""></li>
                    <!-- <li><span>审核药师：</span><img src="" alt=""></li> -->
                </ul>
            </div>
        </div>
        </div>
</div>
        <div class="btn">
            <button @click='handleClick'>下载处方</button>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
    data () {
        return {
            canvasdata: {},
            durg: [],
            ti: '',
            imgUrl: '',
            isImg: true,
            isPos: true,
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
    _this.$https.post('/mobile/doch5/user_recipe_detail', {'id': this.$route.params.did }, function (res) {
        console.log(res.data)
        if (res.data.code == 1) {
            _this.canvasdata = res.data.data
            _this.durg = res.data.drug
            _this.$nextTick(() => {
                if(_this.canvasdata.signpic) {
                    _this.$refs.doctorImg.src = _this.$https.baseURL+_this.canvasdata.signpic
                }
                if (_this.canvasdata.seal) {
                    _this.$refs.chapter.src = _this.$https.baseURL+_this.canvasdata.seal
                }
                var ts = setTimeout(() => {
                    _this.canvasImg();
                    clearTimeout(ts)
                }, 300)  
            })
            
        }
    })

     
    
 },
  methods: {
        handleClick () {   // 调取安卓 和 ios 事件
            console.log(this.imgUrl)
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if (isAndroid) {
                android.downLoad(this.imgUrl)
            }
            if (isiOS) {
                window.webkit.messageHandlers.downLoad.postMessage(this.imgUrl);
            }
        },
        canvasImg () {
            var _this = this;
            var cntElem = document.getElementById('html');
            var width = cntElem.offsetWidth; //获取dom 宽度
            var height = cntElem.offsetHeight; //获取dom 高度
            var canvas = document.createElement("canvas"); //创建一个canvas节点
            var scale = window.devicePixelRatio * 1;//获取设备的显示参数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
            var opts = {
                backgroundColor:null,
                scale: scale?scale:1, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                // allowTaint: true,
                // useCORS: true // 跨域配置
            };
            html2canvas(cntElem, opts).then(function (canvas) {
                var imgs = canvas.toDataURL("image/png");
                _this.imgUrl = imgs;
                // cntElem.style['-webkit-transform'] = 'scale(0.5)';
                // cntElem.style['-webkit-transform-origin-y'] = 'top';
                _this.isPos = false;
                document.getElementById('canvas_box').style['background-color'] = '#000';
                var box = _this.$refs.imageBox;
                box.innerHTML = '<img src="'+imgs+'" alt="" />'
                // var h = window.getComputedStyle(cntElem).height;
                // h = h.replace(/px/, '');
                // box.style['height'] =  h / 2+'px';
                _this.$indicator.close();
            });
        }
    },
    beforeDestroy () {
        this.$indicator.close();
    }
}
</script>


<style lang="scss" scoped>

@function rem($px) {
    @return $px / 50 +rem;
}


#canvas_box {
    width: 100%;
    height: 100%;
    color: #333;
    background: #fff;
    letter-spacing: 1px;
    .flex {
        width: 100%;
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
        height: 100%;
        >img {
            width: 100%;
        }
    .pos_abs {
        position: absolute;
        top: 0;
        left: -200%;
    }
    .html_content {
        background: #fff;
        width: 200%;
        font-size:16px;
        padding: 20px 30px;
        min-height: 50%;
        zoom: 1;
        // -webkit-transform-origin-y: 0;
        -webkit-transform-origin-x: 0;    /*定义元素被置于x轴的何处*/
        -webkit-transform: scale(1);   /*定义元素被缩放*/
        .canvas_head {
            width: 100%;
            >ul {            
                display: -webkit-box;      
                display: -moz-box;       
                display: -ms-flexbox;
                display: -webkit-flex;
                display: flex;
                letter-spacing: 1px;
                li {
                    width: 33%;
                    font-size: 12px;
                }
            }
        }
        h2 {
            font-size: rem(20);
            padding: 15px;
            text-align: center;
            letter-spacing: rem(3);
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
                li {
                    width: 33%;
                    padding: rem(4) 0;
                    font-size: rem(16);
                    letter-spacing: rem(2);
                }
            }
            ul.result {
                width: 100%;
                li {
                    width: 100%;
                    span {
                        display: inline-block;
                        line-height: 26px;
                    }
                    span:last-child {
                        width: 80%;
                        line-height: 26px;
                        vertical-align: top;
                    }
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
                margin-top: rem(15);
                font-size: rem(10);
                li {
                    line-height: 30px;
                    font-size: rem(16);
                    span {
                        margin-left: 14px;
                    }
                }
            }
            .tshi {
                position: absolute;
                right: rem(30);
                bottom: rem(10);
                font-size: rem(8);
                width: 100px;
                height: 100px;

                img {
                    width: 100px;
                    height:100px;
                    border-radius: 50%;
                }
            }
        }
        .msg {
            text-align: center;
            font-size: rem(10);
            line-height: 15px;
            padding-bottom: 10px;
            letter-spacing: 3px;
        }
        .check {
            margin-top: 10px;
            width: 100%;
            font-size: rem(14);
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
                    align-items: center;
                    -webkit-align-items: center;
                    -moz-align-items: center;
                    -ms-align-items: center;
                    -o-align-items: center;
                    font-size: 14px;
                    padding-bottom: 30px;
                    > img {
                        max-width: 50px;
                        height: 30px;
                        margin-left: 5px;
                        display: block;
                    }
                }
            }
        }
        
    }
}
    .btn {
        width: 100%;
        text-align: center;
        font-size: rem(16);
        position: fixed;
        z-index: 1000;
        left: 0;
        bottom: rem(40);
        > button {
            color: #fff;
            background-color: #999;
            padding: rem(5) rem(10);
            border-radius: rem(3);
        }
    }
}
</style>

