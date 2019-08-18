<template>
  <q-page class="q-pt-lg q-px-md">
    <q-form class="row q-col-gutter-md" :no-error-focus="true" :ref="refForm">
      <section class="col-xs-12 col-sm-6">
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
      <section class="col-xs-12 col-sm-6">
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
      <section class="col-xs-12 col-sm-6">
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
      <section class="col-xs-12 col-sm-6">
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
  methods: {
    captureImage() {
      const options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: navigator.camera.EncodingType.JPEG,
        mediaType: navigator.camera.MediaType.PICTURE,
        correctOrientation: true //Corrects Android orientation quirks
      };
      navigator.camera.getPicture(
        data => {
          console.log("Image loaded");
          this.imageSrc = `data:image/jpeg;base64,${data}`;
        },
        () => {
          this.$q.notify("Could not access device camera.");
        },
        options
      );
    }
  },
  mixins: [FormMixin]
};
</script>
