<template>
  <div>
    <BaseBack></BaseBack>
    <BaseBtn></BaseBtn>

    <button type="button" class="mui-btn">默认</button>

    <div>这里是.vue文件内的登录模板<br />{{ msg }}</div>
    <router-link to="/pageone">pageone</router-link>
    <router-link to="/pagetwo">pagetwo</router-link>
    <router-view></router-view>

    <div id="dynamic-fade-demo" class="demo">
      Fade In:
      <input
        type="range"
        v-model="fadeInDuration"
        min="0"
        v-bind:max="maxFadeDuration"
      />
      Fade Out:
      <input
        type="range"
        v-model="fadeOutDuration"
        min="0"
        v-bind:max="maxFadeDuration"
      />
      <transition
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <p v-if="show">hello</p>
      </transition>
      <button
        v-if="stop"
        v-on:click="
          stop = false
          show = false
        "
      >
        Start animating
      </button>
      <button v-else v-on:click="stop = true">Stop it!</button>
    </div>
    <input type="text" v-focus />
    <hr />
    <h4>以下按钮用于测试axios</h4>
    <button @click="axiosGet" class="flex-center">axiosGet</button>

    <input type="text" placeholder="test">
  </div>
</template>
<style></style>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      msg: '这是组件内data函数return的对象数据',
      show: true,
      fadeInDuration: 1000,
      fadeOutDuration: 1000,
      maxFadeDuration: 1500,
      stop: true
    }
  },
  created() {
    //生命周期函数，组件加载完毕
  },
  mounted: function() {
    this.show = false
  },
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0
    },
    enter: function(el, done) {
      var vm = this
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: function() {
            done()
            if (!vm.stop) vm.show = false
          }
        }
      )
    },
    leave: function(el, done) {
      var vm = this
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: function() {
            done()
            vm.show = true
          }
        }
      )
    },
    axiosGet() {
      this.$axios('getGoodsComment', {
        params: {
          articleid: 2
        }
      }).then(function(data) {
        console.log(data)
      })
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  }
}
</script>
