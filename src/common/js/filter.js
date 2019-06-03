
// 创建 filter.js 文件
// 全局时间过滤器
import Vue from 'vue'

Vue.filter('filterTime', function(time) {
    if (!time) {
        return;
    }
    var date = new Date(time*1000)
    var dateNumFun = (num) => num < 10 ? '0' + num : num 
    var Y = date.getFullYear(),
               M = dateNumFun(date.getMonth() + 1),
               D = dateNumFun(date.getDate()),
               h = dateNumFun(date.getHours()),
               m = dateNumFun(date.getMinutes()),
               s = dateNumFun(date.getSeconds())
    return Y+'-'+M+'-'+D +' '+h+':'+ m
})

// 只能输入整数
Vue.directive('enterNumber', {
    inserted: function (el) {
      el.addEventListener("keypress",function(e){
        e = e || window.event;
        let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
        let re = /\d/;
        if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }                            
        }
      });
    }
  });

//   只能输入整数或者两位小数
  Vue.directive('enterNumber2', {
    inserted: function (el) {
      el.addEventListener("keypress",function(e){
        e = e || window.event;
        let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
        let re = /\d/;
        if(charcode == 46){
          if(el.value.includes('.')){
            e.preventDefault();
          }
          return;
        }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
            e.preventDefault();
          }else{
              e.returnValue = false;
          }
        }
      });
    }
  });