<template>
  <q-page class="q-pt-lg q-px-md">
    <q-list bordered class="rounded-borders">
      <q-item-label header>
        <p class="text-h6">Infraestructuras</p>
      </q-item-label>
      <q-separator spaced />
      <form-item :form="form" v-for="form in formsInfraestructuras" :key="form.parroquia"></form-item>
      <q-item-label header>
        <p class="text-h6">Terrenos</p>
      </q-item-label>
      <q-separator spaced />
      <form-item :form="form" v-for="form in formsTerrenos" :key="form.parroquia"></form-item>
    </q-list>
  </q-page>
</template>

<script>
import FormItem from "components/FormItem";
export default {
  components: {
    FormItem
  },
  mounted() {
    console.log(this.formsInfraestructuras);
    console.log(this.formsTerrenos);
    console.log(this.forms);
  },
  data() {
    return {
    };
  },
  computed: {
    formsInfraestructuras() {
      return this.$store.getters["form/formsInfraestructuras"];
    },
    formsTerrenos() {
      return this.$store.getters["form/formsTerrenos"];
    },
    forms() {
      return this.$store.getters["form/forms"];
    }
  },
  methods: {}
};
</script>
<style scoped>
label {
  font-size: large !important;
  font-weight: 500;
}
p {
  font-size: large !important;
}
</style>
