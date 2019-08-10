<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-12" v-if="localForm.ingresosSalidas.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Ingresos/Salidas registrados</label>
          </header>
          <IngresoSalida
            v-for="(ingresoSalida, index) in localForm.ingresosSalidas"
            :key="'ingresoSalida-' + index"
            :ingresoSalida="ingresoSalida"
            class="col-xs-12"
          ></IngresoSalida>
        </section>
      </section>
      <section class="col-xs-12" v-if="newIngresoSalida">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo ingreso/salida</label>
          </header>
          <IngresoSalida
            class="col-xs-12"
            :isNewIngresoSalida="true"
            v-on:addIngresoSalida="onAddIngresoSalida"
          ></IngresoSalida>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewIngresoSalida"
        v-if="!newIngresoSalida"
      >
        <q-icon name="add" />Añadir otro ingreso/salida
      </p>
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
import IngresoSalida from "../../../components/Form/IngresoSalida";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "infraestructura-ingresos-salidas-form",
      nextPage: {
        name: "infraestructuraOtrosEspacios"
      },
      prevPage: {
        name: "infraestructuraTechos"
      },
      newIngresoSalida: true, // Controls the New IngresoSalida input
      localForm: {
        ingresosSalidas: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    },
    showNewIngresoSalida() {
      this.newIngresoSalida = true;
    },
    onAddIngresoSalida(payload) {
      this.localForm.ingresosSalidas.push(payload);
      this.newIngresoSalida = false;
    }
  },
  mixins: [FormMixin],
  components: {
    IngresoSalida
  }
};
</script>
<style scoped></style>
