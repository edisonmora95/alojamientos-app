<template>
  <q-form class="row q-py-sm" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Institución"
        v-model="localForm.institucion"
        :rules="[validaciones.required]"
        :options="tiposInsitucion"
        :disable="!isNewInstitucion"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-input
        label="Distancia"
        type="number"
        suffix="[m]"
        v-model.number="localForm.distancia"
        :rules="[validaciones.required, validaciones.numberPositive]"
        :disable="!isNewInstitucion"
        outlined
      ></q-input>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="isNewInstitucion">
      <q-btn color="primary" @click="addInstitucion">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  props: {
    isNewInstitucion: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar una nueva institucion o para mostrar una institucion ya ingresada"
    },
    institucionEmergencia: {
      required: false,
      default() {
        return {
          institucion: "",
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
      refForm: "institucion-form",
      localForm: {
        institucion: "",
        distancia: 0.0
      },

      tiposInsitucion: ["Policia UPC", "Cuerpo de bomberos", "Hospital", "Otro"]
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
     * Si es válido emite el evento addInstitucion al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addInstitucion() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addInstitucion", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.institucionEmergencia);
    }
  },
  mixins: [FormMixin]
};
</script>
