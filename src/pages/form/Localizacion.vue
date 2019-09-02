<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-12 col-sm-6">
        <q-select
          v-model="localForm.zona"
          :options="zonas"
          option-value="id"
          option-label="nombre"
          :rules="[validaciones.required]"
          label="Zona"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6">
        <q-select
          v-model="localForm.provincia"
          :options="provincias"
          option-value="id"
          option-label="nombre"
          :rules="[validaciones.required]"
          label="Provincia"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6">
        <q-select
          v-model="localForm.canton"
          :options="cantones"
          option-value="id"
          option-label="nombre"
          :rules="[validaciones.required]"
          label="Canton"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-12 col-sm-6">
        <q-select
          v-model="localForm.parroquia"
          :options="parroquias"
          option-value="id"
          option-label="nombre"
          :rules="[validaciones.required]"
          label="Parroquia"
          outlined
          map-options
          emit-value
        ></q-select>
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
        parroquia: ""
      },
      imageSrc: ""
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
      return this.$store.getters["app/provincias"](this.localForm.zona);
    },
    cantones() {
      return this.$store.getters["app/cantones"](this.localForm.provincia);
    },
    parroquias() {
      return this.$store.getters["app/parroquias"](this.localForm.canton);
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    }
  },
  mixins: [FormMixin]
};
</script>
