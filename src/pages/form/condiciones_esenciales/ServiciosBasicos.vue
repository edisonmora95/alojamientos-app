<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="newServicio">
          <section class="row">
            <header class="col-xs-12">
              <label>Nuevo servicio básico</label>
            </header>
            <ServicioBasico
              class="col-xs-12"
              :isNewServicio="true"
              v-on:addServicio="onAddServicio"
            ></ServicioBasico>
          </section>
        </section>
        <p
          class="text-positive cursor-pointer"
          @click="showNewServicio"
          v-if="!newServicio"
        >
          <q-icon name="add" />Añadir otro
        </p>
        <section class="col-xs-12" v-if="localForm.servicios.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold">Servicios básicos registrados</label>
            </header>
            <ServicioBasico
              v-for="(servicio, index) in localForm.servicios"
              :key="'servicio-' + index"
              :servicio="servicio"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Servicio # {{ index+1 }}</label>
              </template>
            </ServicioBasico>
          </section>
        </section>
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
import FormMixin from "../../../mixins/FormMixin";
import ServicioBasico from "../../../components/Form/ServicioBasico";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "antecetendes-serviciosBasicos-form",
      nextPage: {
        name: "espaciosVitalesDormitorios"
      },
      prevPage: {
        name: "viasAcceso"
      },
      newServicio: true, // Controls the New ServicioBasico input
      localForm: {
        servicios: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    /**
     * Puntaje 0 si no existe ningún servicio básico disponible
     * Puntaje 10 si existe al menos un servicio básico disponible
     */
    puntaje() {
      const serviciosDisponibles = this.localForm.servicios.length > 0;
      if (!serviciosDisponibles) {
        return 0;
      }
      return 10;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeServicios", this.puntaje);
      this.$router.push(this.nextPage);
    },
    showNewServicio() {
      this.newServicio = true;
    },
    onAddServicio(payload) {
      this.localForm.servicios.push(payload);
      this.newServicio = false;
    }
  },
  mixins: [FormMixin],
  components: {
    ServicioBasico,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
