<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import FileService from "./services/file.service";
export default {
  name: "App",
  created() {
    /*this.$store.dispatch("app/sincronizarDatosApp")
      .then((data) => {
        if (data) {
          await this.crearArchivoDatos(data);
        }
      });*/
    document.addEventListener("deviceready", this.init, false);
  },
  methods: {
    /** Cargar datos de la memoria del dispositivo y guardarlos en vuex */
    async init() {
      // Cargar formularios guardados en memoria
      const fileEntryFormularios = await FileService.createFile("formularios.json", {
        create: true
      });
      let files = await FileService.readFile(fileEntryFormularios);
      if (files) {
        files = JSON.parse(files);
        for (let i = 0; i < files.length; i++) {
          this.$store.commit("form/saveForm", files[i]);
        }
      }
      // Cargar datos necesarios para la app
      const fileEntryDatos = await FileService.createFile("datos.json", {
        create: true
      });
      let datos = await FileService.readFile(fileEntryDatos);
      if (datos) {
        datos = JSON.parse(datos);
        this.$store.commit("app/setZonas", datos.zonas);
        this.$store.commit("app/setProvincias", datos.provincias);
        this.$store.commit("app/setCantones", datos.cantones);
        this.$store.commit("app/setParroquias", datos.parroquias);
        this.$store.commit("app/setUbicaciones", datos.ubicaciones);
      }
    },
    async crearArchivoDatos(datos) {
      const fileEntry = await FileService.createFile("datos.json", {
        create: true
      });
      await FileService.writeFile(fileEntry, datos);
    }
  }
};
</script>

<style></style>
