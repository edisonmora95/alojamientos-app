<template>
  <q-page>
    <header>
      <PuntajeSeccion :puntaje="puntaje"></PuntajeSeccion>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="newEvent && !disableInputs">
          <section class="row">
            <header class="col-xs-12">
              <label>Nuevo evento</label>
            </header>
            <Evento
              class="col-xs-12"
              :disable="disableInputs"
              :showAddBtn="true"
              v-on:addEvent="onAddEvent"
            ></Evento>
          </section>
        </section>
        <p
          class="text-positive cursor-pointer"
          @click="showNewEvent"
          v-if="!newEvent"
        >
          <q-icon name="add" />Añadir otro
        </p>
        <section class="col-xs-12" v-if="localForm.eventos.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold">Eventos registrados</label>
            </header>
            <Evento
              v-for="(evento, index) in localForm.eventos"
              :key="'evento-' + index"
              :evento="evento"
              :disable="disableInputs"
              :showAddBtn="false"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Evento # {{ index + 1 }}</label>
              </template>
            </Evento>
          </section>
        </section>
        <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
          <q-select
            :disable="disableInputs"
            label="¿Fue utilizada anteriormente como alojamiento?"
            v-model="localForm.usoPrevio"
            :options="trueFalseOptions"
            outlined
            emit-value
            map-options
          ></q-select>
        </section>
        <section
          v-if="localForm.usoPrevio == true"
          class="col-xs-12 col-sm-6 q-my-sm q-px-sm"
        >
          <q-input
            :disable="disableInputs"
            type="number"
            outlined
            label="Año de uso"
            v-model="localForm.anioUso"
            mask="####"
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
import FormMixin from "../../../mixins/FormMixin";
import Evento from "../../../components/Form/Evento";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "antecetendes-eventos-form",
      nextPage: {
        name: "riesgo"
      },
      prevPage: {
        name: "infraestructura"
      },
      newEvent: true, // Controls the New Event input
      localForm: {
        eventos: [],
        usoPrevio: false,
        anioUso: ""
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    trueFalseOptions() {
      return [{ value: true, label: "Si" }, { value: false, label: "No" }];
    },
    /**
     * Puntaje 0 si al menos 1 evento dejó daños
     * Puntaje 10 si ningún evento dejó daños
     */
    puntaje() {
      const danos = this.localForm.eventos.find(
        evento => evento.danos && evento.tipoDanos != ""
      );
      if (danos) {
        return 0;
      }
      return 10;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.setPuntajeSeccion("puntajeAntecedentes", this.puntaje);
      this.$router.push(this.nextPage);
    },
    showNewEvent() {
      this.newEvent = true;
    },
    onAddEvent(payload) {
      this.localForm.eventos.push(payload);
      this.newEvent = false;
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
            this.$router.push(this.failFormNextStep);
          });
      }
    }
  },
  mixins: [FormMixin],
  components: {
    Evento,
    PuntajeSeccion
  }
};
</script>
<style scoped></style>
