<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="infraestructura-ingresosSalidas-form">
      <section class="col-xs-12"  v-if="localForm.ingresosSalidas.length > 0">
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
        <q-icon name="add" />Anadir otro ingreso/salida
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
import IngresoSalida from "../../../components/Form/IngresoSalida";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "infraestructuraOtrosEspacios"
      },
      prevPage: {
        name: "infraestructuraTechos"
      },
      newIngresoSalida: true, // Controls the New IngresoSalida input
      localForm: {
        ingresosSalidas: [],
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
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
    showNewIngresoSalida() {
      this.newIngresoSalida = true;
    },
    onAddIngresoSalida(payload) {
      this.localForm.ingresosSalidas.push(payload);
      this.newIngresoSalida = false;
    }
  },
  components: {
    IngresoSalida,
  }
};
</script>
<style scoped>
</style>
