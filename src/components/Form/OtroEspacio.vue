<template>
  <div>
    <q-form class="row" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Seleccione el espacio"
          v-model="localForm.espacio"
          :rules="[validaciones.required]"
          :options="tiposEspacios"
          :disable="!isNewEspacio"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Cantidad"
          type="number"
          v-model.number="localForm.cantidad"
          :rules="[validaciones.required, validaciones.numberPositive]"
          :disable="!isNewEspacio"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del espacio"
          v-model="localForm.estado"
          :rules="[validaciones.required]"
          :options="estados"
          :disable="!isNewEspacio"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 q-my-sm q-px-sm">
        <q-select
          label="Accesible para discapacitados"
          v-model="localForm.accesible"
          :rules="[validaciones.required]"
          :options="trueFalseOptions"
          :disable="!isNewEspacio"
          outlined
          emit-value
          map-options
        ></q-select>
      </section>
    </q-form>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewEspacio">
        <q-btn color="primary" @click="addOtroEspacio">Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  props: {
    isNewEspacio: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo ingreso/salida o para mostrar un ingreso/salida ya ingresado"
    },
    otroEspacio: {
      required: false,
      default() {
        return {
          espacio: "",
          estado: "",
          cantidad: 0,
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
      refForm: "otro-espacio-form",
      localForm: {
        espacio: "",
        estado: "",
        cantidad: 0,
        accesible: false
      },

      tiposEspacios: ["Espacio 1", "Espacio 2", "Espacio 3"],
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
     * Si es válido emite el evento addOtroEspacio al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addOtroEspacio() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addOtroEspacio", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.otroEspacio);
    }
  },
  mixins: [FormMixin]
};
</script>
