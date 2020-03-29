<template>
  <div>
    <h1>这是第一个组件的页面page1</h1>

    <router-link to="/pageone/childrenone">display childrenone</router-link>
    <router-link to="/pageone/childrentwo">display childrentwo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>
<style scoped lang="scss">
body {
  div {
    font-style: italic;
  }
}
</style>
