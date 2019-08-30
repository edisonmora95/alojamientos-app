<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import FileService from "./services/file.service";
export default {
  name: "App",
  mounted() {
    document.addEventListener("deviceready", this.readFile, false);
  },
  methods: {
    async readFile() {
      const fileEntry = await FileService.createFile("formulario.json", {});
      let file = await FileService.readFile(fileEntry);
      file = JSON.parse(file);
      this.$store.commit("form/addForm", file);
    }
  }
};
</script>

<style></style>
