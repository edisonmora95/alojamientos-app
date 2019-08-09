<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="accesibilidad-form">
      <section class="col-xs-12">
        <q-select
          label="Seleccione la zona de arribo vehicular"
          v-model="localForm.zonaArriboVehicular"
          :options="zonasArriboVehicular"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-md-6">
        <q-select
          label="Seleccione el área de circulación desde la zona de arribo vehicular hasta la entrada principal"
          v-model="localForm.areaCirculacion"
          :options="areasCirculacion"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-12">
        <q-select
          label="¿Todos los espacios se comunican entre sí peatonalmente?"
          v-model="localForm.comunicacion"
          :options="trueFalseOptions"
          outlined
          emit-value
          map-options
        ></q-select>
      </section>
      <section class="col-xs-12">
        <q-select
          label="¿La superficie de circulación posee las siguientes características?"
          v-model="localForm.caracteristicas"
          :options="caracteristicas"
          outlined
          emit-value
          map-options
        ></q-select>
      </section>
      <section class="col-xs-12">
        <section class="row">
          <article class="col-xs-6">
            <label>Puntaje</label>
          </article>
          <article class="col-xs-6">
            <p class="text-right">{{ puntaje }}</p>
          </article>
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
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      prevPage: {
        name: "infraestructuraOtrosEspacios"
      },
      nextPage: {
        name: "recomendaciones"
      },
      localForm: {
        zonaArriboVehicular: "",
        areaCirculacion: "",
        comunicacion: false,
        caracteristicas: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    zonasArriboVehicular() {
      return ["Interior de la edificación", "Exterior de la edificación"];
    },
    areasCirculacion() {
      return ["Calle", "Acera", "Ambos"];
    },
    trueFalseOptions() {
      return [{ value: true, label: "Si" }, { value: false, label: "No" }];
    },
    caracteristicas() {
      return [
        { value: 1, label: "Característica 1" },
        { value: 2, label: "Característica 2" },
        { value: 3, label: "Característica 3" },
        { value: 4, label: "Característica 4" },
        { value: 5, label: "Característica 5" }
      ];
    },
    puntaje() {
      return 0;
    }
  },
  methods: {
    copyFormValues() {
      for (let key in this.localForm) {
        this.localForm[key] = this.form[key];
      }
    },
    prevStep() {
      this.updateForm();
      this.$router.push(this.prevPage);
    },
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    },
    updateForm() {
      const payload = this.localForm;
      this.$store.commit("form/updateForm", payload);
    }
  }
};
</script>
