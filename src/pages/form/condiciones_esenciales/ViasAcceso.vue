<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="newVia">
          <section class="row">
            <header class="col-xs-12">
              <label>Nueva vía de acceso</label>
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
          <q-icon name="add" />Añadir otra
        </p>
        <section class="col-xs-12" v-if="localForm.vias.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold">Vías de acceso registrados</label>
            </header>
            <ViaAcceso
              v-for="(via, index) in localForm.vias"
              :key="'via-' + index"
              :via="via"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Vía # {{ index + 1 }}</label>
              </template>
            </ViaAcceso>
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
import ViaAcceso from "../../../components/Form/ViaAcceso";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "antecetendes-vias-form",
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
    /**
     * Puntaje 0 si no existe una vía de acceso disponible
     * Puntaje 10 si existe al menos una vía de acceso
     */
    puntaje() {
      const hayViasDisponibles = this.localForm.vias.length > 0;
      if (!hayViasDisponibles) {
        return 0;
      }
      return 10;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeViasAcceso", this.puntaje);
      if (this.localForm.vias.length === 0) {
        this.$q
          .dialog({
            title: "No Apto",
            message:
              "No existen vías de acceso en buen estado que permitan llegar con facilidad a las instalaciones del terreno. ¿Desea continuar llenando los demás campos del formulario o concluir su trabajo?",
            cancel: "Continuar",
            ok: "Terminar",
            persistent: true
          })
          .onOk(() => {
            this.$store.commit("form/setCalificacionGeneral", "NO APTO");
            this.$router.push({ name: "medidasSeguridad" });
          })
          .onCancel(() => {
            this.$router.push(this.nextPage);
          });
      } else {
        this.$router.push(this.nextPage);
      }
    },
    showNewVia() {
      this.newVia = true;
    },
    onAddVia(payload) {
      this.localForm.vias.push(payload);
      this.newVia = false;
    }
  },
  mixins: [FormMixin],
  components: {
    ViaAcceso,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
