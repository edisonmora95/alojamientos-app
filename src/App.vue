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
    //document.addEventListener("deviceready", this.readFile, false);
  },
  methods: {
    async createFile() {
      const options = {
        create: true
      };
      const fileEntry = await FileService.createFile("prueba1.json", options);
      await FileService.writeFile(fileEntry, this.$store.getters["app/zonas"]);
    },
    async readFile() {
      const fileEntry = await FileService.createFile("prueba1.json", {});
      const file = await FileService.readFile(fileEntry);
      console.log(JSON.parse(file));
    }
  }
};
</script>

<style></style>
