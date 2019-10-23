<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :no-error-focus="true" :ref="refForm">
      <main class="row q-mt-md">
        <!-- RECURSOS -->
        <div v-if="form.tipo === 1">
          <section class="col-xs-12" v-if="newRecurso">
            <section class="row">
              <header class="col-xs-12">
                <label>Nuevo recurso interno</label>
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
            <q-icon name="add" />Añadir otro
          </p>
          <section class="col-xs-12" v-if="localForm.recursos.length > 0">
            <section class="row">
              <header class="col-xs-12">
                <label class="text-bold">Recursos internos registrados</label>
              </header>
              <RecursoInterno
                v-for="(recurso, index) in localForm.recursos"
                :key="'recurso-' + index"
                :recurso="recurso"
                class="col-xs-12"
              >
                <template slot="header">
                  <label> Recurso # {{ index + 1 }}</label>
                </template>
              </RecursoInterno>
            </section>
          </section>
        </div>
        <!-- ./RECURSOS -->
        <!-- INSTITUCIONES EMERGENCIA -->
        <section class="col-xs-12" v-if="newInstitucion">
          <section class="row">
            <header class="col-xs-12">
              <label>Nueva institución de emergencia</label>
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
          <q-icon name="add" />Añadir otra
        </p>
        <section class="col-xs-12" v-if="localForm.instituciones.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold"
                >Instituciones de emergencia registrados</label
              >
            </header>
            <InstitucionEmergencia
              v-for="(institucion, index) in localForm.instituciones"
              :key="'institucion-' + index"
              :institucionEmergencia="institucion"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Institución # {{ index + 1 }}</label>
              </template>
            </InstitucionEmergencia>
          </section>
        </section>

        <!-- ./INSTITUCIONES EMERGENCIA -->
      </main>
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
import FormMixin from "../../mixins/FormMixin";
import RecursoInterno from "../../components/Form/RecursoInterno";
import InstitucionEmergencia from "../../components/Form/InstitucionEmergencia";
import PuntajeSeccion from "../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
    // Si el formulario es de terrenos, se debe redirigir a la ventana de Espacios Vitales de terrenos, no la de infraestructuras que está por default
    if (this.form.tipo === 2) {
      this.prevPage = {
        name: "caracteristicasTerreno"
      };
      this.nextPage = {
        name: "anexos"
      };
    }
  },
  data() {
    return {
      refForm: "medidas-seguridad-form",
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
      const puntajeRecursos = this.localForm.recursos.length;
      const puntajeInstituciones = this.localForm.instituciones.length * 3;
      return puntajeRecursos + puntajeInstituciones;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeMedidasSeguridad", this.puntaje);
      this.$router.push(this.nextPage);
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
  mixins: [FormMixin],
  components: {
    RecursoInterno,
    InstitucionEmergencia,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
