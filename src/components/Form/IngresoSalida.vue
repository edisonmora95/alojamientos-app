<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Seleccione el tipo de ingreso/salida del establecimiento"
          v-model="tipoIngresoSalida"
          :options="tiposIngresosSalidas"
          :disable="!isNewIngresoSalida"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Cantidad"
          type="number"
          v-model.number="cantidad"
          :disable="!isNewIngresoSalida"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del recurso"
          v-model="estado"
          :options="estados"
          :disable="!isNewIngresoSalida"
          outlined
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section
        class="col-xs-4 offset-xs-4 text-center"
        v-if="isNewIngresoSalida"
      >
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
    isNewIngresoSalida: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo ingreso/salida o para mostrar un ingreso/salida ya ingresado"
    },
    ingresoSalida: {
      required: false,
      default: function() {
        return {
          tipoIngresoSalida: "",
          estado: "",
          cantidad: 0
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      tipoIngresoSalida: "",
      estado: "",
      cantidad: 0,

      tiposIngresosSalidas: ["Tapial", "Adobe", "Caña", "Otros"],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    btnDisabled() {
      return (
        this.tipoIngresoSalida == "" || this.estado == "" || this.cantidad == 0
      );
    }
  },
  methods: {
    addIngresoSalida() {
      const payload = {
        tipoIngresoSalida: this.tipoIngresoSalida,
        estado: this.estado,
        cantidad: this.cantidad
      };
      this.$emit("addIngresoSalida", payload);
      this.clearForm();
    },
    clearForm() {
      this.tipoIngresoSalida = "";
      this.estado = "";
      this.cantidad = 0;
    },
    copyPropValues() {
      this.tipoIngresoSalida = this.ingresoSalida.tipoIngresoSalida;
      this.estado = this.ingresoSalida.estado;
      this.cantidad = this.ingresoSalida.cantidad;
    }
  }
};
</script>
