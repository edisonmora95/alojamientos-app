<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-12" v-if="localForm.otrosEspacios.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Espacios registrados</label>
          </header>
          <OtroEspacio
            v-for="(otroEspacio, index) in localForm.otrosEspacios"
            :key="'otroEspacio-' + index"
            :otroEspacio="otroEspacio"
            class="col-xs-12"
          ></OtroEspacio>
        </section>
      </section>
      <section class="col-xs-12" v-if="newOtroEspacio">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo espacio</label>
          </header>
          <OtroEspacio
            class="col-xs-12"
            :isNewEspacio="true"
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
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
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
    OtroEspacio
  }
};
</script>
<style scoped></style>
