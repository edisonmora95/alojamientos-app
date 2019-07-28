<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="localizacion-form">
      <section class="col-xs-6">
        <q-select
          v-model="zona"
          :options="zonas"
          label="Zona"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-6">
        <q-select
          v-model="provincia"
          :options="provincias"
          label="Provincia"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-6">
        <q-select
          v-model="canton"
          :options="cantones"
          label="Canton"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-6">
        <q-select
          v-model="parroquia"
          :options="parroquias"
          label="Parroquia"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12">
        <q-input outlined v-model="sector" label="Sector/Comunidad" />
      </section>
      <section class="col-xs-12">
        <q-input outlined v-model="referencia" label="Punto de Referencia" />
      </section>
      <section class="col-xs-12">
        <q-input outlined v-model="principal" label="Calle principal" />
      </section>
      <section class="col-xs-12">
        <q-input outlined v-model="secundaria" label="Calle secundaria" />
      </section>
      <footer class="col-xs-12">
        <q-btn
          flat
          class="btnContinuar"
          color="secondary"
          icon-right="keyboard_arrow_right"
          label="Continuar"
        />
      </footer>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      zona: "",
      provincia: "",
      canton: "",
      parroquia: "",
      sector: "",
      referencia: "",
      principal: "",
      secundaria: ""
    };
  },
  computed: {
    zonas() {
      return [
        { value: "1", label: "Zona 1" },
        { value: "2", label: "Zona 2" },
        { value: "3", label: "Zona 3" },
        { value: "4", label: "Zona 4" },
        { value: "5", label: "Zona 5-8" },
        { value: "6", label: "Zona 6" },
        { value: "7", label: "Zona 7" },
        { value: "9", label: "Zona 9" }
      ];
    },
    provincias() {
      return [
        { value: "1", label: "Esmeraldas" },
        { value: "2", label: "Imbabura" },
        { value: "3", label: "Sucumbios" },
        { value: "4", label: "Orellana" },
        { value: "5", label: "Napo" },
        { value: "6", label: "Cotopaxi" },
        { value: "7", label: "Chimborazo" },
        { value: "8", label: "Tungurahua" },
        { value: "9", label: "Pastaza" },
        { value: "10", label: "Manabi" }
      ];
    },
    cantones() {
      return [{ value: "1", label: "Cuenca" }];
    },
    parroquias() {
      return [
        { values: "1", label: "Banos" },
        { values: "2", label: "San Joaquin" },
        { values: "3", label: "Sayausi" }
      ];
    }
  }
};
</script>

<style scoped>
.btnContinuar {
  float: right;
}
</style>
