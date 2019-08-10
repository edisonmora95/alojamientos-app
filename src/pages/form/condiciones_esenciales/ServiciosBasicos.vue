<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :ref="refForm">
      <section class="col-xs-12" v-if="localForm.servicios.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Servicios básicos registrados</label>
          </header>
          <ServicioBasico
            v-for="(servicio, index) in localForm.servicios"
            :key="'servicio-' + index"
            :servicio="servicio"
            class="col-xs-12"
          ></ServicioBasico>
        </section>
      </section>
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
