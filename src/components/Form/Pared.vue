<template>
  <div>
    <q-form class="row" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Material"
          v-model="localForm.materialPared"
          :rules="[validaciones.required]"
          :options="materiales"
          :disable="disable"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del recurso"
          v-model="localForm.estado"
          :rules="[validaciones.required]"
          :options="estados"
          :disable="disable"
          outlined
        ></q-select>
      </section>
    </q-form>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
        <q-btn color="primary" @click="addPared">Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    pared: {
      required: false,
      default() {
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
      refForm: "pared-form",
      localForm: {
        materialPared: "",
        estado: ""
      },
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    materiales() {
      return this.$store.getters["app/tiposMaterialInfraestructura"];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addPared al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addPared() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addPared", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.pared);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
