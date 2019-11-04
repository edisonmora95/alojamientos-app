<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-12" v-if="newPiso && !disableInputs">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo piso</label>
          </header>
          <Piso
            class="col-xs-12"
            :disable="disableInputs"
            :showAddBtn="true"
            v-on:addPiso="onAddPiso"
          ></Piso>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewPiso"
        v-if="!newPiso"
      >
        <q-icon name="add" />Añadir otro piso
      </p>
      <section class="col-xs-12" v-if="localForm.pisos.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Pisos registrados</label>
          </header>
          <Piso
            v-for="(piso, index) in localForm.pisos"
            :key="'piso-' + index"
            :piso="piso"
            :disable="disableInputs"
            :showAddBtn="false"
            class="col-xs-12"
          ></Piso>
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
import FormMixin from "../../../mixins/FormMixin";
import Piso from "../../../components/Form/Piso";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "infraestructura-pisos-form",
      nextPage: {
        name: "infraestructuraTechos"
      },
      prevPage: {
        name: "infraestructuraParedes"
      },
      newPiso: true, // Controls the New Piso input
      localForm: {
        pisos: []
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
    showNewPiso() {
      this.newPiso = true;
    },
    onAddPiso(payload) {
      this.localForm.pisos.push(payload);
      this.newPiso = false;
    }
  },
  mixins: [FormMixin],
  components: {
    Piso
  }
};
</script>
<style scoped></style>
