<template>
  <q-form class="row q-py-sm" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Tipo de recurso"
        v-model="localForm.tipoRecurso"
        :options="tiposRecurso"
        :disable="!isNewRecurso"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Estado del recurso"
        v-model="localForm.estado"
        :options="estados"
        :disable="!isNewRecurso"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="isNewRecurso">
      <q-btn color="primary" @click="addRecurso">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  props: {
    isNewRecurso: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo recurso o para mostrar un recurso ya ingresado"
    },
    recurso: {
      required: false,
      default() {
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
      refForm: "recurso-form",
      localForm: {
        tipoRecurso: "",
        estado: ""
      },

      tiposRecurso: [
        "Sistema de alarma",
        "Pulsadores de alarma",
        "Detector de humo",
        "Hidrantes"
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
     * Si es válido emite el evento addRecurso al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addRecurso() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addRecurso", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.recurso);
    }
  },
  mixins: [FormMixin]
};
</script>
