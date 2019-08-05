<template>
  <div>
    <main class="row">
      <section class="col-xs-8 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Area de bano"
          v-model="areaBano"
          :options="tiposEspacio"
          :disable="!isNewBano"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-4 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Cantidad"
          type="number"
          v-model.number="cantidad"
          :disable="!isNewBano"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del espacio"
          v-model="estado"
          :options="estados"
          :disable="!isNewBano"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Accesible para personas con discapacidad"
          v-model="accesible"
          :options="trueFalseOptions"
          :disable="!isNewBano"
          emit-value
          map-options
          outlined
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewBano">
        <q-btn
          color="primary"
          :disable="btnDisabled"
          @click="addBano"
        >Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewBano: {
      type: Boolean,
      default: false,
      description: "Indica si el componente se esta usando para ingresar un nuevo bano o para mostrar un bano ingresado"
    },
    bano: {
      required: false,
      default: function() {
        return {
          areaBano: "",
          cantidad: 0,
          estado: "",
          accesible: false,
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      areaBano: "",
      cantidad: 0,
      estado: "",
      accesible: false,

      tiposEspacio: [
        "Aula",
        "Cuarto",
        "Salon de uso multiple",
        "Cancha cubierta",
        "Otro"
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
        this.areaBano == "" ||
        this.cantidad == 0 ||
        this.estado == ""
      );
    },
    trueFalseOptions() {
      return [
        { value: true, label: "Si" },
        { value: false, label: "No" },
      ]
    },
  },
  methods: {
    addBano() {
      const payload = {
        areaBano: this.areaBano,
        cantidad: this.cantidad,
        estado: this.estado,
        accesible: this.accesible
      };
      this.$emit("addBano", payload);
      this.clearForm();
    },
    clearForm() {
      this.areaBano = "";
      this.cantidad = "";
      this.estado = "";
      this.accesible = false;
    },
    copyPropValues() {
      this.areaBano = this.bano.areaBano;
      this.cantidad = this.bano.cantidad;
      this.estado = this.bano.estado;
      this.accesible = this.bano.accesible;
    }
  }
};
</script>
