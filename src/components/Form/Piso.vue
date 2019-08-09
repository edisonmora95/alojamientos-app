<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Material"
          v-model="materialPiso"
          :options="materiales"
          :disable="!isNewPiso"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del recurso"
          v-model="estado"
          :options="estados"
          :disable="!isNewPiso"
          outlined
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewPiso">
        <q-btn color="primary" :disable="btnDisabled" @click="addPiso"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewPiso: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo piso o para mostrar un piso ya ingresado"
    },
    piso: {
      required: false,
      default: function() {
        return {
          materialPiso: "",
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
      materialPiso: "",
      estado: "",

      materiales: ["Tapial", "Adobe", "Caña", "Otros"],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    btnDisabled() {
      return this.materialPiso == "" || this.estado == "";
    }
  },
  methods: {
    addPiso() {
      const payload = {
        materialPiso: this.materialPiso,
        estado: this.estado
      };
      this.$emit("addPiso", payload);
      this.clearForm();
    },
    clearForm() {
      this.materialPiso = "";
      this.estado = "";
    },
    copyPropValues() {
      this.materialPiso = this.piso.materialPiso;
      this.estado = this.piso.estado;
    }
  }
};
</script>
