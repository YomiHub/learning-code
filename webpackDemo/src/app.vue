<template>
  <div>
    <mt-button type="primary" icon="back" @click="show">primary button</mt-button>
    <button type="button" class="mui-btn">默认</button>
    <button type="button" class="mui-btn mui-btn-primary">蓝色</button>
    <button type="button" class="mui-btn mui-btn-success">绿色</button>
    <div>这里是.vue文件内的登录模板{{ msg }}</div>
    <router-link to="/pageone">pageone</router-link>
    <router-link to="/pagetwo">pagetwo</router-link>
    <router-view></router-view>
  </div>
</template>
<style></style>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      msg: "这是组件内data函数return的对象数据",
      toastInstanse: null
    };
  },
  created() {
    //生命周期函数，组件加载完毕
    this.getList();
  },
  methods: {
    getList() {
      //模拟数据获取，开始就显示正在加载数据的toast
      this.show();
      setTimeout(() => {
        //使用箭头函数，使内部this指向上下文的对象的this指向
        this.toastInstanse.close();
      }, 3000);
    },
    show() {
      console.log("调用了.vue组件的show方法");
      this.toastInstanse = Toast({
        message: "提示",
        position: "top",
        duration: -1,
        iconClass: "glyphicon glyphicon-ok"
      });
    }
  }
};
</script>
