<template>
  <q-form class="row q-py-md" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Tipo de servicio"
        v-model="localForm.tipoServicio"
        :options="tiposServicio"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Estado"
        v-model="localForm.estado"
        :options="estados"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
      <q-btn color="primary" @click="addServicio">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    servicio: {
      required: false,
      default() {
        return {
          tipoServicio: "",
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
      refForm: "servicioBasico-form",
      localForm: {
        tipoServicio: "",
        estado: ""
      },

      tiposServicio: [
        "Abastecimiento de agua",
        "Tanques de agua",
        "Alcantarillado",
        "Drenaje de aguas lluvia",
        "Manejo de residuos sólidos",
        "Energía eléctrica",
        "Servicio telefónico",
        "Señal de televisión",
        "Señal de celular",
        "Señal de radio"
      ],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addServicio al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addServicio() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addServicio", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.servicio);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
