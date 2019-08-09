<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Material"
          v-model="materialTecho"
          :options="materiales"
          :disable="!isNewTecho"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del recurso"
          v-model="estado"
          :options="estados"
          :disable="!isNewTecho"
          outlined
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewTecho">
        <q-btn color="primary" :disable="btnDisabled" @click="addTecho"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewTecho: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo techo o para mostrar un techo ya ingresado"
    },
    techo: {
      required: false,
      default: function() {
        return {
          materialTecho: "",
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
      materialTecho: "",
      estado: "",

      materiales: ["Tapial", "Adobe", "Caña", "Otros"],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    btnDisabled() {
      return this.materialTecho == "" || this.estado == "";
    }
  },
  methods: {
    addTecho() {
      const payload = {
        materialTecho: this.materialTecho,
        estado: this.estado
      };
      this.$emit("addTecho", payload);
      this.clearForm();
    },
    clearForm() {
      this.materialTecho = "";
      this.estado = "";
    },
    copyPropValues() {
      this.materialTecho = this.techo.materialTecho;
      this.estado = this.techo.estado;
    }
  }
};
</script>
