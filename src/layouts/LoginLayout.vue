<template>
  <q-layout view="lHh Lpr lFf">
    <header class="text-center">
      <q-img :src="imgSrc"></q-img>
    </header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
/* global require */
export default {
  name: "LoginLayout",
  data() {
    return {
      imgSrc: require("../assets/img/logo.jpg")
    };
  }
};
</script>
<style scoped>
.q-img {
  height: 250px;
  width: 250px;
}
</style>
