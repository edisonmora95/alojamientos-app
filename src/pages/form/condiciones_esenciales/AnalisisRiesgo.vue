<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :ref="refForm">
      <section class="col-xs-12" v-if="localForm.amenazas.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Amenazas registradas</label>
          </header>
          <Amenaza
            v-for="(amenaza, index) in localForm.amenazas"
            :key="'amenaza-' + index"
            :amenaza="amenaza"
            class="col-xs-12"
          ></Amenaza>
        </section>
      </section>
      <section class="col-xs-12" v-if="newAmenaza">
        <section class="row">
          <header class="col-xs-12">
            <label>Nueva amenaza</label>
          </header>
          <Amenaza
            class="col-xs-12"
            :isNewAmenaza="true"
            v-on:addAmenaza="onAddAmenaza"
          ></Amenaza>
        </section>
      </section>
      <p
        class="text-positive cursor-pointer"
        @click="showNewAmenaza"
        v-if="!newAmenaza"
      >
        <q-icon name="add" />Añadir otra
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
import FormMixin from "../../../mixins/FormMixin";
import Amenaza from "../../../components/Form/Amenaza";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "antecetendes-amenazas-form",
      nextPage: {
        name: "viasAcceso"
      },
      prevPage: {
        name: "antecedentesEventos"
      },
      newAmenaza: true, // Controls the New Amenaza input
      localForm: {
        amenazas: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    puntaje() {
      const recurrenciaAlta = this.localForm.amenazas.find(
        amenaza => amenaza.nivelRecurrencia == "Alto"
      );
      if (recurrenciaAlta) {
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
    showNewAmenaza() {
      this.newAmenaza = true;
    },
    onAddAmenaza(payload) {
      this.localForm.amenazas.push(payload);
      this.newAmenaza = false;
    }
  },
  mixins: [FormMixin],
  components: {
    Amenaza,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
