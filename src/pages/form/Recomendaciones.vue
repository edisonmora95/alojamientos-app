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
            <p class="text-right">{{ form.puntaje }}/100</p>
          </article>
        </section>
        <section class="row">
          <article class="col-xs-6">
            <label>Calificacion</label>
          </article>
          <article class="col-xs-6">
            <p class="text-right" :class="calificacionClass">
              {{ form.calificacion }}
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
        name: "anexos"
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
    calificacionClass() {
      if (this.form.puntaje > 90) {
        return "text-positive";
      } else if (this.form.puntaje > 60) {
        return "text-warning";
      } else {
        return "text-negative";
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
