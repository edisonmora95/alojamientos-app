<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="localizacion-form">
      <section class="col-xs-6">
        <q-select
          v-model="localForm.zona"
          :options="zonas"
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
          label="Parroquia"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section class="col-xs-12">
        <q-input outlined v-model="localForm.sector" label="Sector/Comunidad" />
      </section>
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="localForm.referencia"
          label="Punto de Referencia"
        />
      </section>
      <section class="col-xs-12">
        <q-input
          outlined
          v-model="localForm.principal"
          label="Calle principal"
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
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
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
    }
  },
  methods: {
    copyFormValues() {
      for (let key in this.localForm) {
        this.localForm[key] = this.form[key];
      }
    },
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    },
    updateForm() {
      const payload = this.localForm;
      this.$store.commit("form/updateForm", payload);
    }
  }
};
</script>
