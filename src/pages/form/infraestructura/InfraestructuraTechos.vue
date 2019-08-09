<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="infraestructura-techos-form">
      <section class="col-xs-12" v-if="localForm.techos.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Techos registrados</label>
          </header>
          <Techo
            v-for="(techo, index) in localForm.techos"
            :key="'techo-' + index"
            :techo="techo"
            class="col-xs-12"
          ></Techo>
        </section>
      </section>
      <section class="col-xs-12" v-if="newTecho">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo techo</label>
          </header>
          <Techo
            class="col-xs-12"
            :isNewTecho="true"
            v-on:addTecho="onAddTecho"
          ></Techo>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewTecho"
        v-if="!newTecho"
      >
        <q-icon name="add" />Anadir otro techo
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
import Techo from "../../../components/Form/Techo";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
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
    showNewTecho() {
      this.newTecho = true;
    },
    onAddTecho(payload) {
      this.localForm.techos.push(payload);
      this.newTecho = false;
    }
  },
  components: {
    Techo
  }
};
</script>
<style scoped></style>
