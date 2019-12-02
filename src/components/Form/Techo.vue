<template>
  <div>
    <q-form class="row" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Material"
          v-model="localForm.materialTecho"
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
        <q-btn color="primary" @click="addTecho">Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    techo: {
      required: false,
      default() {
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
      refForm: "techo-form",
      localForm: {
        materialTecho: "",
        estado: ""
      },
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    materiales() {
      return this.$store.getters["app/tiposTecho"];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addTecho al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addTecho() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addTecho", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.techo);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
