<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="localizacion-form">
      <section class="col-xs-12">
        <q-input
          outlined
          autogrow
          v-model="localForm.recomendaciones"
          label="Recomendaciones"
          type="textarea"
          counter
          maxlength="300"
        />
      </section>
      <section class="col-xs-12 q-mt-lg q-px-lg">
        <section class="row">
          <article class="col-xs-6">
            <label>Puntaje</label>
          </article>
          <article class="col-xs-6">
            <p class="text-right">{{ puntajeTotal }}/100</p>
          </article>
        </section>
        <section class="row">
          <article class="col-xs-6">
            <label>Calificación</label>
          </article>
          <article class="col-xs-6">
            <p class="text-right" :class="calificacionClass">
              {{ calificacionGeneral }}
            </p>
          </article>
        </section>
      </section>
      <footer class="col-xs-12">
        <q-btn
          flat
          class="btnRegresar"
          color="blue-grey"
          icon="keyboard_arrow_left"
          label="Regresar"
          @click="prevStep"
        />
        <q-btn
          flat
          class="btnContinuar"
          color="secondary"
          icon-right="keyboard_arrow_right"
          label="Continuar"
          @click="nextStep"
        />
      </footer>
    </q-form>
  </q-page>
</template>

<script>
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "finFormulario"
      },
      prevPage: {
        name: "accesibilidad"
      },
      localForm: {
        recomendaciones: ""
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    puntajeTotal() {
      return this.$store.getters["form/puntajeTotal"];
    },
    calificacion() {
      return this.$store.getters["form/calificacion"];
    },
    calificacionClass() {
      if (this.calificacionGeneral === "NO APTO") {
        return "text-negative";
      } else if (this.puntajeTotal > 90) {
        return "text-positive";
      } else if (this.puntajeTotal > 60) {
        return "text-warning";
      } else {
        return "text-negative";
      }
    },
    calificacionGeneral() {
      if (this.calificacion) {
        return this.calificacion;
      } else if (this.puntajeTotal > 90) {
        return "APTO";
      } else if (this.puntajeTotal > 60) {
        return "SUJETO A CUMPLIR RECOMENDACIONES";
      } else {
        return "NO APTO";
      }
    }
  },
  methods: {
    copyFormValues() {
      for (let key in this.localForm) {
        this.localForm[key] = this.form[key];
      }
    },
    updateForm() {
      const payload = this.localForm;
      this.$store.commit("form/updateForm", payload);
    },
    nextStep() {
      this.updateForm();
      this.$store.commit(
        "form/setCalificacionGeneral",
        this.calificacionGeneral
      );
      this.$router.push(this.nextPage);
    },
    prevStep() {
      this.updateForm();
      this.$router.push(this.prevPage);
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
