import Vue from "vue";
import Router from "vue-router";

const Details = () => import("../components/Details" /* webpackChunkName: "chunkname1" */);
const SetTime = () => import("../components/SetTime" /* webpackChunkName: "chunkname1" */);
const Agreement = () => import("../components/Agreement" /* webpackChunkName: "chunkname1" */);

const Detail = () => import(/* webpackChunkName: "chunkname2" */ "../components/h5/detail");
const Download = () => import(/* webpackChunkName: "chunkname2" */ "../components/h5/canvas");
const DoctorDetail = () => import(/* webpackChunkName: "chunkname2" */ "../components/h5/doctordetail");
const DoctorDownload = () => import(/* webpackChunkName: "chunkname2" */ "../components/h5/doctorcanvas");

const ShopDetails = () => import("../components/h5/shopdetails");
const NewShopDetails = () =>import('../components/h5/newshopdetails.vue');

Vue.use(Router);
const router = new Router({
  // mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      //文章详情Details
      path: "/Details/:did/:aid", // did：医生id   aid：文章id
      name: "Details",
      component: Details
    },
    {
      //时段设置SetTime
      path: "/SetTime/:did", // 医生id
      name: "SetTime",
      component: SetTime
    },
    {
      // 用户协议Agreement
      path: "/Agreement",
      name: "Agreement",
      component: Agreement
    },
    // 分隔
    {
      path: "/shopdetails/:did",
      title: "商品详情页",
      name: "shopdetails",
      component: ShopDetails
    },
    {
      path: "/detail/:did",
      title: "处方详情页",
      name: "detail",
      component: Detail
    },
    {
      path: "/download/:did",
      title: "下载处方单",
      name: "download",
      component: Download
    },
    {
      path: "/doctordetail/:did",
      title: "处方详情页2",
      name: "doctordetail",
      component: DoctorDetail
    },
    {
      path: "/doctordownload/:did",
      title: "下载处方单",
      name: "doctordownload",
      component: DoctorDownload
    },
    {
      path: "/newshopdetails/:did/:tag/:int", // did 详情id， tag 标识
      title: "新商品详情页",
      name: "newshopdetails",
      component: NewShopDetails
    },
  ]
});

// 以下是处理vue错误 Loading chunk chunkname1 failed.
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if(isChunkLoadFailed){
      router.replace(targetPath);
  }
})

export default router;