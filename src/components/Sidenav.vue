<template>
  <q-list>
    <q-item clickable :to="localizacion">
      <q-item-section>
        <q-item-label>Ingresar calificación</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable :to="formularios">
      <q-item-section>
        <q-item-label>Formularios guardados</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable @click.native="sincronizarDatos">
      <q-item-section>
        <q-item-label>Sincronizar datos</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable @click.native="logout">
      <q-item-section>
        <q-item-label>Cerrar sesión</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import FileService from "../services/file.service";
export default {
  data() {
    return {
      localizacion: { name: "localizacion" },
      formularios: { name: "formularios" }
    };
  },
  methods: {
    async sincronizarDatos() {
      this.$q.loading.show({
        message: "Sincronizando datos..."
      });
      this.$store
        .dispatch("app/sincronizarDatosApp")
        .then(async data => {
          this.$q.notify({
            message: "Datos sincronizados."
          });
          if (data) {
            const fileEntry = await FileService.createFile("datos.json", {
              create: true
            });
            await FileService.writeFile(fileEntry, data);
            this.$q.loading.hide();
            this.$emit("closeDrawer");
          }
        })
        .catch(error => {
          console.error(error);
          this.$q.loading.hide();
          this.$emit("closeDrawer");
        });
    },
    logout() {
      this.$store.dispatch("app/logout").then(() => {
        this.$router.push({ name: "login" });
      });
    }
  }
};
</script>
