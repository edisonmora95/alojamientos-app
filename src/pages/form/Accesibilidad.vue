<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-12">
        <q-select
          label="Seleccione la zona de arribo vehicular"
          v-model="localForm.zonaArriboVehicular"
          :options="zonasArriboVehicular"
          :rules="[validaciones.required]"
          :disable="disableInputs"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-md-6">
        <q-select
          label="Seleccione el área de circulación desde la zona de arribo vehicular hasta la entrada principal"
          v-model="localForm.areaCirculacion"
          :options="areasCirculacion"
          :rules="[validaciones.required]"
          :disable="disableInputs"
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
          :rules="[validaciones.required]"
          :disable="disableInputs"
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
          :rules="[validaciones.required]"
          :disable="disableInputs"
          multiple
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
import FormMixin from "../../mixins/FormMixin";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "accesibilidad-form",
      prevPage: {
        name: "infraestructuraOtrosEspacios"
      },
      nextPage: {
        name: "anexos"
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
      return this.$store.getters["app/caracteristicasCirculacion"];
    },
    puntaje() {
      const puntajeZonaArribo =
        this.localForm.zonaArriboVehicular == this.zonasArriboVehicular[0]
          ? 3
          : 0;
      let puntajeAreasCirculacion = 0;
      if (
        this.localForm.areaCirculacion === this.areasCirculacion[0] ||
        this.localForm.areaCirculacion === this.areasCirculacion[1]
      ) {
        puntajeAreasCirculacion = 3;
      } else if (this.localForm.areaCirculacion === this.areasCirculacion[2]) {
        puntajeAreasCirculacion = 6;
      }

      const puntajeComunicacion = this.localForm.comunicacion ? 3 : 0;
      const puntajeCaracteristicas = this.localForm.caracteristicas.length;
      return (
        puntajeZonaArribo +
        puntajeAreasCirculacion +
        puntajeComunicacion +
        puntajeCaracteristicas
      );
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  mixins: [FormMixin],
  methods: {
    async nextStep() {
      const isFormValid = await this.beforeSubmit();
      if (isFormValid) {
        this.updateForm();
        this.setPuntajeSeccion("puntajeAccesibilidad", this.puntaje);
        this.$router.push(this.nextPage);
      }
    }
  }
};
</script>
