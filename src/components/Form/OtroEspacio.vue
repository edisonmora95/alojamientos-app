<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Seleccione el espacio"
          v-model="espacio"
          :options="tiposEspacios"
          :disable="!isNewEspacio"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Cantidad"
          type="number"
          v-model.number="cantidad"
          :disable="!isNewEspacio"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del espacio"
          v-model="estado"
          :options="estados"
          :disable="!isNewEspacio"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 q-my-sm q-px-sm">
        <q-select
          label="Accesible para discapacitados"
          v-model="accesible"
          :options="trueFalseOptions"
          :disable="!isNewEspacio"
          outlined
          emit-value
          map-options
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewEspacio">
        <q-btn color="primary" :disable="btnDisabled" @click="addIngresoSalida"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewEspacio: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo ingreso/salida o para mostrar un ingreso/salida ya ingresado"
    },
    otroEspacio: {
      required: false,
      default: function() {
        return {
          espacio: "",
          estado: "",
          cantidad: 0,
          accesible: false
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      espacio: "",
      estado: "",
      cantidad: 0,
      accesible: false,

      tiposEspacios: ["Tapial", "Adobe", "Caña", "Otros"],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    btnDisabled() {
      return this.espacio == "" || this.estado == "" || this.cantidad == 0;
    },
    trueFalseOptions() {
      return [{ value: true, label: "Si" }, { value: false, label: "No" }];
    }
  },
  methods: {
    addIngresoSalida() {
      const payload = {
        espacio: this.espacio,
        estado: this.estado,
        cantidad: this.cantidad,
        accesible: this.accesible
      };
      this.$emit("addIngresoSalida", payload);
      this.clearForm();
    },
    clearForm() {
      this.espacio = "";
      this.estado = "";
      this.cantidad = 0;
      this.accesible = false;
    },
    copyPropValues() {
      this.espacio = this.otroEspacio.espacio;
      this.estado = this.otroEspacio.estado;
      this.cantidad = this.otroEspacio.cantidad;
      this.accesible = this.otroEspacio.accesible;
    }
  }
};
</script>
