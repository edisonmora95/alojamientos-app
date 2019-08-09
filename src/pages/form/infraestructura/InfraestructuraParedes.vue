<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="infraestructura-paredes-form">
      <section class="col-xs-12" v-if="localForm.paredes.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Paredes registradas</label>
          </header>
          <Pared
            v-for="(pared, index) in localForm.paredes"
            :key="'pared-' + index"
            :pared="pared"
            class="col-xs-12"
          ></Pared>
        </section>
      </section>
      <section class="col-xs-12" v-if="newPared">
        <section class="row">
          <header class="col-xs-12">
            <label>Nueva pared</label>
          </header>
          <Pared
            class="col-xs-12"
            :isNewPared="true"
            v-on:addPared="onAddPared"
          ></Pared>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewPared"
        v-if="!newPared"
      >
        <q-icon name="add" />Anadir otra pared
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
import Pared from "../../../components/Form/Pared";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "infraestructuraPisos"
      },
      prevPage: {
        name: "medidasSeguridad"
      },
      newPared: true, // Controls the New Pared input
      localForm: {
        paredes: []
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
    showNewPared() {
      this.newPared = true;
    },
    onAddPared(payload) {
      this.localForm.paredes.push(payload);
      this.newPared = false;
    }
  },
  components: {
    Pared
  }
};
</script>
<style scoped></style>
