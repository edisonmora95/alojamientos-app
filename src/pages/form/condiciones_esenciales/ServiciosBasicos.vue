<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="newServicio && !disableInputs">
          <section class="row">
            <header class="col-xs-12">
              <label>Nuevo servicio básico</label>
            </header>
            <ServicioBasico
              class="col-xs-12"
              :disable="disableInputs"
              :showAddBtn="true"
              v-on:addServicio="onAddServicio"
            ></ServicioBasico>
          </section>
        </section>
        <p
          class="text-positive cursor-pointer"
          @click="showNewServicio"
          v-if="!newServicio"
        >
          <q-icon name="add" />Añadir otro
        </p>
        <section class="col-xs-12" v-if="localForm.servicios.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold">Servicios básicos registrados</label>
            </header>
            <ServicioBasico
              v-for="(servicio, index) in localForm.servicios"
              :key="'servicio-' + index"
              :servicio="servicio"
              :disable="disableInputs"
              :showAddBtn="false"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Servicio # {{ index + 1 }}</label>
              </template>
            </ServicioBasico>
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
import ServicioBasico from "../../../components/Form/ServicioBasico";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
    // Si el formulario es de terrenos, se debe redirigir a la ventana de Espacios Vitales de terrenos, no la de infraestructuras que está por default
    if (this.form.tipo === 2) {
      this.nextPage = {
        name: "espaciosVitalesTerrenos"
      };
    }
  },
  data() {
    return {
      refForm: "antecetendes-serviciosBasicos-form",
      nextPage: {
        name: "espaciosVitalesDormitorios"
      },
      prevPage: {
        name: "viasAcceso"
      },
      newServicio: true, // Controls the New ServicioBasico input
      localForm: {
        servicios: []
      },
      serviciosBasicosMinimos: [
        "Abastecimiento de agua",
        "Alcantarillado",
        "Energía eléctrica"
      ]
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    /**
     * Puntaje 0 si no existe ningún servicio básico disponible
     * Puntaje 10 si existe al menos un servicio básico disponible
     */
    puntaje() {
      const servicios = this.localForm.servicios.map(
        servicio => servicio.tipoServicio
      );
      let apto = true;
      for (let i = 0; i < this.serviciosBasicosMinimos.length; i++) {
        if (!servicios.includes(this.serviciosBasicosMinimos[i])) {
          apto = false;
          break;
        }
      }
      if (!apto) {
        return 0;
      }
      return 10;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeServicios", this.puntaje);
      if (this.puntaje === 0) {
        this.$q
          .dialog({
            title: "No Apto",
            message:
              "La infraestructura no cuenta con los servicios básicos mínimos. ¿Desea continuar llenando los demás campos del formulario o concluir su trabajo?",
            cancel: "Continuar",
            ok: "Terminar",
            persistent: true
          })
          .onOk(() => {
            this.$store.commit("form/setCalificacionGeneral", "NO APTO");
            this.$router.push(this.failFormNextStep);
          })
          .onCancel(() => {
            this.$router.push(this.nextPage);
          });
      } else {
        this.$router.push(this.nextPage);
      }
    },
    showNewServicio() {
      this.newServicio = true;
    },
    onAddServicio(payload) {
      this.localForm.servicios.push(payload);
      this.newServicio = false;
    }
  },
  mixins: [FormMixin],
  components: {
    ServicioBasico,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
