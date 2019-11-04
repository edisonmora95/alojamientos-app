<template>
  <q-page class="q-pt-lg q-px-md">
    <section class="row">
      <article class="col-xs-6 col-sm-3 text-center">
        <q-btn
          flat
          id="btnAdd"
          @click="openBottomSheet"
          :disable="disableInputs"
        >
          <q-icon name="camera_alt" style="font-size: 2.5em;" />
        </q-btn>
      </article>
      <article
        class="col-xs-6 col-sm-3 text-center q-pa-xs"
        v-for="image in localForm.anexos"
        :key="image"
      >
        <q-img class="imagen" :src="image" spinner-color="primary"></q-img>
      </article>
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
  </q-page>
</template>

<script>
import ImagesService from "../../services/images.service";
import FormMixin from "../../mixins/FormMixin";
export default {
  mounted() {
    if (this.form.tipo === 2) {
      this.prevPage = {
        name: "medidasSeguridad"
      };
    }
  },
  data() {
    return {
      nextPage: {
        name: "recomendaciones"
      },
      prevPage: {
        name: "accesibilidad"
      },
      localForm: {
        anexos: []
      }
    };
  },
  computed: {
    form() {
      return this.$store.getters["form/form"];
    }
  },
  methods: {
    openBottomSheet() {
      this.$q
        .bottomSheet({
          message: "Subir imagen",
          grid: true,
          actions: [
            {
              label: "Cámara",
              icon: "camera_alt",
              id: "camara"
            },
            {
              label: "Galería",
              icon: "folder",
              id: "galeria"
            }
          ]
        })
        .onOk(action => {
          if (action.id === "camara") {
            this.captureImage(1);
          } else if (action.id === "galeria") {
            this.captureImage(0);
          }
        });
    },
    /**
     * @param {number} sourceType 1 -> cámara | 0 -> archivos
     */
    async captureImage(sourceType) {
      const options = {
        destinationType: 0,
        sourceType
      };
      navigator.camera.getPicture(
        async data => {
          // on success
          const result = await ImagesService.subirImagen(data);
          this.localForm.anexos.push(result.data.data.link);
        },
        error => {
          if (error != "No Image Selected") {
            this.$q.notify("No se pudo acceder a la cámara del dispositivo");
          }
        },
        options
      );
    },
    nextStep() {
      this.updateForm();
      this.$router.push(this.nextPage);
    }
  },
  mixins: [FormMixin]
};
</script>

<style scoped>
.imagen {
  height: 150px;
  max-width: 100%;
}
#btnAdd {
  height: 150px;
  width: 100%;
  margin: auto;
  position: relative;
}
</style>
