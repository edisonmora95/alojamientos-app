<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
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
        <section class="col-xs-12" v-if="localForm.amenazas.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold">Amenazas registradas</label>
            </header>
            <Amenaza
              v-for="(amenaza, index) in localForm.amenazas"
              :key="'amenaza-' + index"
              :amenaza="amenaza"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Amenaza # {{ index + 1 }}</label>
              </template>
            </Amenaza>
          </section>
        </section>
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
    /**
     * Puntaje 0 si al menos una amenaza tiene un alto nivel de recurrencia
     * Puntaje 10 si ninguna amenaza tiene un alto nivel de recurrencia
     */
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
      this.setPuntajeSeccion("puntajeRiesgos", this.puntaje);
      this.$router.push(this.nextPage);
    },
    showNewAmenaza() {
      this.newAmenaza = true;
    },
    onAddAmenaza(payload) {
      this.localForm.amenazas.push(payload);
      this.newAmenaza = false;
      if (payload.nivelRecurrencia === "Alto") {
        this.$q
          .dialog({
            title: "No Apto",
            message:
              "La infraestructura no se encuentra en un lugar seguro. ¿Desea continuar llenando los demás campos del formulario o concluir su trabajo?",
            cancel: "Continuar",
            ok: "Terminar",
            persistent: true
          })
          .onOk(() => {
            this.$store.commit("form/setCalificacionGeneral", "NO APTO");
            this.$router.push({ name: "recomendaciones" });
          });
      }
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
