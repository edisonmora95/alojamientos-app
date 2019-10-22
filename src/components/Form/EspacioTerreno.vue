<template>
  <q-form class="row q-py-md" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-12 q-px-sm">
      <q-select
        label="Área"
        v-model="localForm.tipoEspacio"
        :options="tiposEspacio"
        :disable="!isNewEspacio"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-4 q-px-sm">
      <q-input
        label="Ancho"
        type="number"
        suffix="[m]"
        v-model.number="localForm.ancho"
        :disable="!isNewEspacio"
        :rules="[validaciones.required, validaciones.numberPositive]"
        outlined
      ></q-input>
    </section>
    <section class="col-xs-4 q-px-sm">
      <q-input
        label="Largo"
        type="number"
        suffix="[m]"
        v-model.number="localForm.largo"
        :disable="!isNewEspacio"
        :rules="[validaciones.required, validaciones.numberPositive]"
        outlined
      ></q-input>
    </section>
    <section class="col-xs-4 q-px-sm">
      <q-input
        label="Total m2"
        type="number"
        suffix="[m]"
        v-model.number="totalm2"
        disable
        outlined
      ></q-input>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="isNewEspacio">
      <q-btn color="primary" @click="addEspacio">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  props: {
    isNewEspacio: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo espacio o solo para mostrar un espacio ya creado"
    },
    espacio: {
      required: false,
      default() {
        return {
          tipoEspacio: "",
          ancho: 0.0,
          largo: 0.0
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      refForm: "espacio-form",
      localForm: {
        tipoEspacio: "",
        ancho: 0.0,
        largo: 0.0
      },

      tiposEspacio: [
        "Área de espacio 1",
        "Área de espacio 2",
        "Área de espacio 3",
        "Área de espacio 4",
        "Área de espacio 5"
      ]
    };
  },
  computed: {
    validaciones() {
      return this.$store.getters["app/validaciones"];
    },
    totalm2() {
      return this.localForm.ancho * this.localForm.largo;
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addEspacio al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addEspacio() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        payload["totalm2"] = this.totalm2;
        this.$emit("addEspacio", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.espacio);
    }
  },
  mixins: [FormMixin]
};
</script>
