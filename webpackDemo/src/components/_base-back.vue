<template>
  <div class="back">
    <mt-button type="primary" icon="back" @click="show">back button</mt-button>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      toastInstanse: null
    }
  },
  created() {
    //模拟数据获取，开始就显示正在加载数据的toast
    /*  this.show()
    this.getList() */
  },
  methods: {
    getList() {
      setTimeout(() => {
        //使用箭头函数，使内部this指向上下文的对象的this指向
        this.toastInstanse.close()
      }, 3000)
    },
    show() {
      console.log('调用了.vue组件的show方法')
      this.toastInstanse = Toast({
        message: '提示',
        position: 'top',
        duration: 1000, //设置为-1 不会自动消失
        iconClass: 'glyphicon glyphicon-ok'
      })
    }
  }
}
</script>
