<template>
  <div>
    <q-form class="row" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-8 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Area de bano"
          v-model="localForm.areaBano"
          :options="tiposEspacio"
          :rules="[validaciones.required]"
          :disable="!isNewBano"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-4 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Cantidad"
          type="number"
          v-model.number="localForm.cantidad"
          :disable="!isNewBano"
          :rules="[validaciones.required]"
          outlined
        ></q-input>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Estado del espacio"
          v-model="localForm.estado"
          :options="estados"
          :rules="[validaciones.required]"
          :disable="!isNewBano"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Accesible para personas con discapacidad"
          v-model="localForm.accesible"
          :options="trueFalseOptions"
          :rules="[validaciones.required]"
          :disable="!isNewBano"
          emit-value
          map-options
          outlined
        ></q-select>
      </section>
    </q-form>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewBano">
        <q-btn color="primary" @click="addBano">Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  props: {
    isNewBano: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar un nuevo bano o para mostrar un bano ingresado"
    },
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
  mixins: [FormMixin]
};
</script>
