<template>
    <div class="detail_box">
    <div class="detail" v-if='status'>
        <div class="bg_f lunbo">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for='(val,i) in pics' :key='i'>
                        <img :src="$https.baseURL+val.img" alt="" />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="title bg_f" v-if='flag'>
            <h4>{{ datalist.name }}</h4>
            <div class="price">
                <span class="color_red">￥<span style='font-size: .28rem;'>{{ datalist.price }}</span></span>
                <div class="nums">
                    <span @click='handleminus'><img src="../../common/img/icon_js@2x.png" alt="" /></span>
                    <span>{{ numVal }}</span>
                    <span @click='handleadd'><img src="../../common/img/icon_zd@2x.png" alt="" /></span>
                </div>
            </div>
            <!-- <p><span>{{ datalist.sales_volume }}</span>人购买</p> -->
        </div>

        


        <div class="detail_con bg_f" v-if='datalist.type == 1? true:false'>        <!--  1 药品 2 保健品 3 医疗器械 -->
            <ul>
                <li class="border_blue"><span>商品类型：</span><span>{{ datalist.recipe }}</span></li>
                <li><span>商品剂型：</span><span>{{ datalist.type2 }}</span></li>
                <li><span>商品用法：</span><span>{{ datalist.usetype }}</span></li>
            </ul>
            <ul>
                <li class="border_blue"><span>规格：</span><span>{{ datalist.specification }}</span></li>
                <li><span>成分：</span><span>{{ datalist.type2 }}</span></li>
                <li><span>性状：</span><span>{{ datalist.usetype }}</span></li>
                <li><span>功能主治：</span><span>{{ datalist.attending_functions }}</span></li>
                <li><span>用法用量：</span><span>{{ datalist.dose }}</span></li>
                <li><span>生产厂家：</span><span>{{ datalist.enterprise }}</span></li>
                <li><span>有效期：</span><span>{{ datalist.uselife }}</span></li>
                <li><span>批准文号：</span><span>{{ datalist.code }}</span></li>
                <li><span>注意事项：</span><span>{{ datalist.cautions }}</span></li>
            </ul>
        </div>
        <div class="detail_con bg_f" v-if='datalist.type == 2?true:false'>
            <ul>
                <li><span>保健功能：</span><span>{{ datalist.health }}</span></li>
                <li><span>商品剂型：</span><span>{{ datalist.type2 }}</span></li>
                <li><span>商品用法：</span><span>{{ datalist.usetype }}</span></li>
            </ul>
            <ul>
                <li><span>规格：</span><span>{{ datalist.specification }}</span></li>
                <li><span>成分：</span><span>{{ datalist.type2 }}</span></li>
                <li><span>性状：</span><span>{{ datalist.usetype }}</span></li>
                <li><span>适宜人群：</span><span>{{ datalist.appropriate }}</span></li>
                <li><span>用法用量：</span><span>{{ datalist.dose }}</span></li>
                <li><span>生产厂家：</span><span>{{ datalist.enterprise }}</span></li>
                <li><span>有效期：</span><span>{{ datalist.uselife }}</span></li>
                <li><span>批准文号：</span><span>{{ datalist.code }}</span></li>
                <li><span>注意事项：</span><span>{{ datalist.cautions }}</span></li>
            </ul>
        </div>
        <div class="detail_con bg_f" v-if='datalist.type == 3?true:false'>
            <ul>
            </ul>
            <ul>
                <li><span>型号：</span><span>{{ datalist.model }}</span></li>
                <li><span>生产企业：</span><span>{{ datalist.enterprise }}</span></li>
                <li><span>适宜人群：</span><span>{{ datalist.appropriate }}</span></li>
                <li><span>使用方法：</span><span>{{ datalist.utype }}</span></li>
                <li><span>注意事项：</span><span>{{ datalist.cautions }}</span></li>
            </ul>
        </div>
        <div class="cont_img">
            <ul>
                <li v-for='(val,i) in imgs' :key='i' ><img :src="$https.baseURL+val.img" alt=""></li>
            </ul>
        </div>
    </div>
    
    <div class="detail" v-if="shopStatus">
        <div class="banner">
            <img :src="$https.baseURL+shopData.pic" alt="" />
        </div>
        <div class="title bg_f">
            <h4>{{ shopData.name }}</h4>
            <div class="price">
                <span class="color_red">￥<span style='font-size: .28rem;'>{{ shopData.money }}</span></span>
                <div class="nums">
                    <span @click='handleminus'><img src="../../common/img/icon_js@2x.png" alt="" /></span>
                    <span>{{ numVal }}</span>
                    <span @click='handleadd'><img src="../../common/img/icon_zd@2x.png" alt="" /></span>
                </div>
            </div>
            <!-- <p><span>{{ datalist.sales_volume }}</span>人购买</p> -->
        </div>
        <div class="detail_con bg_f" >        <!-- 新接口 -->
            <ul>
                <li class="border_blue"><span>商品类型：</span><span>{{ shopData.cfy }}</span></li>
                <li><span>商品剂型：</span><span>{{ shopData.ypzt }}</span></li>
                <li><span>商品用法：</span><span>{{ shopData.yfyl }}</span></li>
            </ul>
            <ul>
                <li class="border_blue"><span>规格：</span><span>{{ shopData.gg }}</span></li>
                <li><span>成分：</span><span>{{ shopData.cf }}</span></li>
                <li><span>性状：</span><span>{{ shopData.xz }}</span></li>
                <li><span>功能主治：</span><span>{{ shopData.syz }}</span></li>
                <li><span>用法用量：</span><span>{{ shopData.yfyl }}</span></li>
                <li><span>生产厂家：</span><span>{{ shopData.gc }}</span></li>
                <li><span>有效期：</span><span>{{ shopData.yxq }}</span></li>
                <li><span>批准文号：</span><span>{{ shopData.pzwh }}</span></li>
                <li><span>注意事项：</span><span>{{ shopData.zysx }}</span></li>
            </ul>
        </div>
    </div>
    
    <div class="empty_2" v-if='!flag'>
        <img src="../../common/img/icon/default.png" alt="">
        <p class="Ft-S28">您查看的商品已被删除，请查看其他商品。</p>
    </div>
    </div>
</template>
<script>
import { hybrid } from '../../common/js/app'
export default {
    name: 'newshopdetails',
    data () {
        return {
            flag: true,
            status: false,
            shopStatus: false,
            datalist:{
                attending_functions: "",
                cautions: "",
                code: "",
                dose: "",
                enterprise: "",
                gid: 4,
                name: "",
                pic: "",
                price: "",
                recipe: 1,
                sales_volume: 0,
                specification: "",
                state: 1,
                type: '',
                type2: "",
                uselife: "",
                usetype: 1
            },
            imgs: [],
            pics: [],
            numVal: this.$route.params.int,     // 数量
            id: this.$route.params.did,
            shopData: {},               // new
        }
    },
    created () {
        console.log(window)
        window.add = this.add
        hybrid.minus = this.minus
        this.status = false
        this.shopStatus = false
    },
    mounted () {
        if (this.$route.params.tag == 1) {
            this.newinitdata()
        } else {
            this.initdata()
        }
    },
    methods: {
        handleClick: function (type) { // 和 ios 和 android 交互
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var obj = { type:type, val: this.numVal }   // 给 ios 传参
            var obj2 = {};
            if (this.$route.params.tag == 1) { // 给 android 传参
                obj2 = JSON.stringify(this.shopData)
            } else {
                obj2 = JSON.stringify(this.datalist)
            }
            console.log(obj2)
            if (isAndroid) {
                android.getDrugNum(this.numVal, obj2)
            }
            if (isiOS) {
                window.webkit.messageHandlers.getDrugNum.postMessage(obj);
            }
        },
        initdata () {
             var _this = this;
            this.$https.post('/mobile/doch5/doc_goods_detail', {id: this.id }, function (res) {
                var datas = res.data
                console.log(datas)
                if (datas.code == 1) {
                    _this.flag = true;
                    _this.$nextTick(() => {
                        _this.status = true
                        _this.datalist = datas.data
                        _this.datalist.usetype = datas.data.usetype == 1? '内服': '外用'
                        _this.datalist.recipe = datas.data.recipe == 0? '非处方':'处方'
                        _this.imgs = datas.img
                        _this.pics = datas.pic
                        _this.$nextTick(() => {
                            if (_this.pics.length > 1) {
                                var swipers = new Swiper ('.swiper-container', {
                                    loop: true,
                                    // autoplay: true,
                                    pagination: {
                                        el: '.swiper-pagination',
                                    },
                                }) 
                            }
                        })
                    })
                } else {
                    _this.flag = false
                }
            })
        },
        newinitdata() {
            var self = this;
            self.$https.post('/mobile/doch5/store_goods_detail', {id: this.id }, function (res) {
                console.log(res.data)
                if (res.data.code == 1) {
                    self.shopStatus = true
                    self.shopData = res.data.data
                } else {
                    self.shopStatus = false
                    self.flag = false
                }
            })
        },
        add (num) {
            this.numVal = num
        },
        minus (num) {
            this.numVal = num
        },
        handleadd () {
            if (this.shopData.stock && this.numVal >= this.shopData.stock) {
                this.$toast({
                    message: '此药品库存不足!',
                    position: 'middle',
                    duration: 2000
                });
                return false;
            }
            this.numVal ++
            this.handleClick('yes')
            
        },
        handleminus () {
            if (this.numVal <= 0) {
                return;
            }
            this.numVal --
            this.handleClick('no')
        },
    }
}
</script>
<style lang='scss' scoped>
@function rem($px) {
    @return $px / 50 + rem;
}
$color: #333;


.bg_f {
    background-color: #fff;
}
.detail {
    width: 100%;
    color: $color;
    background-color: #f4f4f4;
    padding-bottom: .3rem;
    font-size: rem(14);
    .banner {
        width: 100%;
        img {
            width:100%;
        }
    }
    .lunbo {
        width:100%;
        .swiper-pagination {
            bottom: rem(20);
            color: #fff;
            left: 50%;
            transform: translate(-50%, 0);
            -ms-transform: translate(-50%, 0);
            -moz-transform: translate(-50%, 0);
            -webkit-transform: translate(-50%, 0);
            -o-transform: translate(-50%, 0);
            z-index: 999;
        }

    }
    .title {
        font-size: 0.28rem;
        padding: 0.25rem;
        h4 {
            font-weight:500;
            color:#333;
            line-height:0.33rem;
        }
        .price {
            margin-top: 0.19rem;
            font-size: 0.22rem;
            font-weight: 550;
            overflow: hidden;
            .color_red {
                color: #E9541F;
            }
            .nums {
                float: right;
                margin-right: rem(5);
                span {
                    display: inline-block;
                    height: rem(24);
                    border-radius: 100%;
                    text-align: center;
                    line-height: rem(26);
                    img {
                        width: rem(24);
                        height: rem(24);
                        display: inline-block;
                        vertical-align: top;
                   }
                }
               
                span:nth-child(2) {
                    min-width: rem(25);
                    font-size: rem(16);
                    font-weight: normal;
                    color: #333;
                   
                }
            }
        }
        p {
            margin-top: 0.38rem;
            color:#A9A9A9;
            font-size: 0.22rem;
            span {
                color: #A9A9A9;
            }
        }
    }
    .detail_con {
        font-size: 0.28rem;
        margin-top: 0.2rem;
        overflow: hidden;
        ul {
            font-weight: 400;
            li {
                width: 100%;
                padding: 0 0.21rem;
                margin: 0.4rem 0;
                -webkit-display: flex;
                display: flex;

                span:first-child {
                    color: #808080;
                    display: block;
                    width: 26%;
                    line-height: rem(26);
                }
                span:last-child {
                    color: #333;
                    display: block;
                    width: 70%;
                    line-height: rem(26);
                }
            }
            .border_blue {
                padding: 0;
                span:first-child {
                    padding-left: 0.2rem;
                    border-left: 3px solid #5189F6;
                }
            }
        }
        ul:first-child {
            border-bottom: 1px solid rgba(224,224,224,1);
        }
    }
    .cont_img {
        width: 100%;
        font-size: 0.28rem;
        overflow: hidden;
        ul {
            width: 100%;
            li {
                width: 100%;
                img {
                    display: block;
                    width: 100%;

                }
            }
        }
    }
}
.empty_2 {
    width: 100%;
    text-align: center;
    margin-top: 30%;
    >img {
        width: 50%;
        margin: 0 auto;
    }
    > p {
        font-size: rem(14);
        color: #666;
    }
}
</style>
