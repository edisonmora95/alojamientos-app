<template>
  <q-page class="q-pt-lg q-px-md">
    <q-card>
      <img height="200px" :src="imgSrc" />
      <q-card-section class="text-center">
        <h6>Has completado el formulario</h6>
        <p>
          Puedes enviarlo ahora o guardarlo temporalmente si no tienes buena
          conexión a internet.
        </p>
      </q-card-section>
      <q-card-actions class="row">
        <article class="col-xs-6 text-center">
          <q-btn flat color="primary" :loading="loadingGuardar" @click="guardar"
            >Guardar</q-btn
          >
        </article>
        <article class="col-xs-6 text-center">
          <q-btn flat color="positive" :loading="loadingEnviar" @click="enviar"
            >Enviar</q-btn
          >
        </article>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
/* global require */
export default {
  data() {
    return {
      loadingGuardar: false,
      loadingEnviar: false
    };
  },
  computed: {
    imgSrc() {
      return require("../../assets/img/form_completed.svg");
    },
    form() {
      return this.$store.getters["form/form"];
    },
    forms() {
      return this.$store.getters["form/forms"];
    }
  },
  methods: {
    async guardar() {
      try {
        this.loadingGuardar = true;
        this.$store.commit("form/setEstado", "ENVIADO");
        this.$store.commit("form/saveForm", this.form); // Guardo el formulario en vuex
        //await this.$store.dispatch("form/guardarFormularios", this.forms); // Guardo el formulario en el dispositivo
        this.loadingGuardar = false;
        this.dialogContinuar();
      } catch (error) {
        this.loadingGuardar = false;
        console.error(error);
      }
    },
    async enviar() {
      this.loadingEnviar = true;
      try {
        await this.$store.dispatch("form/ingresarFormulario", this.form);
        // await this.$store.dispatch("form/guardarFormularios", this.forms);
        this.loadingEnviar = false;
        this.dialogContinuar();
      } catch (error) {
        this.loadingEnviar = false;
        this.$q
          .dialog({
            title: "Error",
            message:
              "Parece que hubo un error al subir al servidor. ¿Desea volver a intentar o guardar el formulario temporalmente?",
            cancel: "Guardar",
            ok: "Volver a intentar",
            persistent: true
          })
          .onOk(() => {
            // VOLVER A INTENTAR
            this.enviar();
          })
          .onCancel(() => {
            this.guardar();
          });
        console.error(error);
      }
    },
    dialogContinuar() {
      this.$q
        .dialog({
          title: "Formulario guardado",
          message: "¿Desea ingresar otra calificación?",
          cancel: "Continuar",
          ok: "Terminar",
          persistent: true
        })
        .onOk(() => {
          // TERMINAR
          this.$router.push({ name: "formularios" });
        })
        .onCancel(() => {
          // CONTINUAR
          this.$router.push({ name: "localizacion" });
        });
    }
  }
};
</script>
<style scoped>
label {
  font-size: large !important;
  font-weight: 500;
}
p {
  font-size: large !important;
}
</style>
