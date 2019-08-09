<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="infraestructura-otrosEspacios-form">
      <section class="col-xs-12"  v-if="localForm.otrosEspacios.length > 0">
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
        <q-icon name="add" />Anadir otro espacio
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
import OtroEspacio from "../../../components/Form/OtroEspacio";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "infraestructuraTechos"
      },
      prevPage: {
        name: "infraestructuraIngresosSalidas"
      },
      newOtroEspacio: true, // Controls the New OtroEspacio input
      localForm: {
        otrosEspacios: [],
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
    showNewOtroEspacio() {
      this.newOtroEspacio = true;
    },
    onAddOtroEspacio(payload) {
      this.localForm.otrosEspacios.push(payload);
      this.newOtroEspacio = false;
    }
  },
  components: {
    OtroEspacio,
  }
};
</script>
<style scoped>
</style>
