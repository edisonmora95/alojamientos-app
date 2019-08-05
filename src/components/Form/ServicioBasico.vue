<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Tipo de servicio"
          v-model="tipoServicio"
          :options="tiposServicio"
          :disable="!isNewServicio"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado"
          v-model="estado"
          :options="estados"
          :disable="!isNewServicio"
          outlined
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewServicio">
        <q-btn
          color="primary"
          :disable="btnDisabled"
          @click="addServicio"
        >Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewServicio: {
      type: Boolean,
      default: false,
      description: "Indica si el componente se esta usando para ingresar un nuevo servicio o para mostrar un servicio ya ingresado"
    },
    servicio: {
      required: false,
      default: function() {
        return {
          tipoServicio: "",
          estado: ""
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      tipoServicio: "",
      estado: "",

      tiposServicio: [
        "Abastecimiento de agua",
        "Tanques de agua",
        "Alcantarillado",
        "Drenaje de aguas lluvia",
        "Manejo de residuos solidos",
        "Energia electrica",
        "Servicio telefonico",
        "Senal de television",
        "Senal de celular",
        "Senal de radio"
      ],
      estados: [
        "Bueno",
        "Malo"
      ]
    };
  },
  computed: {
    btnDisabled() {
      return (
        this.tipoServicio == "" ||
        this.estado == ""
      );
    }
  },
  methods: {
    addServicio() {
      const payload = {
        tipoServicio: this.tipoServicio,
        estado: this.estado
      };
      this.$emit("addServicio", payload);
      this.clearForm();
    },
    clearForm() {
      this.tipoServicio = "";
      this.estado = ""
    },
    copyPropValues() {
      this.tipoServicio = this.servicio.tipoServicio;
      this.estado = this.servicio.estado;
    }
  }
};
</script>
