<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Tipo de recurso"
          v-model="tipoRecurso"
          :options="tiposRecurso"
          :disable="!isNewRecurso"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del recurso"
          v-model="estado"
          :options="estados"
          :disable="!isNewRecurso"
          outlined
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewRecurso">
        <q-btn
          color="primary"
          :disable="btnDisabled"
          @click="addRecurso"
        >Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewRecurso: {
      type: Boolean,
      default: false,
      description: "Indica si el componente se esta usando para ingresar un nuevo recurso o para mostrar un recurso ya ingresado"
    },
    recurso: {
      required: false,
      default: function() {
        return {
          tipoRecurso: "",
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
      tipoRecurso: "",
      estado: "",

      tiposRecurso: [
        "Sistema de alarma",
        "Pulsadores de alarma",
        "Detector de humo",
        "Hidrantes"
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
        this.tipoRecurso == "" ||
        this.estado == ""
      );
    }
  },
  methods: {
    addRecurso() {
      const payload = {
        tipoRecurso: this.tipoRecurso,
        estado: this.estado
      };
      this.$emit("addRecurso", payload);
      this.clearForm();
    },
    clearForm() {
      this.tipoRecurso = "";
      this.estado = ""
    },
    copyPropValues() {
      this.tipoRecurso = this.recurso.tipoRecurso;
      this.estado = this.recurso.estado;
    }
  }
};
</script>
