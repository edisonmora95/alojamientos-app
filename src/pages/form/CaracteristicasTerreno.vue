<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="newSuelo && !disableInputs">
          <section class="row">
            <header class="col-xs-12">
              <label>Nuevo suelo</label>
            </header>
            <Suelo
              class="col-xs-12"
              :disable="disableInputs"
              :showAddBtn="true"
              v-on:addSuelo="onAddSuelo"
            ></Suelo>
          </section>
        </section>
        <p
          class="text-positive cursor-pointer"
          @click="showNewSuelo"
          v-if="!newSuelo"
        >
          <q-icon name="add" />Añadir otro
        </p>
        <section class="col-xs-12" v-if="localForm.suelos.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold">Suelos registrados</label>
            </header>
            <Suelo
              v-for="(suelo, index) in localForm.suelos"
              :key="'suelo-' + index"
              :suelo="suelo"
              :disable="disableInputs"
              :showAddBtn="false"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Suelo # {{ index + 1 }}</label>
              </template>
            </Suelo>
          </section>
        </section>
        <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
          <q-select
            label="Seleccione el nivel del terreno"
            v-model="localForm.nivelTerreno"
            :options="nivelesTerreno"
            outlined
          ></q-select>
        </section>
        <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
          <q-input
            label="Observación"
            outlined
            v-model="localForm.observacionNivel"
            counter
            maxlength="255"
          ></q-input>
        </section>
        <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
          <q-input
            type="number"
            label="Pendiente de inclinación"
            outlined
            v-model="localForm.pendienteInclinacion"
          ></q-input>
        </section>
        <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
          <q-input
            label="Observación"
            outlined
            v-model="localForm.observacionPendiente"
            counter
            maxlength="255"
          ></q-input>
        </section>
      </main>
      <footer class="row">
        <main class="col-xs-12 q-my-md">
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
        </main>
      </footer>
    </q-form>
  </q-page>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import Suelo from "../../components/Form/Suelo";
import PuntajeSeccion from "../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "antecetendes-suelos-form",
      nextPage: {
        name: "medidasSeguridad"
      },
      prevPage: {
        name: "espaciosVitalesTerrenos"
      },
      newSuelo: true, // Controls the New Event input
      localForm: {
        suelos: [],
        nivelTerreno: "",
        observacionNivel: "",
        pendienteInclinacion: 0,
        observacionPendiente: ""
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    /**
     * Puntaje 0 si al menos 1 suelo dejó daños
     * Puntaje 10 si ningún suelo dejó daños
     */
    puntaje() {
      const suelosNoAptos = [
        "Inundable",
        "Ciénaga",
        "Húmedo",
        "Blando",
        "Relleno"
      ];
      const noAptoTipoSuelo = this.localForm.suelos.find(suelo => {
        return suelosNoAptos.includes(suelo.tipoSuelo);
      });
      const noAptoInclinacion =
        this.localForm.pendienteInclinacion < 2 ||
        this.localForm.pendienteInclinacion > 10;
      const nivelesNoAptos = ["Bajo nivel calzada", "Otros"];
      const noAptoNivelTerreno = nivelesNoAptos.includes(
        this.localForm.nivelTerreno
      );
      if (noAptoTipoSuelo || noAptoInclinacion || noAptoNivelTerreno) {
        return 0;
      } else {
        return 10;
      }
    },
    nivelesTerreno() {
      return [
        "A nivel",
        "Terreno plano",
        "Sobre nivel calzada",
        "Bajo nivel calzada",
        "Otros"
      ];
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeCaracteristicasTerreno", this.puntaje);
      this.$router.push(this.nextPage);
    },
    showNewSuelo() {
      this.newSuelo = true;
    },
    onAddSuelo(payload) {
      this.localForm.suelos.push(payload);
      this.newSuelo = false;
      if (payload.danos && payload.tipoDanos !== "") {
        this.$q
          .dialog({
            title: "No Apto",
            message:
              "La infraestructura se considera como NO APTO para funcionar como campamento temporal. ¿Desea continuar llenando los demás campos del formulario o concluir su trabajo?",
            cancel: "Continuar",
            ok: "Terminar",
            persistent: true
          })
          .onOk(() => {
            this.$store.commit("form/setCalificacionGeneral", "NO APTO");
            this.$router.push({ name: "medidasSeguridad" });
          });
      }
    }
  },
  mixins: [FormMixin],
  components: {
    Suelo,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
