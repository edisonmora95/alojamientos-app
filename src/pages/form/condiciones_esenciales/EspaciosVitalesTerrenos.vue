<template>
  <q-page>
    <header class="q-mt-sm q-pa-md" style="box-shadow: 0px 3px 2px -2px grey;">
      <section class="row">
        <article class="col-xs-6">
          <p class="q-my-none text-subtitle-2">
            <b>Total de espacios vitales</b>
          </p>
        </article>
        <article class="col-xs-6">
          <p class="q-my-none text-right">
            {{ localForm.espaciosTerreno.length }}
          </p>
        </article>
      </section>
      <section class="row">
        <article class="col-xs-6">
          <p class="q-my-none text-subtitle-2"><b>Total metros cuadrados</b></p>
        </article>
        <article class="col-xs-6">
          <p class="text-right q-my-none">
            {{ totalM2 }}
          </p>
        </article>
      </section>
    </header>
    <q-form class="q-px-md" :ref="refForm">
      <main class="row q-mt-md">
        <section class="col-xs-12" v-if="newEspacio && !disableInputs">
          <section class="row">
            <header class="col-xs-12">
              <label>Nuevo Espacio</label>
            </header>
            <EspacioTerreno
              class="col-xs-12"
              :disable="disableInputs"
              :showAddBtn="true"
              v-on:addEspacio="onAddEspacio"
            ></EspacioTerreno>
          </section>
        </section>
        <p
          class="text-positive cursor-pointer"
          @click="showNewEspacio"
          v-if="!newEspacio"
        >
          <q-icon name="add" />Añadir otro espacio
        </p>
        <section class="col-xs-12" v-if="localForm.espaciosTerreno.length > 0">
          <section class="row">
            <header class="col-xs-12">
              <label class="text-bold">Espacios registrados</label>
            </header>
            <EspacioTerreno
              v-for="(espacio, index) in localForm.espaciosTerreno"
              :key="'espacio-' + index"
              :disable="disableInputs"
              :showAddBtn="false"
              class="col-xs-12"
            >
              <template slot="header">
                <label> Espacio #{{ index + 1 }}</label>
              </template>
            </EspacioTerreno>
          </section>
        </section>
      </main>
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
import FormMixin from "../../../mixins/FormMixin";
import EspacioTerreno from "../../../components/Form/EspacioTerreno";
export default {
  mounted() {
    this.copyFormValues();
  },
  data() {
    return {
      refForm: "espacios-vitales-terrenos-form",
      nextPage: {
        name: "caracteristicasTerreno"
      },
      prevPage: {
        name: "serviciosBasicos"
      },
      newEspacio: true, // Controla el componente para ingresar un Nuevo Espacio
      localForm: {
        espaciosTerreno: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    },
    totalM2() {
      let total = 0;
      for (let i = 0; i < this.localForm.espaciosTerreno.length; i++) {
        total += this.localForm.espaciosTerreno[i].totalm2;
      }
      return total;
    }
  },
  methods: {
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    },
    /** Habilita el componente para ingresar un nuevo espacio */
    showNewEspacio() {
      this.newEspacio = true;
    },
    onAddEspacio(payload) {
      this.localForm.espaciosTerreno.push(payload);
      this.newEspacio = false;
    }
  },
  mixins: [FormMixin],
  components: {
    EspacioTerreno
  }
};
</script>
<style scoped></style>
