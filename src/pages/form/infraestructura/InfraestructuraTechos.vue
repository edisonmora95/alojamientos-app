<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-12" v-if="newTecho && !disableInputs">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo techo</label>
          </header>
          <Techo
            class="col-xs-12"
            :disable="disableInputs"
            :showAddBtn="true"
            v-on:addTecho="onAddTecho"
          ></Techo>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewTecho"
        v-if="!newTecho"
      >
        <q-icon name="add" />Añadir otro techo
      </p>
      <section class="col-xs-12" v-if="localForm.techos.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Techos registrados</label>
          </header>
          <Techo
            v-for="(techo, index) in localForm.techos"
            :key="'techo-' + index"
            :techo="techo"
            :disable="disableInputs"
            :showAddBtn="false"
            class="col-xs-12"
          ></Techo>
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
import Techo from "../../../components/Form/Techo";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "infraestructura-techos-form",
      nextPage: {
        name: "infraestructuraIngresosSalidas"
      },
      prevPage: {
        name: "infraestructuraPisos"
      },
      newTecho: true, // Controls the New Techo input
      localForm: {
        techos: []
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
    showNewTecho() {
      this.newTecho = true;
    },
    onAddTecho(payload) {
      this.localForm.techos.push(payload);
      this.newTecho = false;
    }
  },
  mixins: [FormMixin],
  components: {
    Techo
  }
};
</script>
<style scoped></style>
