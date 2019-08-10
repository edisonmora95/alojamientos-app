<template>
  <div>
    <q-form class="row" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-select
          label="Via de acceso"
          v-model="localForm.viaAcceso"
          :options="viasAcceso"
          :disable="!isNewVia"
          :rules="[validaciones.required]"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6 q-my-sm q-px-sm">
        <q-input
          label="Distancia a estacion de transporte"
          type="number"
          v-model.number="localForm.distancia"
          :disable="!isNewVia"
          :rules="[validaciones.required]"
          outlined
        ></q-input>
      </section>
    </q-form>
    <footer class="row">
      <section class="col-xs-4 offset-xs-4 text-center" v-if="isNewVia">
        <q-btn color="primary" @click="addVia">Aceptar</q-btn>
      </section>
    </footer>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  props: {
    isNewVia: {
      type: Boolean,
      default: false,
      description:
        "Indica si el componente se esta usando para ingresar una nueva via de acceso o para mostrar una via ya ingresada"
    },
    via: {
      required: false,
      default() {
        return {
          viaAcceso: "",
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
      refForm: "viaAcceso-form",
      localForm: {
        viaAcceso: "",
        distancia: 0.0
      },

      viasAcceso: ["Terrestre", "Fluvial", "Aérea"]
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
     * Si es válido emite el evento addVia al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addVia() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addVia", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.via);
    }
  },
  mixins: [FormMixin]
};
</script>
