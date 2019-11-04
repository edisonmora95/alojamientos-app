<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :no-error-focus="true" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="newOtroEspacio && !disableInputs">
          <section class="row">
            <header class="col-xs-12">
              <label>Nuevo espacio</label>
            </header>
            <OtroEspacio
              class="col-xs-12"
              :disable="disableInputs"
              :showAddBtn="true"
              v-on:addOtroEspacio="onAddOtroEspacio"
            ></OtroEspacio>
          </section>
        </section>
        <p
          class="text-positive cursor-pointer"
          @click="showNewOtroEspacio"
          v-if="!newOtroEspacio"
        >
          <q-icon name="add" />Añadir otro espacio
        </p>
        <section class="col-xs-12" v-if="localForm.otrosEspacios.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label>Espacios registrados</label>
            </header>
            <OtroEspacio
              v-for="(otroEspacio, index) in localForm.otrosEspacios"
              :key="'otroEspacio-' + index"
              :otroEspacio="otroEspacio"
              :disable="disableInputs"
              :showAddBtn="false"
              class="col-xs-12"
            ></OtroEspacio>
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
import OtroEspacio from "../../../components/Form/OtroEspacio";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "infraestructura-otros-espacios-form",
      nextPage: {
        name: "accesibilidad"
      },
      prevPage: {
        name: "infraestructuraIngresosSalidas"
      },
      newOtroEspacio: true, // Controls the New OtroEspacio input
      localForm: {
        otrosEspacios: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    puntaje() {
      const paredes = this.form.paredes.find(pared => pared.estado === "Bueno");
      const puntajeParedes = paredes != null ? 2 : 0;

      const techos = this.form.techos.find(techo => techo.estado === "Bueno");
      const puntajeTechos = techos != null ? 2 : 0;

      const pisos = this.form.pisos.find(piso => piso.estado === "Bueno");
      const puntajePisos = pisos != null ? 2 : 0;

      const ingresosSalidas = this.form.ingresosSalidas.reduce(
        (a, b) => a + b.puntaje,
        0
      );

      const otrosEspacios = this.localForm.otrosEspacios.filter(
        espacio => espacio.estado == "Bueno"
      );
      const puntajeOtrosEspacios = otrosEspacios.length * 0.583;

      const total =
        puntajeParedes +
        puntajeTechos +
        puntajePisos +
        ingresosSalidas +
        puntajeOtrosEspacios;
      return Math.round(total * 100) / 100;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeInfraestructura", this.puntaje);
      this.$router.push(this.nextPage);
    },
    showNewOtroEspacio() {
      this.newOtroEspacio = true;
    },
    onAddOtroEspacio(payload) {
      this.localForm.otrosEspacios.push(payload);
      this.newOtroEspacio = false;
    }
  },
  mixins: [FormMixin],
  components: {
    OtroEspacio,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
