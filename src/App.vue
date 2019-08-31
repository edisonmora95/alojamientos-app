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
    /** Al iniciar la app se cargan los archivos almacenados */
    async readFile() {
      const fileEntry = await FileService.createFile("formularios.json", {
        create: true
      });
      let files = await FileService.readFile(fileEntry);
      if (files) {
        files = JSON.parse(files);
        for (let i = 0; i < files.length; i++) {
          this.$store.commit("form/saveForm", files[i]);
        }
      }
    }
  }
};
</script>

<style></style>
