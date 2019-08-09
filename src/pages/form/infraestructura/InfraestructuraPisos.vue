<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="infraestructura-pisos-form">
      <section class="col-xs-12" v-if="localForm.pisos.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Pisos registradas</label>
          </header>
          <Piso
            v-for="(piso, index) in localForm.pisos"
            :key="'piso-' + index"
            :piso="piso"
            class="col-xs-12"
          ></Piso>
        </section>
      </section>
      <section class="col-xs-12" v-if="newPiso">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo piso</label>
          </header>
          <Piso
            class="col-xs-12"
            :isNewPiso="true"
            v-on:addPiso="onAddPiso"
          ></Piso>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewPiso"
        v-if="!newPiso"
      >
        <q-icon name="add" />Anadir otro piso
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
import Piso from "../../../components/Form/Piso";
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
    showNewPiso() {
      this.newPiso = true;
    },
    onAddPiso(payload) {
      this.localForm.pisos.push(payload);
      this.newPiso = false;
    }
  },
  components: {
    Piso
  }
};
</script>
<style scoped></style>
