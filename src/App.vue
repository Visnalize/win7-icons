<template>
  <div class="wrapper">
    <google-ads />
    <icon-browser />
    <google-ads />
  </div>
</template>

<script>
import GoogleAds from "./components/GoogleAds.vue";
import IconBrowser from "./components/IconBrowser.vue";

export default {
  components: { IconBrowser, GoogleAds },
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url("/bg.webp") center;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
