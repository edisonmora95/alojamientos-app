<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="antecetendes-vias-form">
      <section class="col-xs-12" v-if="localForm.vias.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Vias de acceso registrados</label>
          </header>
          <ViaAcceso
            v-for="(via, index) in localForm.vias"
            :key="'via-' + index"
            :via="via"
            class="col-xs-12"
          ></ViaAcceso>
        </section>
      </section>
      <section class="col-xs-12" v-if="newVia">
        <section class="row">
          <header class="col-xs-12">
            <label>Nueva via de acceso</label>
          </header>
          <ViaAcceso
            class="col-xs-12"
            :isNewVia="true"
            v-on:addVia="onAddVia"
          ></ViaAcceso>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewVia"
        v-if="!newVia"
      >
        <q-icon name="add" />Anadir otra
      </p>
      <section class="col-xs-12">
        <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
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
import ViaAcceso from "../../../components/Form/ViaAcceso";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "serviciosBasicos"
      },
      prevPage: {
        name: "riesgo"
      },
      newVia: true, // Controls the New ViaAcceso input
      localForm: {
        vias: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    puntaje() {
      const hayViasDisponibles = this.localForm.vias.length > 0;
      if (!hayViasDisponibles) {
        return 0;
      }
      return 10;
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
    showNewVia() {
      this.newVia = true;
    },
    onAddVia(payload) {
      this.localForm.vias.push(payload);
      this.newVia = false;
    }
  },
  components: {
    ViaAcceso,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
