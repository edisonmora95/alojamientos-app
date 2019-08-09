<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Tipo de amenaza"
          v-model="tipoAmenaza"
          :options="tiposAmenaza"
          :disable="!isNewAmenaza"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Nivel de recurrencia"
          v-model="nivelRecurrencia"
          :options="nivelesRecurrencia"
          :disable="!isNewAmenaza"
          outlined
          emit-value
          map-options
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewAmenaza">
        <q-btn color="primary" :disable="btnDisabled" @click="addAmenaza"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewAmenaza: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar una nueva amenaza o para mostrar una amenaza ya ingresada"
    },
    amenaza: {
      required: false,
      default: function() {
        return {
          tipoAmenaza: "",
          nivelRecurrencia: ""
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      tipoAmenaza: "",
      nivelRecurrencia: "",

      tiposAmenaza: [
        "Ninguno",
        "Movimiento en masa",
        "Inundacion",
        "Incendio Forestal",
        "Erupcion Volcanica",
        "Tsunami",
        "Cambio Climatico",
        "Deficit hidrico",
        "Sequia",
        "Oleajes"
      ],
      nivelesRecurrencia: ["Alto", "Medio", "Bajo"]
    };
  },
  computed: {
    btnDisabled() {
      return this.tipoAmenaza == "" || this.nivelRecurrencia == "";
    }
  },
  methods: {
    addAmenaza() {
      const payload = {
        tipoAmenaza: this.tipoAmenaza,
        nivelRecurrencia: this.nivelRecurrencia
      };
      this.$emit("addAmenaza", payload);
      this.clearEvent();
    },
    clearEvent() {
      this.tipoAmenaza = "";
      this.nivelRecurrencia = "";
    },
    copyPropValues() {
      this.tipoAmenaza = this.amenaza.tipoAmenaza;
      this.nivelRecurrencia = this.amenaza.nivelRecurrencia;
    }
  }
};
</script>
