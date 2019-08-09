<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Via de acceso"
          v-model="viaAcceso"
          :options="viasAcceso"
          :disable="!isNewVia"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Distancia a estacion de transporte"
          type="number"
          v-model.number="distancia"
          :disable="!isNewVia"
          outlined
        ></q-input>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewVia">
        <q-btn color="primary" :disable="btnDisabled" @click="addVia"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewVia: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar una nueva via de acceso o para mostrar una via ya ingresada"
    },
    via: {
      required: false,
      default: function() {
        return {
          viaAcceso: "",
          distancia: 0.0
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      viaAcceso: "",
      distancia: 0.0,

      viasAcceso: ["Terrestre", "Fluvial", "Aerea"]
    };
  },
  computed: {
    btnDisabled() {
      return this.viaAcceso == "";
    }
  },
  methods: {
    addVia() {
      const payload = {
        viaAcceso: this.viaAcceso,
        distancia: this.distancia
      };
      this.$emit("addVia", payload);
      this.clearForm();
    },
    clearForm() {
      this.viaAcceso = "";
      this.distancia = "";
    },
    copyPropValues() {
      this.viaAcceso = this.via.viaAcceso;
      this.distancia = this.via.distancia;
    }
  }
};
</script>
