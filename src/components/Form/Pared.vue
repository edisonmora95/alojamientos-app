<template>
  <div>
    <main class="row">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Material"
          v-model="materialPared"
          :options="materiales"
          :disable="!isNewPared"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del recurso"
          v-model="estado"
          :options="estados"
          :disable="!isNewPared"
          outlined
        ></q-select>
      </section>
    </main>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewPared">
        <q-btn color="primary" :disable="btnDisabled" @click="addPared"
          >Aceptar</q-btn
        >
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    isNewPared: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar una nueva pared o para mostrar una pared ya ingresada"
    },
    pared: {
      required: false,
      default: function() {
        return {
          materialPared: "",
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
      materialPared: "",
      estado: "",

      materiales: ["Tapial", "Adobe", "Caña", "Otros"],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    btnDisabled() {
      return this.materialPared == "" || this.estado == "";
    }
  },
  methods: {
    addPared() {
      const payload = {
        materialPared: this.materialPared,
        estado: this.estado
      };
      this.$emit("addPared", payload);
      this.clearForm();
    },
    clearForm() {
      this.materialPared = "";
      this.estado = "";
    },
    copyPropValues() {
      this.materialPared = this.pared.materialPared;
      this.estado = this.pared.estado;
    }
  }
};
</script>
