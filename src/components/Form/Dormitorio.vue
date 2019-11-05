<template>
  <q-form class="row q-py-md" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-8 col-sm-6 q-px-sm">
      <q-select
        label="Tipo de espacio"
        v-model="localForm.tipoEspacio"
        :options="tiposEspacio"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-4 col-sm-6 q-px-sm">
      <q-input
        label="Cantidad"
        type="number"
        v-model.number="localForm.cantidad"
        :disable="disable"
        :rules="[validaciones.required, validaciones.numberPositive]"
        outlined
      ></q-input>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Estado del espacio"
        v-model="localForm.estado"
        :options="estados"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section class="col-xs-12 col-sm-6 q-px-sm">
      <q-select
        label="Accesible para personas con discapacidad"
        v-model="localForm.accesible"
        :options="trueFalseOptions"
        :disable="disable"
        :rules="[validaciones.required]"
        emit-value
        map-options
        outlined
      ></q-select>
    </section>
    <section class="col-xs-4 q-px-sm">
      <q-input
        label="Ancho"
        type="number"
        suffix="[m]"
        v-model.number="localForm.ancho"
        :disable="disable"
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
        :disable="disable"
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
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
      <q-btn color="primary" @click="addDormitorio">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    dormitorio: {
      required: false,
      default() {
        return {
          tipoEspacio: "",
          cantidad: 0,
          estado: "",
          accesible: false,
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
      refForm: "dormitorio-form",
      localForm: {
        tipoEspacio: "",
        cantidad: 0,
        estado: "",
        accesible: false,
        ancho: 0.0,
        largo: 0.0
      },
      estados: ["Bueno", "Malo"]
    };
  },
  computed: {
    tiposEspacio() {
      return this.$store.getters["app/tiposEspacioInfraestructura"];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    },
    totalm2() {
      return this.localForm.ancho * this.localForm.largo;
    },
    trueFalseOptions() {
      return [{ value: true, label: "Si" }, { value: false, label: "No" }];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addDormitorio al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addDormitorio() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        payload["totalm2"] = this.totalm2;
        this.$emit("addDormitorio", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.dormitorio);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
