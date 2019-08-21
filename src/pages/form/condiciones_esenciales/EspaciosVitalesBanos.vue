<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="localForm.banos.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label>Baños registrados</label>
            </header>
            <Bano
              v-for="(bano, index) in localForm.banos"
              :key="'bano-' + index"
              :bano="bano"
              class="col-xs-12"
            ></Bano>
          </section>
        </section>
        <section class="col-xs-12" v-if="newBano">
          <section class="row">
            <header class="col-xs-12">
              <label>Nuevo baño</label>
            </header>
            <Bano
              class="col-xs-12"
              :isNewBano="true"
              v-on:addBano="onAddBano"
            ></Bano>
          </section>
        </section>
        <p
          class="text-positive cursor-pointer"
          @click="showNewBano"
          v-if="!newBano"
        >
          <q-icon name="add" />Añadir otro baño
        </p>
      </main>
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
import Bano from "../../../components/Form/Bano";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "espacios-vitales-banos-form",
      nextPage: {
        name: "medidasSeguridad"
      },
      prevPage: {
        name: "espaciosVitalesDormitorios"
      },
      newBano: true, // Controls the New Bano input
      localForm: {
        banos: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    /**
     * Puntaje 10 si hay al menos 1 baño disponible y 1 dormitorio disponible
     */
    puntaje() {
      const hayBanosDisponibles = this.localForm.banos.length > 0;
      const hayDormitoriosDisponibles = this.form.dormitorios.length > 0;
      if (!hayBanosDisponibles || !hayDormitoriosDisponibles) {
        return 0;
      }
      return 10;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeEspacios", this.puntaje);
      this.$router.push(this.nextPage);
    },
    showNewBano() {
      this.newBano = true;
    },
    onAddBano(payload) {
      this.localForm.banos.push(payload);
      this.newBano = false;
    }
  },
  mixins: [FormMixin],
  components: {
    Bano,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
