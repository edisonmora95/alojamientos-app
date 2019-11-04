<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :ref="refForm" :no-error-focus="true">
      <section class="col-xs-12">
        <q-select
          :disable="disableInputs"
          v-model="localForm.infraestructura"
          :options="ubicaciones"
          :rules="[validaciones.required]"
          label="Infraestructura"
          :option-value="opt => (opt === null ? null : opt.id)"
          :option-label="opt => (opt.nombre === '' ? 'OTRO' : opt.nombre)"
          outlined
        ></q-select>
      </section>
      <!-- NUEVA INFRAESTRUCTURA -->
      <section
        class="col-xs-12"
        v-if="
          localForm.infraestructura.id === 0 ||
            localForm.infraestructura.id === null
        "
      >
        <q-input
          :disable="disableInputs"
          label="Nombre de la infraestructura"
          v-model="localForm.infraestructura.nombre"
          :rules="[validaciones.required]"
          outlined
        />
      </section>
      <!-- /NUEVA INFRAESTRUCTURA -->
      <q-expansion-item
        expand-separator
        icon="streetview"
        label="Direcciones"
        class="col-xs-12"
      >
        <section class="col-xs-12 col-sm-6">
          <q-input
            outlined
            v-model="localForm.infraestructura.direccion.sector"
            label="Sector/Comunidad"
            :rules="[validaciones.required, validaciones.min3]"
            :disable="inputsInfraestructuraDisabled"
          />
        </section>
        <section class="col-xs-12 col-sm-6">
          <q-input
            outlined
            v-model="localForm.infraestructura.direccion.puntoReferencia"
            label="Punto de Referencia"
            :rules="[validaciones.required, validaciones.min3]"
            :disable="inputsInfraestructuraDisabled"
          />
        </section>
        <section class="col-xs-12 col-sm-6">
          <q-input
            outlined
            v-model="localForm.infraestructura.direccion.callePrincipal"
            label="Calle principal"
            :rules="[validaciones.required, validaciones.min3]"
            :disable="inputsInfraestructuraDisabled"
          />
        </section>
        <section class="col-xs-12 col-sm-6">
          <q-input
            outlined
            v-model="localForm.infraestructura.direccion.calleSecundaria"
            label="Calle secundaria"
            :rules="[validaciones.min3]"
            :disable="inputsInfraestructuraDisabled"
          />
        </section>
        <!-- TIPO DE SERVICIO -->
        <section class="col-xs-12 col-sm-6">
          <q-select
            v-model="localForm.infraestructura.tipoServicio"
            :options="tiposServicio"
            :rules="[validaciones.required]"
            :disable="inputsInfraestructuraDisabled"
            label="Tipo de servicio de la infraestructura"
            outlined
          ></q-select>
        </section>
        <section
          class="col-xs-12 col-sm-6"
          v-if="localForm.infraestructura.tipoServicio == 'Otros'"
        >
          <q-input
            outlined
            label="Especificar tipo de servicio"
            v-model="localForm.infraestructura.tipoServicio"
            :disable="inputsInfraestructuraDisabled"
          ></q-input>
        </section>
        <!-- /TIPO DE SERVICIO -->
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="place"
        label="Ubicación"
        class="col-xs-12"
      >
        <section class="col-xs-12">
          <Map v-on:newLocation="onNewLocation"></Map>
        </section>
      </q-expansion-item>
      <!-- INSTITUCION -->
      <!-- <q-expansion-item
        expand-separator
        icon="business"
        label="Institución propietaria"
        class="col-xs-12  "
      >
        <section class="col-xs-12 col-md-6">
          <q-select
            v-model="localForm.infraestructura.institucion"
            :options="instituciones"
            :rules="[validaciones.required]"
            label="Institución propietaria de la infraestructura"
            outlined
            :option-value="opt => (opt.id === 0 ? null : opt.id)"
            :option-label="opt => (opt.nombre === '' ? 'OTRO' : opt.nombre)"
            :disable="inputsInfraestructuraDisabled"
          ></q-select>
        </section>
        <section class="col-xs-12">
          <q-input
            label="Nombres representante"
            v-model="localForm.infraestructura.institucion.nombreRepresentante"
            disable
            outlined
          ></q-input>
        </section>
        <section class="col-xs-12 col-sm-6">
          <q-input
            label="Celular"
            v-model="localForm.infraestructura.institucion.celularRepresentante"
            disable
            outlined
            mask="(+###) ### ### ###"
          ></q-input>
        </section>
        <section class="col-xs-12 col-sm-6">
          <q-input
            label="Telf. Convencional"
            v-model="
              localForm.infraestructura.institucion.convencionalRepresentante
            "
            disable
            outlined
            mask="(##)# ### ###"
          ></q-input>
        </section>
      </q-expansion-item> -->
      <!-- /INSTITUCION -->
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
import Map from "../../components/Map/Map";
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
        infraestructura: {
          id: null,
          nombre: "",
          direccion: {
            callePrincipal: "",
            calleSecundaria: "",
            sector: "",
            puntoReferencia: ""
          },
          coordenadas: {
            easting: 0,
            northing: 0,
            zoneLetter: "",
            zoneNum: 0
          },
          tipoServicio: "",
          institucion: {
            id: null,
            nombre: "",
            nombreRepresentante: "",
            celularRepresentante: "",
            convencionalRepresentante: ""
          }
        }
      }
    };
  },
  computed: {
    ubicaciones() {
      return this.$store.getters["app/ubicacionesTipo"](this.form.tipo);
    },
    form() {
      return this.$store.getters["form/form"];
    },
    tiposServicio() {
      return ["Otros", "Escuela", "Colegio", "Universidad", "Hospital"];
    },
    instituciones() {
      return this.$store.getters["app/instituciones"];
    },
    validaciones() {
      return this.$store.getters["app/validaciones"];
    },
    inputsInfraestructuraDisabled() {
      return (
        this.disableInputs ||
        (this.localForm.infraestructura.id !== 0 &&
          this.localForm.infraestructura.id != null)
      );
    }
  },
  methods: {
    /** Controla el evento newLocation emitido por el Map Component */
    onNewLocation(payload) {
      this.localForm.infraestructura.coordenadas = payload.utmCoord;
    }
  },
  mixins: [FormMixin],
  components: {
    Map
  }
};
</script>
