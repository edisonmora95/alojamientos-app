<template>
  <q-form class="row q-py-md" :ref="refForm" :no-error-focus="true">
    <header class="col-xs-12 q-mb-sm">
      <slot name="header"></slot>
    </header>
    <section class="col-xs-12 q-px-sm">
      <q-select
        label="Tipo de evento"
        v-model="localForm.tipoEvento"
        :options="tiposEventos"
        :disable="disable"
        :rules="[validaciones.required]"
        outlined
      ></q-select>
    </section>
    <section v-if="localForm.tipoEvento != 'Ninguno'" class="col-xs-12">
      <main class="row">
        <section class="col-xs-12 q-my-sm q-px-sm">
          <q-select
            label="¿La ubicación fue expuesta a daños?"
            v-model="localForm.danos"
            :options="trueFalseOptions"
            :disable="disable"
            outlined
            emit-value
            map-options
          ></q-select>
        </section>
        <section
          v-if="localForm.danos == true"
          class="col-xs-12 q-my-sm q-px-sm"
        >
          <q-select
            label="Tipo de daño"
            v-model="localForm.tipoDano"
            :options="tiposDano"
            :disable="disable"
            outlined
          ></q-select>
        </section>
      </main>
    </section>
    <footer class="col-xs-4 offset-xs-4 text-center" v-if="showAddBtn">
      <q-btn color="primary" @click="addEvent">Aceptar</q-btn>
    </footer>
  </q-form>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
import FormComponentMixin from "../../mixins/FormComponentMixin";
export default {
  props: {
    evento: {
      required: false,
      default() {
        return {
          tipoEvento: "",
          danos: false,
          tipoDano: ""
        };
      }
    }
  },
  mounted() {
    this.copyPropValues();
  },
  data() {
    return {
      refForm: "evento-form",
      localForm: {
        tipoEvento: "",
        danos: false,
        tipoDano: ""
      },

      tiposEventos: [
        "Ninguno",
        "Movimiento en masa",
        "Inundación",
        "Terremoto"
      ],
      tiposDano: ["Humano", "Infraestructura", "Económico"]
    };
  },
  computed: {
    trueFalseOptions() {
      return [{ value: true, label: "Si" }, { value: false, label: "No" }];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  methods: {
    /**
     * Llama al mixin para que valide el formulario
     * Si es válido emite el evento addEvent al padre
     * Luego de emitir el evento, limpia el formulario local
     */
    async addEvent() {
      const isFormValid = await this.beforeSubmit(this.refForm);
      if (isFormValid) {
        const payload = Object.assign({}, this.localForm);
        this.$emit("addEvent", payload);
        this.clearForm(this.localForm);
      }
    },
    copyPropValues() {
      this.localForm = Object.assign({}, this.evento);
    }
  },
  mixins: [FormMixin, FormComponentMixin]
};
</script>
