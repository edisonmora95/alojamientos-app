<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="antecetendes-eventos-form">
      <section class="col-xs-12" v-if="localForm.eventos.length > 0">
        <section class="row">
          <header class="col-xs-12">
            <label>Eventos registrados</label>
          </header>
          <Evento
            v-for="(evento, index) in localForm.eventos"
            :key="'evento-' + index"
            :evento="evento"
            class="col-xs-12"
          ></Evento>
        </section>
      </section>
      <section class="col-xs-12" v-if="newEvent">
        <section class="row">
          <header class="col-xs-12">
            <label>Nuevo evento</label>
          </header>
          <Evento
            class="col-xs-12"
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
        <q-icon name="add" />Anadir otro
      </p>
      <section class="col-xs-12">
        <q-select
          label="Utilizada anteriormente como alojamiento"
          v-model="localForm.previoUso"
          :options="trueFalseOptions"
          outlined
          emit-value
          map-options
        ></q-select>
      </section>
      <section v-if="localForm.previoUso == true" class="col-xs-12">
        <q-input
          outlined
          label="Anio de uso"
          v-model="localForm.anioUso"
          mask="####"
        ></q-input>
      </section>
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
import Evento from "../../../components/Form/Evento";
import PuntajeSeccion from "../../../components/Form/PuntajeSeccion";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "riesgo"
      },
      prevPage: {
        name: "infraestructura"
      },
      newEvent: true, // Controls the New Event input
      localForm: {
        eventos: [],
        previoUso: false,
        anioUso: ""
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    trueFalseOptions() {
      return [
        { value: true, label: "Si" },
        { value: false, label: "No" },
      ]
    },
    puntaje() {
      const danos = this.localForm.eventos.find((evento) => evento.danos && evento.tipoDanos != "");
      if (danos) {
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
    showNewEvent() {
      this.newEvent = true;
    },
    onAddEvent(payload) {
      this.localForm.eventos.push(payload);
      this.newEvent = false;
    }
  },
  components: {
    Evento,
    PuntajeSeccion
  }
};
</script>
<style scoped>
</style>
