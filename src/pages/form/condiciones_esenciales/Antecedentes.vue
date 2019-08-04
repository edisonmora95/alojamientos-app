<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="antecetendes-eventos-form">
      <section class="row q-col-gutter-md" v-if="localForm.eventos.length > 0">
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
      <section class="row q-col-gutter-md" v-if="newEvent">
        <header class="col-xs-12">
          <label>Nuevo evento</label>
        </header>
        <Evento
          class="col-xs-12"
          :showAddBtn="true"
          v-on:addEvent="onAddEvent"
        ></Evento>
      </section>
      <p class="text-positive cursor-pointer" @click="showNewEvent">
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
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      nextPage: {
        name: "anexos"
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
    Evento
  }
};
</script>
<style scoped>
</style>
