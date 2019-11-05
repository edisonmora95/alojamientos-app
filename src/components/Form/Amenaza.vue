<template>
  <q-form class="row q-py-md" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Tipo de amenaza"
        v-model="localForm.tipoAmenaza"
        :options="tiposAmenaza"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Nivel de recurrencia"
        v-model="localForm.nivelRecurrencia"
        :options="nivelesRecurrencia"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
        emit-value
        map-options
      ></q-select>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
      <q-btn color="primary" @click="addAmenaza">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    amenaza: {
      required: false,
      default() {
        return {
          tipoAmenaza: "",
          nivelRecurrencia: ""
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      refForm: "amenaza-form",
      localForm: {
        tipoAmenaza: "",
        nivelRecurrencia: ""
      },
      nivelesRecurrencia: ["Alto", "Medio", "Bajo"]
    };
  },
  computed: {
    validaciones() {
      return this.$store.getters["app/validaciones"];
    },
    tiposAmenaza() {
      return this.$store.getters["app/tiposAmenaza"];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addAmenaza al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addAmenaza() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addAmenaza", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.amenaza);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
