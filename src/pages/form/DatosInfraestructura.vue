<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12">
        <q-select
          v-model="localForm.tipoServicio"
          :options="tiposServicio"
          :rules="[validaciones.required]"
          label="Tipo de servicio de la infraestructura"
          outlined
        ></q-select>
      </section>
      <section
        class="col-xs-12 col-md-6"
        v-if="localForm.tipoServicio == 'Otros'"
      >
        <q-input
          outlined
          label="Especificar tipo de servicio"
          v-model="localForm.otroTipoServicio"
        ></q-input>
      </section>
      <section class="col-xs-12 col-md-6">
        <q-select
          v-model="localForm.institucion"
          :options="instituciones"
          :rules="[validaciones.required]"
          label="Institución propietaria de la infraestructura"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section v-if="localForm.institucion == '1'" class="row">
        <section class="col-xs-12 col-md-6">
          <q-input
            label="Nombres representante"
            v-model="form.nombreRepresentante"
            disable
          ></q-input>
        </section>
        <section class="col-xs-12 col-md-6">
          <q-input
            label="Celular"
            v-model="form.celularRepresentante"
            disable
            mask="(+###) ### ### ###"
          ></q-input>
        </section>
        <section class="col-xs-12 col-md-6">
          <q-input
            label="Telf. Convencional"
            v-model="form.convencionalRepresentante"
            disable
            mask="(##)# ### ###"
          ></q-input>
        </section>
      </section>
      <footer class="col-xs-12">
        <q-btn
          flat
          class="btnRegresar"
          color="blue-grey"
          icon="keyboard_arrow_left"
          label="Regresar"
          @click="prevStep"
        />
        <q-btn
          flat
          class="btnContinuar"
          color="secondary"
          icon-right="keyboard_arrow_right"
          label="Continuar"
          @click="nextStep"
        />
      </footer>
    </q-form>
  </q-page>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "datos-infraestructura-form",
      prevPage: {
        name: "generales"
      },
      nextPage: {
        name: "antecedentesEventos"
      },
      localForm: {
        tipoServicio: "",
        otroTipoServicio: "",
        institucion: ""
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    tiposServicio() {
      return ["Otros", "Escuela", "Colegio", "Universidad", "Hospital"];
    },
    instituciones() {
      return [
        { value: "1", label: "ESPOL" },
        { value: "2", label: "UCSG" },
        { value: "3", label: "USM" }
      ];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  mixins: [FormMixin]
};
</script>
