<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :ref="refForm">
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
        <q-icon name="add" />Añadir otro dormitorio
      </p>
      <section class="col-xs-12" v-if="localForm.dormitorios.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label class="text-bold">Dormitorios registrados</label>
          </header>
          <Dormitorio
            v-for="(dormitorio, index) in localForm.dormitorios"
            :key="'dormitorio-' + index"
            :dormitorio="dormitorio"
            class="col-xs-12"
          >
            <template slot="header">
                <label> Dormitorio # {{ index+1 }}</label>
              </template>
          </Dormitorio>
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
import Dormitorio from "../../../components/Form/Dormitorio";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "espacios-vitales-dormitorios-form",
      nextPage: {
        name: "espaciosVitalesBanos"
      },
      prevPage: {
        name: "serviciosBasicos"
      },
      newDormitorio: true, // Controls the New Dormitorio input
      localForm: {
        dormitorios: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    puntaje() {
      const hayDormitoriosDisponibles = this.localForm.dormitorios.length > 0;
      if (!hayDormitoriosDisponibles) {
        return 0;
      }
      return 10;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    },
    showNewDormitorio() {
      this.newDormitorio = true;
    },
    onAddDormitorio(payload) {
      this.localForm.dormitorios.push(payload);
      this.newDormitorio = false;
    }
  },
  mixins: [FormMixin],
  components: {
    Dormitorio
  }
};
</script>
<style scoped></style>
