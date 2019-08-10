<template>
  <div>
    <q-form class="row" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Seleccione el tipo de ingreso/salida del establecimiento"
          v-model="localForm.tipoIngresoSalida"
          :rules="[validaciones.required]"
          :options="tiposIngresosSalidas"
          :disable="!isNewIngresoSalida"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Cantidad"
          type="number"
          v-model.number="localForm.cantidad"
          :rules="[validaciones.required, validaciones.numberPositive]"
          :disable="!isNewIngresoSalida"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del recurso"
          v-model="localForm.estado"
          :rules="[validaciones.required]"
          :options="estados"
          :disable="!isNewIngresoSalida"
          outlined
        ></q-select>
      </section>
    </q-form>
    <footer class="row">
      <section
        class="col-xs-4 offset-xs-4 text-center"
        v-if="isNewIngresoSalida"
      >
        <q-btn color="primary" @click="addIngresoSalida">Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  props: {
    isNewIngresoSalida: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo ingreso/salida o para mostrar un ingreso/salida ya ingresado"
    },
    ingresoSalida: {
      required: false,
      default() {
        return {
          tipoIngresoSalida: "",
          estado: "",
          cantidad: 0
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      refForm: "ingreso-salida-form",
      localForm: {
        tipoIngresoSalida: "",
        estado: "",
        cantidad: 0
      },

      tiposIngresosSalidas: ["Puertas", "Salida de emergencia", "Ventanas"],
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
     * Si es válido emite el evento addIngresoSalida al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addIngresoSalida() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addIngresoSalida", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.ingresoSalida);
    }
  },
  mixins: [FormMixin]
};
</script>
