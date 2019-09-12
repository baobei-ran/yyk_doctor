<template>
    <div class='ruleIntroduction'>
        <div v-if='is_dj'>
            <img src='../../common/img/pic_djgz.png' alt='' />
        </div>
        <div v-if='is_yb'>
            <img src="../../common/img/pic_ybgz@2.png" alt="" />
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            is_dj: false,
            is_yb: false
        }
    },
    created () {
        var status = this.$route.params.tag;
        if (status == 1) {
            this.is_dj = true;
        } else {
            this.is_yb = true;
        }
    }
}
</script>
<style lang='scss' scoped>
@function rem($px) {
    @return $px / 100 +rem;
}
.ruleIntroduction {
    width: 100%;
    font-size: rem(28);
    >div {
        width: 100%;
        img {
            width: 100%;
        }
    }
}
</style>