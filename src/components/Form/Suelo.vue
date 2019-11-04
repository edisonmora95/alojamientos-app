<template>
  <div>
    <q-form class="row" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Tipo de suelo"
          v-model="localForm.tipoSuelo"
          :rules="[validaciones.required]"
          :options="tiposSuelo"
          outlined
          :disable="disable"
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          outlined
          autogrow
          v-model="localForm.observacion"
          label="Observación"
          type="textarea"
          counter
          maxlength="255"
          :disable="disable"
        />
      </section>
    </q-form>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
        <q-btn color="primary" @click="addSuelo">Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    suelo: {
      required: false,
      default() {
        return {
          tipoSuelo: "",
          observacion: ""
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      refForm: "suelo-form",
      localForm: {
        tipoSuelo: "",
        observacion: ""
      },

      tiposSuelo: [
        "Firme",
        "Seco",
        "Inundable",
        "Ciénaga",
        "Húmedo",
        "Blando",
        "Relleno"
      ]
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
     * Si es válido emite el evento addSuelo al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addSuelo() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addSuelo", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.suelo);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
