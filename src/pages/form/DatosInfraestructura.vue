<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" ref="localizacion-form">
      <section class="col-xs-12">
        <q-select
          v-model="tipoServicio"
          :options="tiposServicio"
          label="Tipo de servicio de la infraestructura"
          outlined
        ></q-select>
      </section>
      <section class="col-xs-12 col-md-6" v-if="tipoServicio == 'Otros'">
        <q-input
          outlined
          label="Especificar tipo de servicio"
          v-model="otroTipoServicio"
        ></q-input>
      </section>
      <section class="col-xs-12 col-md-6">
        <q-select
          v-model="institucion"
          :options="instituciones"
          label="Institución propietaria de la infraestructura"
          outlined
          map-options
          emit-value
        ></q-select>
      </section>
      <section v-if="institucion == '1'" class="row">
        <section class="col-xs-12 col-md-6">
          <q-input
            label="Nombres representante"
            v-model="nombreRepresentante"
            disable
          ></q-input>
        </section>
        <section class="col-xs-12 col-md-6">
          <q-input
            label="Celular"
            v-model="celularRepresentante"
            disable
            mask="(+###) ### ### ###"
          ></q-input>
        </section>
        <section class="col-xs-12 col-md-6">
          <q-input
            label="Telf. Convencional"
            v-model="convencionalRepresentante"
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
          :to="prevPage"
        />
      </footer>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tipoServicio: "",
      institucion: "",
      otroTipoServicio: "",
      nombreRepresentante: "Edison Mora",
      celularRepresentante: "+593992556793",
      convencionalRepresentante: "042348515",
      prevPage: {
        name: "generales"
      }
    };
  },
  computed: {
    tiposServicio() {
      return ["Otros", "Escuela", "Colegio", "Universidad", "Hospital"];
    },
    instituciones() {
      return [
        { value: "1", label: "ESPOL" },
        { value: "2", label: "UCSG" },
        { value: "3", label: "USM" }
      ];
    }
  }
};
</script>
