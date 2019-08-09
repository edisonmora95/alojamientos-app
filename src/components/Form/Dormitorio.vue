<template>
  <div>
    <main class="row">
      <section class="col-xs-8 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Tipo de espacio"
          v-model="tipoEspacio"
          :options="tiposEspacio"
          :disable="!isNewDormitorio"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-4 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Cantidad"
          type="number"
          v-model.number="cantidad"
          :disable="!isNewDormitorio"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del espacio"
          v-model="estado"
          :options="estados"
          :disable="!isNewDormitorio"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Accesible para personas con discapacidad"
          v-model="accesible"
          :options="trueFalseOptions"
          :disable="!isNewDormitorio"
          emit-value
          map-options
          outlined
        ></q-select>
      </section>
      <section class="col-xs-4 q-my-sm q-px-sm">
        <q-input
          label="Ancho"
          type="number"
          v-model.number="ancho"
          :disable="!isNewDormitorio"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-4 q-my-sm q-px-sm">
        <q-input
          label="Largo"
          type="number"
          v-model.number="largo"
          :disable="!isNewDormitorio"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-4 q-my-sm q-px-sm">
        <q-input
          label="Total m2"
          type="number"
          v-model.number="totalm2"
          disable
          outlined
        ></q-input>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewDormitorio">
        <q-btn color="primary" :disable="btnDisabled" @click="addDormitorio"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewDormitorio: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo dormitorio o para mostrar un dormitorio ingresado"
    },
    dormitorio: {
      required: false,
      default: function() {
        return {
          tipoEspacio: "",
          cantidad: 0,
          estado: "",
          accesible: false,
          ancho: 0.0,
          largo: 0.0
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      tipoEspacio: "",
      cantidad: 0,
      estado: "",
      accesible: false,
      ancho: 0.0,
      largo: 0.0,

      tiposEspacio: [
        "Aula",
        "Cuarto",
        "Salon de uso multiple",
        "Cancha cubierta",
        "Otro"
      ],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    btnDisabled() {
      return (
        this.tipoEspacio == "" ||
        this.cantidad == 0 ||
        this.estado == "" ||
        this.ancho == 0 ||
        this.largo == 0
      );
    },
    totalm2() {
      return this.ancho * this.largo;
    },
    trueFalseOptions() {
      return [{ value: true, label: "Si" }, { value: false, label: "No" }];
    }
  },
  methods: {
    addDormitorio() {
      const payload = {
        tipoEspacio: this.tipoEspacio,
        cantidad: this.cantidad,
        estado: this.estado,
        accesible: this.accesible,
        ancho: this.ancho,
        largo: this.largo,
        totalm2: this.totalm2
      };
      this.$emit("addDormitorio", payload);
      this.clearForm();
    },
    clearForm() {
      this.tipoEspacio = "";
      this.cantidad = "";
      this.estado = "";
      this.accesible = false;
      this.ancho = 0.0;
      this.largo = 0.0;
    },
    copyPropValues() {
      this.tipoEspacio = this.dormitorio.tipoEspacio;
      this.cantidad = this.dormitorio.cantidad;
      this.estado = this.dormitorio.estado;
      this.accesible = this.dormitorio.accesible;
      this.ancho = this.dormitorio.ancho;
      this.largo = this.dormitorio.largo;
    }
  }
};
</script>
