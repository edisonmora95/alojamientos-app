<template>
  <q-form class="row q-py-md" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-8 col-sm-6 q-px-sm">
      <q-select
        label="Área de bano"
        v-model="localForm.areaBano"
        :options="tiposEspacio"
        :rules="[validaciones.required]"
        :disable="disable"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-4 col-sm-6 q-px-sm">
      <q-input
        label="Cantidad"
        type="number"
        v-model.number="localForm.cantidad"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-input>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Estado del espacio"
        v-model="localForm.estado"
        :options="estados"
        :rules="[validaciones.required]"
        :disable="disable"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Accesible para personas con discapacidad"
        v-model="localForm.accesible"
        :options="trueFalseOptions"
        :rules="[validaciones.required]"
        :disable="disable"
        emit-value
        map-options
        outlined
      ></q-select>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
      <q-btn color="primary" @click="addBano">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    bano: {
      required: false,
      default() {
        return {
          areaBano: "",
          cantidad: 0,
          estado: "",
          accesible: false
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      refForm: "bano-form",
      localForm: {
        areaBano: "",
        cantidad: 0,
        estado: "",
        accesible: false
      },

      tiposEspacio: [
        "Aula",
        "Cuarto",
        "Salón de uso múltiple",
        "Cancha cubierta",
        "Otro"
      ],
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    validaciones() {
      return this.$store.getters["app/validaciones"];
    },
    trueFalseOptions() {
      return [{ value: true, label: "Si" }, { value: false, label: "No" }];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addBano al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addBano() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addBano", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.bano);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
