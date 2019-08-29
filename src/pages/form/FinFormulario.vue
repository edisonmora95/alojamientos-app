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
          <q-btn flat color="positive">Enviar</q-btn>
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
      loadingGuardar: false
    };
  },
  computed: {
    imgSrc() {
      return require("../../assets/img/form_completed.svg");
    },
    form() {
      return this.$store.getters["form/form"];
    }
  },
  methods: {
    guardar() {
      this.loadingGuardar = true;
      this.$store
        .dispatch("form/guardarFormulario", this.form)
        .then(() => {
          this.loadingGuardar = false;
        })
        .catch(error => {
          this.loadingGuardar = false;
          console.error(error);
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
