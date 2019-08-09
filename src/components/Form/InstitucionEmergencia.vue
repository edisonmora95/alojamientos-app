<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Institucion"
          v-model="institucion"
          :options="tiposInsitucion"
          :disable="!isNewInstitucion"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Distancia"
          type="number"
          v-model.number="distancia"
          :disable="!isNewInstitucion"
          outlined
        ></q-input>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewInstitucion">
        <q-btn color="primary" :disable="btnDisabled" @click="addInstitucion"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewInstitucion: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar una nueva institucion o para mostrar una institucion ya ingresada"
    },
    institucionEmergencia: {
      required: false,
      default: function() {
        return {
          institucion: "",
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
      institucion: "",
      distancia: 0.0,

      tiposInsitucion: ["Policia UPC", "Cuerpo de bomberos", "Hospital", "Otro"]
    };
  },
  computed: {
    btnDisabled() {
      return this.institucion == "" || this.distancia == 0;
    }
  },
  methods: {
    addInstitucion() {
      const payload = {
        institucion: this.institucion,
        distancia: this.distancia
      };
      this.$emit("addInstitucion", payload);
      this.clearForm();
    },
    clearForm() {
      this.institucion = "";
      this.distancia = 0.0;
    },
    copyPropValues() {
      this.institucion = this.institucionEmergencia.institucion;
      this.distancia = this.institucionEmergencia.distancia;
    }
  }
};
</script>
