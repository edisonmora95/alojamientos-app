<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="antecetendes-espacios-vitales-form">
      <section class="col-xs-12"  v-if="localForm.dormitorios.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Dormitorios registrados</label>
          </header>
          <Dormitorio
            v-for="(dormitorio, index) in localForm.dormitorios"
            :key="'dormitorio-' + index"
            :dormitorio="dormitorio"
            class="col-xs-12"
          ></Dormitorio>
        </section>
      </section>
      <section class="col-xs-12" v-if="newDormitorio">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo dormitorio</label>
          </header>
          <Dormitorio
            class="col-xs-12"
            :isNewDormitorio="true"
            v-on:addDormitorio="onAddDormitorio"
          ></Dormitorio>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewDormitorio"
        v-if="!newDormitorio"
      >
        <q-icon name="add" />Anadir otro dormitorio
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
import Dormitorio from "../../../components/Form/Dormitorio";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "espaciosVitalesBanos"
      },
      prevPage: {
        name: "serviciosBasicos"
      },
      newDormitorio: true, // Controls the New Dormitorio input
      localForm: {
        dormitorios: [],
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    puntaje() {
      const hayDormitoriosDisponibles = (this.localForm.dormitorios.length > 0);
      if (!hayDormitoriosDisponibles) {
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
    showNewDormitorio() {
      this.newDormitorio = true;
    },
    onAddDormitorio(payload) {
      this.localForm.dormitorios.push(payload);
      this.newDormitorio = false;
    }
  },
  components: {
    Dormitorio,
  }
};
</script>
<style scoped>
</style>
