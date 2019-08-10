<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-6">
        <q-select
          v-model="localForm.zona"
          :options="zonas"
          :rules="[validaciones.required]"
          label="Zona"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-6">
        <q-select
          v-model="localForm.provincia"
          :options="provincias"
          :rules="[validaciones.required]"
          label="Provincia"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-6">
        <q-select
          v-model="localForm.canton"
          :options="cantones"
          :rules="[validaciones.required]"
          label="Canton"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-6">
        <q-select
          v-model="localForm.parroquia"
          :options="parroquias"
          :rules="[validaciones.required]"
          label="Parroquia"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="localForm.sector"
          label="Sector/Comunidad"
          :rules="[validaciones.required, validaciones.min3]"
        />
      </section>
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="localForm.referencia"
          label="Punto de Referencia"
          :rules="[validaciones.required, validaciones.min3]"
        />
      </section>
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="localForm.principal"
          label="Calle principal"
          :rules="[validaciones.required, validaciones.min3]"
        />
      </section>
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="localForm.secundaria"
          label="Calle secundaria"
        />
      </section>
      <footer class="col-xs-12">
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
      refForm: "localizacion-form",
      nextPage: {
        name: "generales"
      },
      localForm: {
        zona: "",
        provincia: "",
        canton: "",
        parroquia: "",
        sector: "",
        referencia: "",
        principal: "",
        secundaria: ""
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    zonas() {
      return this.$store.getters["app/zonas"];
    },
    provincias() {
      return this.$store.getters["app/provincias"];
    },
    cantones() {
      return this.$store.getters["app/cantones"];
    },
    parroquias() {
      return this.$store.getters["app/parroquias"];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  mixins: [FormMixin]
};
</script>
