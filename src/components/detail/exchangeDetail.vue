<template>
    <div class="exchangeDetail">
        <div class="exchangeDetail-box" v-show="isView">
            <div class="bannerList">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for='(val,i) in orderdatas.banner_pic' :key='i'>
                            <img :src="$https.baseURL+val" alt="" />
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="shop-msg">
                <h2>{{ orderdatas.name }}</h2>
                <p>{{ orderdatas.text }}</p>
                <ul class="dis_f dis_sb">
                    <li>{{ orderdatas.gname }}</li>
                    <li>
                        <span>{{ orderdatas.count }}</span>云医币
                    </li>
                </ul>
            </div>
            <div class="shop-detail">
                <ul>
                    <li v-for="(img, j) in orderdatas.details_pic" :key='j+"_d"'>
                        <img v-lazy="img?$https.baseURL+img:''" alt=""/>
                    </li>
                </ul>
            </div>
            <div class="shop-dhgz">
                <ul>
                    <h3><b></b><span>兑换规则</span><b></b></h3>
                    <li>1、商品及红包一经兑换，不可退换；</li>
                    <li>2、 兑换所得红包奖励，将于1个工作日内发放至鲁通账户中，医生在鲁医通账户中可提现；</li> 
                    <li>3、兑换所得商品，将于7个工作日内为您发货；</li>
                    <li>4、兑换活动的最终解释权归云医安康所有；</li>
                    <li>5、商品和活动皆与设备制作商Apple lnc.无关。</li>
                </ul>
            </div>
        </div>
        <div class="exchangeDetail-errMsg" v-if='isErr'>
            <img src="../../common/img/icon/default.png" alt="" />
            <p>商品不存在</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            count: 0,
            isView: false,
            isErr: false,
            orderdatas: {},
        }
    },
    mounted () {
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        var self = this;
        let { id } = this.$route.params;
        this.$https.post('/mobile/DocIntegral/gift_shop_details', { id:id}, function (res) {
            self.$indicator.close();
            if (res.status >= 200 && res.status < 300) {
                console.log(res.data)
                if (res.data.code == 200) {
                    self.isView = true;
                    var orderdata = res.data.data;
                    if (orderdata.banner_pic) {
                        orderdata.banner_pic = orderdata.banner_pic.split(',');
                        orderdata.banner_pic.filter(val => {
                            return val != '';
                        })
                    }
                    if (orderdata.details_pic) {
                        orderdata.details_pic = orderdata.details_pic.split(',');
                        orderdata.details_pic.filter(val => {
                            return val !== "";
                        })
                    }
                    self.orderdatas = Object.freeze(orderdata);
                    self.$nextTick(() => {
                        if (self.orderdatas.banner_pic.length > 1) {
                            var swipers = new Swiper ('.swiper-container', {
                                loop: true,
                                pagination: {
                                    el: '.swiper-pagination',
                                },
                            }) 
                        }
                    })
                } else {
                    self.isErr = true;
                }
            }
        })
    },
    beforeDestroy () {
        this.$indicator.close();
    }
}
</script>
<style lang="scss" scoped>
@function rem($px) {
    @return $px/100+rem;
}

.exchangeDetail {
    width: 100%;
    height: 100%;
    font-size: rem(28);
    &-box {
        width: 100%;
        padding-bottom: rem(20);
        background-color: #F6F6F6;
        .shop-msg {
            width: 100%;
            background-color: #fff;
            padding: rem(29);
            > h2 {
                font-size: rem(30);
                color: #333;
            }
            >p {
                font-size: rem(24);
                color: #808080;
                margin-top: rem(23);
            }
            > ul {
                margin-top: rem(19);
                color: #5189F6;
                li:first-child {
                    font-size: rem(20);     
                    padding: 0 rem(15);
                    height: rem(44);
                    line-height: rem(40);
                    position: relative;
                    &:after{
                        content: "  ";
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index:1;
                        width: 200%;
                        height:160%;
                        border: 1px solid #5189F6;
                        -webkit-transform-origin-x: 0;
                        transform-origin: 0 0;
                        -webkit-transform: scale(.5, .5);
                        transform: scale(.5, .5);
                        -webkit-border-radius: rem(20);
                        border-radius: rem(20);
                    }
                }
                li:last-child {
                    font-size: rem(24);
                    font-weight: 600;
                    > span {
                        font-size: rem(40);
                    }
                }
            }
        }
        .shop-detail {
            width: 100%;
            margin-top: rem(20);
            background-color: #fff;
            ul {
                width: 100%;
                li {
                    width: 100%;
                    img[lazy=loading] {
                        width: 100%;
                        height: 200px;
                        margin: auto;
                        background: url("../../common/img/lazy.gif") no-repeat center;
                        background-size: 20px 20px;
                        background-color: #f9f9f9;
                    }
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .shop-dhgz {
            width: 100%;
            margin-top: rem(20);
            padding: rem(30);
            margin-bottom: rem(10);
            background-color: #fff;
            > ul {
                border: 1px dashed #bbb;
                -webkit-border-radius: rem(12);
                border-radius: rem(12);
                padding: rem(30);
                h3 {
                    font-size: rem(32);
                    color: #333;
                    text-align: center;
                    font-weight:500;
                    margin-bottom: rem(19);
                    > b {
                        display: inline-block;
                        width: rem(79);
                        height: 1px;
                        background-color: #aaa;
                        vertical-align: rem(12);
                    }
                    >span {
                        display: inline-block;
                        margin:0 rem(10);
                    }
                }
                li {
                    color: #666;
                    font-size: rem(26);
                    margin-top: rem(8);
                }
            }
        }
    }
    &-errMsg {
        width: 100%;
        color: #808080;
        text-align: center;
        margin-top: 30%;
        img {
            width: rem(240);
            margin: 0 auto;
        }
    }
}
</style>