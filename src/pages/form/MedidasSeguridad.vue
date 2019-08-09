<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="antecetendes-seguridad-form">
      <!-- RECURSOS -->
      <section class="col-xs-12" v-if="localForm.recursos.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Recursos Internos registrados</label>
          </header>
          <RecursoInterno
            v-for="(recurso, index) in localForm.recursos"
            :key="'recurso-' + index"
            :recurso="recurso"
            class="col-xs-12"
          ></RecursoInterno>
        </section>
      </section>
      <section class="col-xs-12" v-if="newRecurso">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo recutso interno</label>
          </header>
          <RecursoInterno
            class="col-xs-12"
            :isNewRecurso="true"
            v-on:addRecurso="onAddRecurso"
          ></RecursoInterno>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewRecurso"
        v-if="!newRecurso"
      >
        <q-icon name="add" />Anadir otro
      </p>
      <!-- ./RECURSOS -->
      <!-- INSTITUCIONES EMERGENCIA -->
      <section class="col-xs-12" v-if="localForm.instituciones.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Instituciones de emergencia registrados</label>
          </header>
          <InstitucionEmergencia
            v-for="(institucion, index) in localForm.instituciones"
            :key="'institucion-' + index"
            :institucionEmergencia="institucion"
            class="col-xs-12"
          ></InstitucionEmergencia>
        </section>
      </section>
      <section class="col-xs-12" v-if="newInstitucion">
        <section class="row">
          <header class="col-xs-12">
            <label>Nueva institucion de emergencia</label>
          </header>
          <InstitucionEmergencia
            class="col-xs-12"
            :isNewInstitucion="true"
            v-on:addInstitucion="onAddInstitucion"
          ></InstitucionEmergencia>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewInstitucion"
        v-if="!newInstitucion"
      >
        <q-icon name="add" />Anadir otra
      </p>
      <!-- ./INSTITUCIONES EMERGENCIA -->
      <section class="col-xs-12">
        <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
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
import RecursoInterno from "../../components/Form/RecursoInterno";
import InstitucionEmergencia from "../../components/Form/InstitucionEmergencia";
import PuntajeSeccion from "../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "infraestructuraParedes"
      },
      prevPage: {
        name: "espaciosVitalesBanos"
      },
      newRecurso: true, // Controls the New RecursoInterno input
      newInstitucion: true,
      localForm: {
        recursos: [],
        instituciones: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    puntaje() {
      const hayViasDisponibles = this.localForm.recursos.length > 0;
      if (!hayViasDisponibles) {
        return 0;
      }
      return 10;
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
    },
    showNewRecurso() {
      this.newRecurso = true;
    },
    onAddRecurso(payload) {
      this.localForm.recursos.push(payload);
      this.newRecurso = false;
    },
    showNewInstitucion() {
      this.newInstitucion = true;
    },
    onAddInstitucion(payload) {
      this.localForm.instituciones.push(payload);
      this.newInstitucion = false;
    }
  },
  components: {
    RecursoInterno,
    InstitucionEmergencia,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
