<template>
  <q-form class="row q-py-md" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Vía de acceso"
        v-model="localForm.viaAcceso"
        :options="viasAcceso"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-input
        label="Distancia a estación de transporte"
        type="number"
        suffix="[m]"
        v-model.number="localForm.distancia"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-input>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
      <q-btn color="primary" @click="addVia">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    via: {
      required: false,
      default() {
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
      refForm: "viaAcceso-form",
      localForm: {
        viaAcceso: "",
        distancia: 0.0
      }
    };
  },
  computed: {
    validaciones() {
      return this.$store.getters["app/validaciones"];
    },
    viasAcceso() {
      return this.$store.getters["app/viasAcceso"];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addVia al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addVia() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addVia", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.via);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
